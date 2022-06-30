import { login, logout } from '@/api/user'
import { roleDetail } from '@/api/role'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter, constantRoutes } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  routes: [],
  buttons: [],
  rolePermissions: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  },
  SET_ROLE_PERMISSIONS: (state, rolePermissions) => {
    state.rolePermissions = rolePermissions
  }
}
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        localStorage.setItem('role', JSON.stringify(data.role))
        // localStorage.setItem('buttons', JSON.stringify(data.buttons))
        localStorage.setItem('userInfo', JSON.stringify(data.user))
        // commit('SET_ROLES', data.role.funct)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      roleDetail(JSON.parse(localStorage.getItem('role')).id).then(response => {
        // console.log(response)
        const { data } = response
        // console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { menuButtons } = data
        if (!menuButtons || menuButtons.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLE_PERMISSIONS', menuButtons)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  setRoutes({ commit }, routes) {
    return new Promise(resolve => {
      // console.log(routes)
      const menuList = JSON.parse(JSON.stringify(routes)).filter(item => item.children.length)
      routes = [constantRoutes[constantRoutes.length - 1]].concat(menuList)
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  },

  setButtons({ commit }, buttons) {
    return new Promise(resolve => {
      commit('SET_BUTTONS', buttons)
      resolve(buttons)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        localStorage.removeItem('userInfo')
        localStorage.removeItem('role')
        localStorage.removeItem('buttons')
        removeToken()
        resetRouter()
        dispatch('permission/removeRoute', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

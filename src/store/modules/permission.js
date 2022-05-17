import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param routesMap
 */
export function filterAsyncRoutes(routes, menuButtonArr) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.path === '*') {
      res.push(tmp)
    } else if (menuButtonArr.includes(tmp.name)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menuButtonArr)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  REMOVE_ROUTES: (state) => {
    state.addRoutes = []
    state.routes = []
  }
}

const actions = {
  generateRoutes({ commit, state, dispatch }, menuButtons) {
    return new Promise(resolve => {
      const menuButtonArr = []
      menuButtons.forEach(route => {
        menuButtonArr.push(route.name)
        if (route.children) {
          route.children.forEach(item => {
            if (item.name !== 'Article Management') {
              if (item.children && item.children.findIndex(child => child.name === 'View') !== -1) {
                menuButtonArr.push(item.name)
              }
            } else {
              item.children.forEach(child => {
                if (child.children && child.children.findIndex(secondChild => secondChild.name === 'View') !== -1) {
                  menuButtonArr.push(child.name)
                }
              })
            }
          })
        }
      })
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, menuButtonArr)
      dispatch('user/setRoutes', accessedRoutes, { root: true })
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  removeRoute({ commit }) {
    commit('REMOVE_ROUTES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

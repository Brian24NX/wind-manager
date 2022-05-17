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
      const menuArr = []
      const buttonArr = []
      // const a = []
      menuButtons.forEach(route => {
        menuArr.push(route.name)
        if (route.children) {
          route.children.forEach(item => {
            if (item.name !== 'Article Management') {
              if (item.children && item.children.findIndex(child => child.name === 'View') !== -1) {
                menuArr.push(item.name)
              }
              item.children.forEach(child => {
                buttonArr.push(child.id)
                // a.push({
                //   id: child.id,
                //   name: item.name + ',' + child.name
                // })
              })
            } else {
              item.children.forEach(child => {
                if (child.children && child.children.findIndex(secondChild => secondChild.name === 'View') !== -1) {
                  menuArr.push(child.name)
                }
                child.children.forEach(secondChild => {
                  buttonArr.push(secondChild.id)
                  // a.push({
                  //   id: secondChild.id,
                  //   name: child.name + ',' + secondChild.name
                  // })
                })
              })
            }
          })
        }
      })
      // console.log(JSON.stringify(a))
      // console.log(buttonArr)
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, menuArr)
      dispatch('user/setRoutes', JSON.parse(JSON.stringify(accessedRoutes)), { root: true })
      dispatch('user/setButtons', buttonArr, { root: true })
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      // console.log(accessedRoutes)
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

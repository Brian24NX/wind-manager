import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param routesMap
 */
export function filterAsyncRoutes(routes, routesMap) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (routesMap.includes(tmp.path)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, routesMap)
      }
      res.push(tmp)
    } else if (tmp.path === '*') {
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
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      const routeArr = []
      routes.forEach(route => {
        routeArr.push(route.path)
        if (route.children) {
          route.children.forEach(item => {
            routeArr.push(item.path)
            if (item.children) {
              item.children.forEach(child => {
                routeArr.push(child.path)
              })
            }
          })
        }
      })
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, routeArr)
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

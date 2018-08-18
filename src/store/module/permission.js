import constantRouter, { asyncRouter } from '@/router/routers'
import store from '@/store'
// 验证是否拥有该权限
function hasPermission (roles, route) {
  return roles.some(role => role.path === route.path && role.name === route.name)
}

export default {
  state: {
    totalRouters: constantRouter,
    addRouters: []
  },
  mutations: {
    setRouters (state, router) {
      state.addRouters = router || []
      state.totalRouters = constantRouter.concat(router)
    }
  },
  actions: {
    // 权限
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = asyncRouter.filter(v => {
          if (store.getters.userData.ISADMIN) return true
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        commit('setRouters', accessedRouters)
        resolve()
      })
    }
  }
}

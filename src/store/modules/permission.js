import { constantRoutes, customRoutes } from '@/router'
import Layout from '@/layout'

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

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, state }, roles) {
    var menuList = sessionStorage.getItem('SYS_MENU') || '[]'

    var menuRouters = []
    menuList = JSON.parse(menuList)
    menuList = menuList.concat(customRoutes)

    menuList.forEach((m, i) => {
      if (m.pid === 0) {
        m.fullPath = m.path
        var module = {
          path: m.path,
          component: Layout,
          meta: {pid: m.pid, id: m.id, title: m.title, fullPath: "", icon: m.icon },
          name: m.path,
          hidden: m.hidden > 0 ? true : false ,
        }

        menuRouters.push(module)
      }
    })

    function buildTree(routers) {
      routers.forEach(r => {
        menuList.forEach((m, i) => {
          if (m.pid && m.pid === r.meta.id) {
            if (!r.children) r.children = []
            m.fullPath = r.meta.fullPath + m.path
            var menu = {
              path: m.path,
              component: resolve => require(['@/views' + r.meta.fullPath + m.path], resolve),
              meta: { id: m.id, title: m.title, fullPath: r.meta.fullPath + m.path, icon: m.icon },
              name: m.path,
              hidden: (m.hidden > 0) ? true : false ,
            }

            r.children.push(menu)
            r.hasChildren = m.hidden ? r.hasChildren : true
          }
          r.redirect = r.meta.pid === 0 && r.hasChildren && r.children.filter(item=>!item.hidden)[0].name
        })

        if (r.children) buildTree(r.children)

        function buildIndex(r) {
          if (r.meta.pid === 0 && !r.hasChildren){
            r.redirect = r.path + '/index'
            if (!r.children) r.children = []
            var index = {
              path: 'index',
              component: resolve => require(['@/views' + r.path], resolve),
              meta:  {id: r.meta.id, title: r.meta.title, fullPath: r.path + '/index', icon: r.meta.icon },
              name: r.name + '/index'
            }
            r.children.push(index)
          }
        }

        buildIndex(r)
      })
    }

    buildTree(menuRouters)

    return new Promise(resolve => {
      var accessedRoutes = menuRouters || []
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      //   accessedRoutes = menuRouters || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(menuRouters, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

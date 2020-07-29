import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "chunk-buildin-views" */ '@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "chunk-buildin-views" */ '@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "chunk-buildin-views" */ '@/layout'),
    redirect: '/dashboard',
  },
  {
    path: '/share',
    component: () => import(/* webpackChunkName: "chunk-share" */ '@/views/share/index'),
    hidden: true
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on admin roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

var menuList = `[] `

export var menuRouters = []
menuList = JSON.parse(menuList)

menuList.forEach((m, i) => {
  if (m.pid === 0) {
    m.fullPath = '/' + m.path
    var module = {
      path: '/' + m.path,
      component: Layout,
      meta: { id: m.id, title: m.title, fullPath: '/' + m.path, icon: m.icon },
      name: m.path
    }

    menuRouters.push(module)
  }
})

function convertTree(routers) {
  routers.forEach(r => {
    menuList.forEach((m, i) => {
      if (m.pid && m.pid === r.meta.id) {
        if (!r.children) r.children = []
        m.fullPath = r.meta.fullPath + '/' + m.path
        var menu = {
          path: m.path,
          component: components[ r.meta.fullPath + '/' + m.path],
          meta: { id: m.id, title: m.title, fullPath: r.meta.fullPath + '/' + m.path, icon: m.icon },
          name: m.path
        }

        r.children.push(menu)
      }
    })
    if (r.children) convertTree(r.children)
  })
}
convertTree(menuRouters)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
export const customRoutes = require('./custom').customRoutes
export const components = require('./custom').components

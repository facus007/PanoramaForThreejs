import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // children: [{
    //   path: 'dashboard',
    //   name: '仪表盘',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: '仪表盘 ', icon: 'dashboard' }
    // }]
  },
  {
    path: '/share',
    component: () => import('@/views/share/index'),
    hidden: true
  },
  {
    path: '/video',
    component: () => import('@/views/video/index'),
    hidden: true
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // }
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
          component: resolve => require(['@/views' + r.meta.fullPath + '/' + m.path], resolve),
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

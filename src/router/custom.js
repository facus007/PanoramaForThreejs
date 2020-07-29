export const customRoutes=[
  {
    id: 1,
    title: "仪表板",
    path: "/dashboard",
    pid: 0,
    icon: "dashboard",
    order: 0,
    children: null,
    hidden: 0
  },
  {
    id: 3,
    title: "展馆",
    path: "/exhibition",
    pid: 0,
    icon: "example",
    order: 0,
    children: null,
    hidden: 0
  },
  {
    id: 31,
    title: "展馆列表",
    path: "/exhibition/list",
    pid: 3,
    icon: "example",
    order: 0,
    children: null,
    hidden: 0
  },
  {
    id: 32,
    title: "展馆搭建",
    path: "/exhibition/editor",
    pid: 3,
    icon: "example",
    order: 0,
    children: null,
    hidden: 1
  },
  {
    id: 33,
    title: "展馆预览",
    path: "/exhibition/preview",
    pid: 3,
    icon: "example",
    order: 0,
    children: null,
    hidden: 1
  },
  {
    id: 4,
    title: "全景转换工具",
    path: "/tools",
    pid: 0,
    icon: "slice",
    order: 0,
    children: null,
    hidden: 0
  },
  {
    id: 5,
    title: "模板",
    path: "/templates",
    pid: 0,
    icon: "slice",
    order: 0,
    children: null,
    hidden: 0
  },
  {
    id: 51,
    title: "模板列表",
    path: "/templates/list",
    pid: 5,
    icon: "example",
    order: 0,
    children: null,
    hidden: 0
  },
  {
    id: 52,
    title: "新增模板",
    path: "/templates/add",
    pid: 5,
    icon: "example",
    order: 0,
    children: null,
    hidden: 1
  }
]

export const components = {
  '/dashboard': ()=>import(/* webpackChunkName: "chunk-buildin-views" */ '@/views/dashboard/index'),
  '/exhibition/list': ()=>import(/* webpackChunkName: "chunk-exhibition" */ '@/views/exhibition/list'),
  '/exhibition/editor': ()=>import(/* webpackChunkName: "chunk-exhibition-editor" */ '@/views/exhibition/editor'),
  '/exhibition/preview': ()=>import(/* webpackChunkName: "chunk-exhibition-preview" */ '@/views/exhibition/preview'),
  '/tools': ()=>import(/* webpackChunkName: "chunk-tools" */ '@/views/tools'),
  '/templates/list': () => import(/* webpackChunkName: "templates" */ '@/views/templates/list'),
  '/templates/add': () => import(/* webpackChunkName: "templates" */ '@/views/templates/add'),
}

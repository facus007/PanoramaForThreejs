import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/assets/styles/index.scss' // global css

import App from '@/App'
import store from '@/store'
import router from '@/router'

import '@/assets/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// moment
const moment = require('moment')
import 'moment/locale/zh-cn'
Vue.use(require('vue-moment'), {moment});

Vue.config.productionTip = false

import {registerModules} from '@/store/custom'
registerModules(store)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

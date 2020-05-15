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

// moment
const moment = require('moment')
import 'moment/locale/zh-cn'
Vue.use(require('vue-moment'), {moment});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import Vue from 'vue'
import Router from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/assets/styles/index.scss' // global css

import App from './index.vue'

import store from '@/store'
import '@/assets/icons' // icon

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: new Router(),
  store,
  render: h => h(App)
})

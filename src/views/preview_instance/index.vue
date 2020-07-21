<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5; top: 0; left: 0;">
    <main-view :getProduct="getProduct" :static="true"/>
    <loading/>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
import Loading from '@/views/preview/loading'
import { getProduct } from './server'
import store from '@/views/preview/store'

export default {
  components:{MainView: () => import(/* webpackChunkName: "chunk-preview-main" */ '@/views/preview/mainview'), Loading},
  data(){return{}},
  computed:{
    getProduct:_=>getProduct,
  },
  created(){
    this.$store.registerModule('preview', store)
  },
  destroyed(){
    this.$store.unregisterModule('preview')
  }
}

</script>

<style>
body{
  margin: 0;
}
</style>

<template>
  <div class="absolute centering" style="z-index: 5;">
    <main-view :getProduct="getProduct" :static="true"/>
    <loading/>
  </div>
</template>

<script>
import Loading from '@/components/Preview/loading'
import { getProduct } from './server'
import store from '@/components/Preview/store'

export default {
  components:{MainView: () => import(/* webpackChunkName: "chunk-preview-main" */ '@/components/Preview/mainview'), Loading},
  created(){this.$store.registerModule('preview', store)},
  destroyed(){this.$store.unregisterModule('preview')},
  computed:{
    getProduct:_=>getProduct,
  },
}
</script>

<style>
body{
  margin: 0;
}
</style>

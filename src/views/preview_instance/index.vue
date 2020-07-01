<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5; top: 0; left: 0;">
    <main-view v-model="loading"/>
    <loading v-if="loading" loading="loading"/>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
import Loading from '@/views/preview/loading'

export default {
  components:{MainView: ()=>import(/* webpackChunkName: "chunk-preview_instance-main" */'./mainview'), Loading},
  data(){return{
    loading: true,
    // loading: !Cookies.get('vrpreivew' + this.$route.query.product_id)
  }},
  computed:{}
}

</script>

<style>
body{
  margin: 0;
}
</style>

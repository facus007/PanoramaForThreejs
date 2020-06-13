<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
    <main-view v-model="loading"/>
    <loading v-if="loading" loading="loading"/>
  </div>
</template>

<script>
import Loading from './loading'
import Cookies from 'js-cookie'

export default {
  components:{MainView: () => import('./mainview'), Loading},
  data(){return{
     loading: !Cookies.get('vrpreivew' + this.$route.query.product_id)
  }},
  computed:{
  }
}

</script>

<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
    <main-view v-model="loading"/>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from './loading'
export default {
  components:{MainView: () => import('./mainview'), Loading},
  data(){return{
    loading: true
  }},
}

</script>

<template>
  <span :computeProp="computeProp"><slot></slot></span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){return {
    obj: null,
  }},
  methods:{
    propCompute(){},
  },
  computed:{
    computeProp(){
      this.obj && this.propCompute()
    },
    ...mapState('THREE',['scene', 'renderer', 'camera', 'needsUpdate', 'domElement'])
  }
}
</script>

<style scoped>
</style>

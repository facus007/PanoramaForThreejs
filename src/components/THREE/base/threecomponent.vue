<template>
  <span :computeProp="computeProp"><slot></slot></span>
</template>

<script>
import { mapState } from 'vuex'
const a = 1
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
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement'])
  }
}
</script>

<style scoped="three">
.home {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div :computeProp="computeProp" style="visibility:hidden;"><slot/></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){return { obj: null,}},
  methods:{
    propCompute(){},
  },
  computed:{
    computeProp(){
      this.obj && this.propCompute()
    },
    ...mapState('THREE',['scene', 'camera', 'domElement'])
  }
}
</script>

<style scoped="three">
.home {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>

<template>
  <div>asdlksajdalksj</div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default {
  mixins: [THREEComponent],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){},
    // propCompute(){},
  },
  mounted(){
    this.obj = new CSS2DObject(this.$el)
    this.scene.add(this.obj)
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj = null
  }
}
</script>

<style scoped>
</style>

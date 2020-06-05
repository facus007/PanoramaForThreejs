<template>
  <div class="canvas-container" :debug="isDebug && debug">
    <slot></slot>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from './base/threecomponent'
import store from './store'

const moduleName = 'THREE'

export default {
  name:'THREE',
  mixins:[THREEComponent],
  props:['isDebug'],
  computed:{
    debug(){
      // window.scene = this.scene
      // window.THREE = THREE
    },
    ...mapState(moduleName, ['domElement','camera'])
  },
  created(){
    this.$store.registerModule(moduleName, store)
    this.$store.dispatch(moduleName+'/start')
  },
  mounted(){
    this.$store.commit(moduleName+'/SET_DOMELEMENT', this.$el)
    this.observer = new ResizeObserver(this.resize)
    this.observer.observe(this.$el, { attributes: true, childList: true, subtree: true })
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    this.observer.unobserve(this.$el)
    this.observer = null
    this.$store.commit(moduleName+'/SET_DOMELEMENT', null)
  },
  destroyed(){
    this.$store.dispatch(moduleName+'/stop')
    this.$store.unregisterModule(moduleName)
  },
  methods:{
    resize(){
      let aspect = this.domElement.clientWidth / this.domElement.clientHeight;
      if(this.camera.aspect !== aspect){
        this.camera.aspect = aspect
        this.camera.updateProjectionMatrix();
        this.$store.dispatch(moduleName+'/render')
      }
    },
    rendering(){
      if(this.$store.state[moduleName]){
        this.$store.dispatch(moduleName+'/render')
        this.frame = requestAnimationFrame(this.rendering)
      }
    },
    startRendering(){
      this.frame = requestAnimationFrame(this.rendering)
    },
    stopRendering(){
      cancelAnimationFrame(this.frame)
    },
  }
}
</script>

<style scoped>
.canvas-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

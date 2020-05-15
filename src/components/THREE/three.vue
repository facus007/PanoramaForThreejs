<template>
  <div class="canvas-container" :debug="debug">
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
  computed:{
    debug(){
      window.scene = this.scene
      window.THREE = THREE
    }
  },
  created(){
    this.$store.registerModule(moduleName, store)
    this.$store.dispatch(moduleName+'/start')
  },
  mounted(){
    this.$store.commit(moduleName+'/SET_DOMELEMENT', this.$el)
    this.$el.appendChild( this.renderer.domElement )
  },
  beforeDestroy(){
    this.renderer.domElement.remove()
    this.$store.commit(moduleName+'/SET_DOMELEMENT', null)
  },
  destroyed(){
    this.$store.dispatch(moduleName+'/stop')
    this.$store.unregisterModule(moduleName)
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

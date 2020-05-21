<template>
  <div class="home"/>
</template>

<script>
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  mixins: [THREEComponent],
  props: [],
  watch:{
    domElement(next, pre){
      pre && pre.removeEventListener('update', this.update)
      next && next.addEventListener('update', this.update)
    },
  },
  methods:{
    update(){
      this.obj && this.obj.update()
    },
    // propCompute(){},
    changed(){
      this.$store.commit('THREE/SET_NEEDS_UPDATE', true)
    },
    newControl(camera, domElement){
      let controls = new OrbitControls(camera, domElement)
      camera.position.set(0.00001,0,0) //controls.update() must be called after any manual changes to the camera's transform
      controls.enableKeys = false
      controls.enablePan = false
      controls.enableZoom = false
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.134;
      controls.addEventListener('change', this.changed, false)
      this.obj = controls
    },
    disposeControl(){
      this.obj.removeEventListener('change', this.changed)
      this.obj.dispose()
      this.obj = null
    }
  },
  mounted(){
    this.newControl(this.camera, this.$el)
  },
  beforeDestroy(){
    this.disposeControl()
  }
}
</script>

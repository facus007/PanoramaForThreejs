<template>
  <div class="home"/>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  mixins: [THREEComponent],
  props: ['start_rotation'],
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
      controls.maxAzimuthAngle = this.start_rotation[0]
      controls.minAzimuthAngle = this.start_rotation[0]
      controls.maxPolarAngle = this.start_rotation[1]
      controls.minPolarAngle = this.start_rotation[1]
      controls.update()
      controls.maxAzimuthAngle = Infinity
      controls.minAzimuthAngle = -Infinity
      controls.maxPolarAngle = Math.PI
      controls.minPolarAngle = 0
      controls.addEventListener('change', this.changed, false)
      this.obj = controls
    },
    disposeControl(){
      this.obj.removeEventListener('change', this.changed)
      this.obj.dispose()
      this.obj = null
    },
    onMouseWheel( event ) {
      event.preventDefault()
      var camera = this.camera
      var fov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp( fov, 30, 150 );
      camera.updateProjectionMatrix();
    }
  },
  mounted(){
    this.newControl(this.camera, this.$el)
    this.$el.addEventListener('wheel', this.onMouseWheel, false)
  },
  beforeDestroy(){
    this.$el.removeEventListener('wheel', this.onMouseWheel)
    this.disposeControl()
  },
}
</script>

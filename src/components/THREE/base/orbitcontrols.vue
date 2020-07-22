<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from '../core/orbitcontrols'

export default {
  mixins: [THREEComponent],
  props: ['start_rotation', 'auto_rotate'],
  data(){return {
    interval: null
  }},
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
      this.$emit('input', [this.obj.getAzimuthalAngle(), this.obj.getPolarAngle()])
    },
    newControl(camera, domElement){
      let controls = new OrbitControls(camera, domElement)
      camera.position.set(0.00001,0,0) //controls.update() must be called after any manual changes to the camera's transform
      controls.enableKeys = false
      controls.enablePan = false
      controls.enableZoom = false
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;
      controls.autoRotate = this.auto_rotate
      controls.autoRotateSpeed = -0.3
      controls.rotateSpeed = 0.3
      if(this.start_rotation){
        controls.maxAzimuthAngle = this.start_rotation[0]
        controls.minAzimuthAngle = this.start_rotation[0]
        controls.maxPolarAngle = this.start_rotation[1]
        controls.minPolarAngle = this.start_rotation[1]
      }
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
      camera.fov = THREE.MathUtils.clamp( fov, 30, 160 );
      camera.updateProjectionMatrix();
    },
    setView(phi, theta){
      this.obj.maxAzimuthAngle = theta
      this.obj.minAzimuthAngle = theta
      this.obj.maxPolarAngle = phi
      this.obj.minPolarAngle = phi
      this.obj.update()
      this.obj.maxAzimuthAngle = Infinity
      this.obj.minAzimuthAngle = -Infinity
      this.obj.maxPolarAngle = Math.PI
      this.obj.minPolarAngle = 0
      this.obj.update()
    }
  },
  mounted(){
    this.newControl(this.camera, this.$parent.$el)
    this.$parent.$el.addEventListener('wheel', this.onMouseWheel, false)
    this.domElement && this.domElement.addEventListener('update', this.update)
  },
  beforeDestroy(){
    this.$parent.$el.removeEventListener('wheel', this.onMouseWheel)
    this.disposeControl()
  },
}
</script>

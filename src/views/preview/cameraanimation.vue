<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from 'three'
import Cookies from 'js-cookie'

const lerpfactor = 0.01
const zero = new THREE.Vector3(0,-100, 0);

export default {
  mixins:[mixin],
  props:['value', 'fov', 'start_rotation'],
  data(){return {
    cur_aim:[0 , 0],
  }},
  watch:{},
  methods:{
    lerping(){
      if(this.camera.position.y > 0){
        this.camera.position.lerp(zero, lerpfactor)
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.fov, lerpfactor)
        this.cur_aim[0] = THREE.MathUtils.lerp(this.cur_aim[0], this.start_rotation[0], lerpfactor)
        this.cur_aim[1] = THREE.MathUtils.lerp(this.cur_aim[1], this.start_rotation[1], lerpfactor)
        var aim = (new THREE.Vector3()).setFromSphericalCoords(1000, this.cur_aim[1], this.cur_aim[0]).multiplyScalar(-1)
        this.camera.lookAt(aim)
        this.camera.updateProjectionMatrix()
        requestAnimationFrame(this.lerping)
      }
      else{
        this.$emit('input',true)
        this.start_rotation[0] = this.cur_aim[0]
        this.start_rotation[1] = this.cur_aim[1]
      }
    },
  },
  created(){
    if(!this.hasCookies){
      let v3 = (new THREE.Vector3()).setFromSphericalCoords(1,this.cur_aim[1],this.cur_aim[0])
      var aim = v3.multiplyScalar(-1)
      this.camera.fov = 150
      this.camera.lookAt(aim)
      this.camera.position.set(0,1000,0)
      this.camera.updateProjectionMatrix()
      this.lerping()
    }
    else{
      this.$emit('input',true)
    }
  },
  destroyed(){},
  computed:{
    hasCookies(){
      return Cookies.get('vrpreivew' + this.$route.query.product_id)
    },
    ...mapState('THREE',['camera']),
  }
}
</script>

<template>
  <transition class= "el-fade-in">
    <div :class="isMoblie ? 'guide-mobile' : 'guide'" :style="{visibility: showguide? 'visible' : 'hidden'}"/>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import * as THREE from 'three'
import Cookies from 'js-cookie'
import browser from '@/utils/browser'

const lerpfactor = 0.01
const zero = new THREE.Vector3(0,-20, 0);

export default {
  props:['value', 'fov', 'start_rotation', 'product'],
  data(){return {
    cur_aim:[0 , 0],
    showguide: false,
  }},
  watch:{},
  methods:{
    lerping(){
      this.showguide = this.camera.position.y < 100 && this.camera.position.y > 0

      if(this.camera.position.y > 0){
        this.camera.position.lerp(zero, lerpfactor)
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.fov, lerpfactor)
        this.cur_aim[0] = THREE.MathUtils.lerp(this.cur_aim[0], this.start_rotation[0], lerpfactor * 2)
        this.cur_aim[1] = THREE.MathUtils.lerp(this.cur_aim[1], this.start_rotation[1], lerpfactor * 2)
        var aim = (new THREE.Vector3()).setFromSphericalCoords(200, this.cur_aim[1], this.cur_aim[0]).multiplyScalar(-1)
        this.camera.lookAt(aim)
        this.camera.updateProjectionMatrix()
        requestAnimationFrame(this.lerping)
      }
      else{
        this.start_rotation[0] = this.cur_aim[0]
        this.start_rotation[1] = this.cur_aim[1]
        this.$emit('input',true)
      }
    },
  },
  created(){
    if(!this.hasCookies && this.product.animation){
      let v3 = (new THREE.Vector3()).setFromSphericalCoords(1,this.cur_aim[1],this.cur_aim[0])
      var aim = v3.multiplyScalar(-1)
      this.camera.fov = 150
      this.camera.lookAt(aim)
      this.camera.position.set(0,200,0)
      this.camera.updateProjectionMatrix()
      this.lerping()
    }
    else{
      let v3 = (new THREE.Vector3()).setFromSphericalCoords(1,this.start_rotation[1],this.start_rotation[0])
      var aim = v3.multiplyScalar(-1)
      this.camera.fov = this.fov
      this.camera.lookAt(aim)
      this.camera.position.set(0,0,0)
      this.camera.updateProjectionMatrix()
      this.$emit('input',true)
    }
  },
  destroyed(){},
  computed:{
    hasCookies(){
      return Cookies.get('vrpreivew' + this.$route.query.product_id)
    },
    isMoblie(){
      return(browser.versions.mobile||browser.versions.android||browser.versions.ios)
    },
    ...mapState('THREE',['camera']),
  }
}
</script>
<style scoped="">
.guide{
  width: 200px;
  height: 200px;
  position: absolute;
  background-image: url(../../assets/img/icon1.png);
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
.guide-mobile{
  width: 200px;
  height: 200px;
  position: absolute;
  background-image: url(../../assets/img/icon2.png);
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
</style>

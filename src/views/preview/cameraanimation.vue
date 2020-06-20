<template>
  <transition class= "el-fade-in">
    <div :class="isMoblie ? 'guide-mobile' : 'guide'" :style="{visibility: showguide? 'visible' : 'hidden'}"/>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from 'three'
import Cookies from 'js-cookie'

const lerpfactor = 0.01
const zero = new THREE.Vector3(0,-20, 0);

var browser = {
  versions:function(){
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


export default {
  mixins:[mixin],
  props:['value', 'fov', 'start_rotation'],
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
        this.cur_aim[0] = THREE.MathUtils.lerp(this.cur_aim[0], this.start_rotation[0], lerpfactor)
        this.cur_aim[1] = THREE.MathUtils.lerp(this.cur_aim[1], this.start_rotation[1], lerpfactor)
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
    if(!this.hasCookies){
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

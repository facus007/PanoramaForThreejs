<template>
  <div class="home noevent centering">
    <div class="frame">
      <i v-for="style in corner" class="el-icon-arrow-left corner" :style="style"/>
      <el-button type="primary" class="event" @click="setView">
        将当前视角设定为初始视角
      </el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'

const corner = [
  {top: '0', left: '0', transform: 'rotate(45deg)'},
  {top: '0', right: '0', transform: 'rotate(135deg)'},
  {bottom: '0', left: '0', transform: 'rotate(315deg)'},
  {bottom: '0', right: '0', transform: 'rotate(225deg)'},
]

// const renderTarget = new THREE.WebGLRenderTarget(200, 100);

export default {
  props:['renderer', 'controls'],
  data(){return{corner}},
  methods:{
    setView(){
      // var aspect = this.camera.aspect
      // this.camera.aspect = 200 / 100
      // this.camera.updateProjectionMatrix();
      // this.renderer.obj.setRenderTarget(renderTarget)
      // this.renderer.obj.render(this.scene, this.camera);
      // var pixelBuffer = new Uint8Array( 200 * 100 * 4 );
      // this.renderer.obj.readRenderTargetPixels(renderTarget, 0, 0, 200, 100, pixelBuffer)
      // this.renderer.obj.setRenderTarget(null)
      // this.camera.aspect = aspect
      // this.camera.updateProjectionMatrix();
      //
      // var canvas = document.createElement('canvas');
      // canvas.width = 200;
      // canvas.height = 100;
      // var context = canvas.getContext('2d');
      // var imageData = context.createImageData(200, 100);
      // imageData.data.set(pixelBuffer);
      //
      // var newCanvas = document.createElement('canvas');
      // newCanvas.width = 200;
      // newCanvas.height = 100;
      // newCanvas.getContext("2d").putImageData(imageData, 0, 0);
      // context.translate(0, 100);
      // context.scale(1, -1);
      // context.drawImage(newCanvas, 0, 0);
      //
      // this.$store.commit('editor/SET_PREVIEW', canvas.toDataURL("image/jpeg", 1.0))
      this.curedit.start_rotation = [this.controls.obj.getAzimuthalAngle(), this.controls.obj.getPolarAngle()]
      this.$message.success('设置成功')
    },
    // update(){},
    // propCompute(){},
  },
  computed:{
    ...mapState('editor', ['preview', 'product', 'curedit']),
    ...mapState('THREE',['scene', 'camera', 'domElement']),
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped="three-editor">
.frame {
  position: relative;
  display: flex;
  width: 50%;
  height: 50%;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
.corner {
  position: absolute;
  color: white;
  font-size: 40px;
  text-shadow: #12121288 1px 0 10px;
}
</style>

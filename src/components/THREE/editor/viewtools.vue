<template>
  <div class="home noevent center" :check="check">
    <div class="frame">
      <el-button type="primary" class="event" @click="setView">
        将当前视角设定为初始视角
      </el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

const renderTarget = new THREE.WebGLRenderTarget(200, 100);

export default {
  mixins: [THREEComponent],
  props:['renderer'],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    setView(){
      var aspect = this.camera.aspect
      this.camera.aspect = 200 / 100
      this.camera.updateProjectionMatrix();
      this.renderer.obj.setRenderTarget(renderTarget)
      this.renderer.obj.render(this.scene, this.camera);
      var pixelBuffer = new Uint8Array( 200 * 100 * 4 );
      this.renderer.obj.readRenderTargetPixels(renderTarget, 0, 0, 200, 100, pixelBuffer)
      this.renderer.obj.setRenderTarget(null)
      this.camera.aspect = aspect
      this.camera.updateProjectionMatrix();

      var canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 100;
      var context = canvas.getContext('2d');
      var imageData = context.createImageData(200, 100);
      imageData.data.set(pixelBuffer);

      var newCanvas = document.createElement('canvas');
      newCanvas.width = 200;
      newCanvas.height = 100;
      newCanvas.getContext("2d").putImageData(imageData, 0, 0);
      context.translate(0, 100);
      context.scale(1, -1);
      context.drawImage(newCanvas, 0, 0);

      this.$store.commit('editor/SET_PREVIEW', canvas.toDataURL())



      // console.log(this.renderer.obj.domElement.toDataURL())
      // console.log(this.camera.quaternion)
      // console.log(this.camera.fov)
    },
    // update(){},
    // propCompute(){},
  },
  computed:{
    ...mapState('editor', ['preview']),
    check(){
      this.preview || this.setView()
    }
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
</style>

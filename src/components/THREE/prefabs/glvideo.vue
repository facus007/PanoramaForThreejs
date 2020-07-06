<template>
  <MashBasicMaterial :transparent="true" ref="material">
    <video-texture :url='src' ref='player'/>
    <texture :url='imagesrc'/>
    <div v-if="!isSupported && !isPlaying" :style="{width: width*100+'px', height: height*100+'px', display: 'flex'}">
      <el-button @click="play" style="margin: auto; color: white" type="text"><i class="el-icon-caret-right"/></el-button>
    </div>
  </MashBasicMaterial>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import MashBasicMaterial from '../base/meshbasicmaterial'
import Texture from '../base/texture'
import VideoTexture from '../base/videotexture'
import {isSupported} from '@/utils/video'

// var _canvas;
// function getDataURL ( image ) {
//   var canvas;
//   if ( typeof HTMLCanvasElement == 'undefined' ) {
//     return image.src;
//   } else if ( image instanceof HTMLCanvasElement ) {
//     canvas = image;
//   } else {
//     if ( _canvas === undefined ) _canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
//     _canvas.width = 1024;
//     _canvas.height = 1024;
//     var context = _canvas.getContext( '2d' );
//     if ( image instanceof ImageData ) {
//       context.putImageData( image, 0, 0 );
//     } else {
//       context.drawImage( image, 0, 0, image.width, image.height, 0, 0, 1024, 1024 );
//     }
//     canvas = _canvas;
//   }
//   return canvas.toDataURL( 'image/png' );
// }

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI, Math.PI/2, 'XYZ'))

export default {
  components:{MashBasicMaterial, Texture, VideoTexture},
  mixins: [THREEComponent],
  data(){return {
    isPlaying: false,
  }},
  props: ['image','video','mesh','item','visible'],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
    'item.transform'(next, pre){
      this.setTransform()
    },
    visible(next){
      this.obj && (this.obj.visible = next)
    }
  },
  methods:{
    // update(){},
    // propCompute(){},
    setTransform(){
      let m = this.item.transform.affine_transform
      this.obj.position.copy(this.mesh.position)
      let pos = new THREE.Vector3(-m[0], -m[1], 0)
      this.obj.quaternion.copy(this.mesh.quaternion)
      this.obj.quaternion.multiply(fix)
      pos.applyQuaternion (this.obj.quaternion)
      this.obj.position.add(pos)
      let short = Math.min(this.mesh.scale.z, this.mesh.scale.x)
      this.obj.position.add(this.layout.clone().multiplyScalar(short * 0.01))
      this.obj.scale.set(m[2] * short * 0.01,m[3] * short * 0.01, short * 0.01)
    },
    play(){
      console.log(1)
      this.$refs.material.obj.map = this.$refs.player.obj
      this.$refs.player.play()
      this.isPlaying = true
    }
  },
  mounted(){
    this.obj = new THREE.Mesh(new THREE.PlaneGeometry(this.width * 100, this.height * 100));
    this.setTransform()
    this.obj.visible = this.visible
    this.scene.add(this.obj)
    this.isSupported && this.$nextTick(this.play)
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj.geometry.dispose()
    this.obj = null
  },
  computed:{
    isSupported:_=>isSupported(),
    imagesrc(){
      return this.image.src
    },
    src(){
      // return this.image.src
      // return getDataURL(this.image)
      return this.video
    },
    size(){
      let short = Math.min(this.mesh.scale.z, this.mesh.scale.x)
      return [this.mesh.scale.z / short, this.mesh.scale.x / short]
    },
    width(){
      let sizeAspect = this.size[0] / this.size[1]
      let imageAspect = this.image.width / this.image.height
      return sizeAspect > imageAspect ? this.size[0] / sizeAspect * imageAspect  :this.size[0]
    },
    height(){
      let sizeAspect = this.size[0] / this.size[1]
      let imageAspect = this.image.width / this.image.height
      return sizeAspect > imageAspect ? this.size[1] : this.size[1] / imageAspect * sizeAspect
    },
    layout(){
      let compute = {
        '0': new THREE.Vector3(-50*(this.size[0] - this.width), 50*(this.size[1] - this.height), 0),
        '1': new THREE.Vector3(0, 50*(this.size[1] - this.height), 0),
        '2': new THREE.Vector3(50*(this.size[0] - this.width), 50*(this.size[1] - this.height), 0),
        '3': new THREE.Vector3(-50*(this.size[0] - this.width), 0, 0),
        '4': new THREE.Vector3(0, 0, 0),
        '5': new THREE.Vector3(50*(this.size[0] - this.width), 0, 0),
        '6': new THREE.Vector3(-50*(this.size[0] - this.width), -50*(this.size[1] - this.height), 0),
        '7': new THREE.Vector3(0, -50*(this.size[1] - this.height), 0),
        '8': new THREE.Vector3(50*(this.size[0] - this.width), -50*(this.size[1] - this.height), 0),
      }
      return compute[this.item.align]
    }
  }
}
</script>

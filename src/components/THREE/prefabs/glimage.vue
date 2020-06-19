<template>
  <MashBasicMaterial :transparent="true">
    <texture :url='src'/>
  </MashBasicMaterial>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import MashBasicMaterial from '../base/meshbasicmaterial'
import Texture from '../base/texture'

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
  components:{MashBasicMaterial,Texture},
  mixins: [THREEComponent],
  props: ['image','mesh','item','visible'],
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
      this.obj.position.add(this.layout.clone().multiplyScalar(this.mesh.scale.y * 0.01))
      this.obj.scale.set(m[2] * this.mesh.scale.x * 0.01,m[3] * this.mesh.scale.y * 0.01, this.mesh.scale.z * 0.01)
    },
  },
  mounted(){
    this.obj = new THREE.Mesh(new THREE.PlaneGeometry(this.width * 100, this.height * 100));
    this.setTransform()
    this.obj.visible = this.visible
    this.scene.add(this.obj)
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj.geometry.dispose()
    this.obj = null
  },
  computed:{
    src(){
      return this.image.src
      // return getDataURL(this.image)
    },
    size(){
      return [this.mesh.scale.z / this.mesh.scale.y, this.mesh.scale.x / this.mesh.scale.y]
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

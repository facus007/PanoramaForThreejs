<template>
  <MashBasicMaterial>
    <texture :url='src' v-model="size" ref="texture"/>
  </MashBasicMaterial>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import MashBasicMaterial from '../base/meshbasicmaterial'
import Texture from '../base/videotexture'

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI, Math.PI/2, 'XYZ'))

export default {
  components:{MashBasicMaterial, Texture},
  mixins: [THREEComponent],
  props:['width','height','src', 'item', 'mesh'],
  data(){return {
    size: null,
  }},
  watch:{
    'item.transform'(next, pre){
      this.setTransform()
    },
    size(next, pre){
      let m = this.item.transform.affine_transform
      if(next.w/next.h < this.width/this.height){
        this.obj.scale.set(m[2] * this.mesh.scale.x / next.h * next.w / this.width * this.height*0.01,m[3]* this.mesh.scale.y*0.01, this.mesh.scale.z*0.01)
      }  else{
        this.obj.scale.set(m[2] * this.mesh.scale.x*0.01, m[3]* this.mesh.scale.y / next.w * next.h / this.height *this.width*0.01, this.mesh.scale.z*0.01)
      }
    }
  },
  computed:{},
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
      this.obj.scale.set(0 ,0, 0)
    },
  },
  mounted(){
    var obj = new THREE.Mesh( new THREE.PlaneGeometry(this.width, this.height) );
    this.scene.add(obj)
    this.obj = obj
    this.setTransform()
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj.geometry.dispose()
    this.obj = null
  }
}
</script>

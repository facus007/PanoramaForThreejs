<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none'}">
    <img :src="url" :width="150*size[0]+'px'" :height="150*size[1]+'px'" object-fit="contain">
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const texloader = new THREE.TextureLoader()
var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI, Math.PI/2, 'XYZ'))

export default {
  mixins: [THREEComponent],
  props:['url', 'type', 'mesh', 'side', 'transparent', 'color', 'opacity', 'item', 'selected'],
  watch:{
    'item.transform'(next, pre){
      this.setTransform()
    },
  },
  methods:{
    // update(){},
    // propCompute(){},
    setTransform(){
      let m = this.item.transform.affine_transform
      this.obj.position.copy(this.mesh.position)
      let pos = new THREE.Vector3(-m[0], -m[1], 0)
      pos.applyQuaternion (this.obj.quaternion)
      this.obj.position.add(pos)
      this.obj.scale.set(m[2] * 0.1,m[3] * 0.1, 0.1)
      this.obj.quaternion.multiplyQuaternions(this.mesh.quaternion,fix)
    }
  },
  mounted(){
    // if(!this.url){ return }
    this.obj = new CSS3DObject(this.$el)
    this.setTransform()
    this.scene.add(this.obj)
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj = null
  },
  computed:{
    outline(){
      return this.selected && this.selected.name === this.item.name
    },
    size(){
      var size = this.item.name.split('_')
      return [parseInt(size[1]),parseInt(size[2])]
    }
  }
}
</script>

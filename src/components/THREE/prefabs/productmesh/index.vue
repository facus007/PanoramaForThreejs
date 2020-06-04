<template>
  <div :style="{
    border: outline ? '5px dashed yellow' : 'none',
    padding: '20px',
  }">
    <el-button type="text" @click="$emit('action', item)">
      <img v-if="item.style === 1" :src="url" :width="100*size[0]+'px'" :height="100*size[1]+'px'"  style="object-fit:contain">
      <video v-if="item.style === 2" :src="url" loop autoplay playsinline :style="{width:100*size[0]+'px',height:100*size[1]+'px'}"  style="object-fit:contain" muted />
    </el-button>
    <div v-if="item.label" class="label">{{item.label}}</div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const texloader = new THREE.TextureLoader()
texloader.crossOrigin = null;

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
      this.obj.quaternion.copy(this.mesh.quaternion)
      this.obj.quaternion.multiply(fix)
      pos.applyQuaternion (this.obj.quaternion)
      this.obj.position.add(pos)
      this.obj.scale.set(m[2] * this.mesh.scale.x *0.01,m[3] * this.mesh.scale.y * 0.01, this.mesh.scale.z *0.01)
    },
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
    },
  }
}
</script>
<style scoped="three">
.label{
  position: absolute;
  border-radius: 20px;
  background: #0008;
  padding: 5px 10px;
  color: white;
  width: max-content;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

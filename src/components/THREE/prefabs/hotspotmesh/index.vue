<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none', width:100*size[0]+10+'px', height:100*size[1]+10+'px'}">
    <div :style="layout[item.align || '4']">
      <el-button type="text" @click="$emit('action',item)" style="padding:0">
        <img v-if="item.style === 1" :src="url" :style="{'object-fit':'contain','max-width':100*size[0]+'px', 'max-height':100*size[1]+'px'}"/>
        <video v-if="item.style === 2" :src="url" loop autoplay playsinline :style="{'max-width':100*size[0]+'px','max-height':100*size[1]+'px','object-fit':contain}" muted />
        <svg-icon v-if="item.type===1" icon-class='example' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" />
        <i v-if="item.type===2" class='el-icon-place' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" />
        <div v-if="item.label" class="label">{{item.label}}</div>
      </el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI,  Math.PI/2, 'XYZ'))

export default {
  mixins: [THREEComponent],
  props:['url', 'type', 'side', 'transparent', 'color', 'opacity', 'item', 'selected'],
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
      this.obj.position.fromArray(this.item.transform.position)
      let pos = new THREE.Vector3(-m[0], -m[1], 0)
      this.obj.quaternion.fromArray(this.item.transform.rotation)
      this.obj.quaternion.multiply(fix)
      pos.applyQuaternion (this.obj.quaternion)
      this.obj.position.add(pos)
      this.obj.scale.set(m[2] * this.item.transform.scale[0] *0.01,m[3] * this.item.transform.scale[1] * 0.01, this.item.transform.scale[2] *0.01)
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
      return [1,1]
    }
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

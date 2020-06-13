<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none', width:100*size[0]+10+'px', height:100*size[1]+10+'px'}">
    <div :style="layout[item.align || '4']" @click="$emit('action',item)">
      <img v-if="item.style === 1 && item.type!==2" :src="url" :style="{'object-fit':'contain','max-width':100*size[0]+'px', 'max-height':100*size[1]+'px'}"/>
      <!-- <iframe v-if="item.style === 2 && item.type!==2" :src="videourl" :style="{'max-width':100*size[0]+'px','max-height':100*size[1]+'px', border: '0'}" /> -->
      <video-panel v-if="item.style === 2" :width="100*size[0]" :height="100*size[1]" :src="url" :item="item" :mesh="mesh" :style="{'width':100*size[0]+'px','height':100*size[1]+'px'}"/>
      <div v-if="item.style === 2" :style="{'width':100*size[0]+'px','height':100*size[1]+'px'}"/>
      <img v-if="item.type===1" :src="iconPath" style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%); width:40px; height:40px;" />
      <!-- <svg-icon v-if="item.type===1" icon-class='example' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" /> -->
      <i v-if="item.type===2" class='el-icon-place' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%); font-size: 50px" />
      <div class="label-frame">
        <div v-if="item.label" class="label">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import path from 'path'
import VideoPanel from '../video'

const iconPath = './static/m.gif'
const layout = {
  '0':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'flex-start', width: '100%', height: '100%' },
  '1':{display:'flex', 'justify-content': 'center', 'align-items': 'flex-start', width: '100%' , height: '100%'},
  '2':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'flex-start' , width: '100%', height: '100%'},
  '3':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'center', width: '100%' , height: '100%'},
  '4':{display:'flex', 'justify-content': 'center', 'align-items': 'center' , width: '100%', height: '100%'},
  '5':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'center', width: '100%' , height: '100%'},
  '6':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'flex-end', width: '100%' , height: '100%'},
  '7':{display:'flex', 'justify-content': 'center', 'align-items': 'flex-end' , width: '100%', height: '100%'},
  '8':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'flex-end', width: '100%' , height: '100%'},
}

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI,  Math.PI/2, 'XYZ'))

export default {
  components:{VideoPanel},
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
    },
    iconPath:()=>iconPath,
    layout:() => layout,
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    videourl(){
      return location.href.replace(this.$route.path,'/video?link='+encodeURI(this.url))
      +'&width='+100*this.size[0]+'px'
      +'&height='+100*this.size[1]+'px'
      +'&layout='+this.item.align || '4'
    }
  }
}
</script>
<style scoped="three">
.label-frame{
  width: 1000px; display: flex;
  justify-content: center;
  position: absolute;
  /* width: max-content; */
  top: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.label{
  border-radius: 20px;
  background: #0008;
  padding: 5px 10px;
  color: white;
}
</style>

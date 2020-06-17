<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none', width:100*size[0]+10+'px', height:100*size[1]+10+'px'}">
    <div :style="layout[item.align || '4']" @click="$emit('action', item)">
      <span style="position: relative">
      <img v-if="item.style === 1" :src="url" :max-width="100*size[0]+'px'" :style="{'object-fit':'contain','max-width':100*size[0]+'px', 'max-height':100*size[1]+'px'}"/>
      <!-- <video-panel v-if="item.style === 2" :width="100*size[0]" :height="100*size[1]" :src="url" :item="item" :mesh="mesh"/> -->
      <!-- <div v-if="item.style === 2" :style="{'width':100*size[0]+'px','height':100*size[1]+'px'}"/> -->
      <!-- <iframe v-if="item.style === 2" :src="videourl" :style="{'max-width':100*size[0]+'px','max-height':100*size[1]+'px', border: '0'}"/> -->
      <!-- <img v-if="item.type===1 && item.target.link" :src="iconPath" style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%); width:40px; height:40px;" /> -->
      <div v-if="item.type===1 && item.target.link" :class="visible && 'breathe-btn'" style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)"></div>
      <i v-if="item.type===2" class='el-icon-location' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" />
      <div class="label-frame">
        <div v-if="item.label" class="label">{{item.label}}</div>
      </div>
    </span>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import mixin from '../mixin'
import path from 'path'
import VideoPanel from '../video'

const iconPath = './static/m.gif'
export default {
  components:{VideoPanel},
  mixins: [mixin],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){},
    // propCompute(){},
  },
  computed:{
    iconPath:()=>iconPath,
    visible(){return this.obj && this.obj.visible}
  },
  mounted(){},
  beforeDestroy(){}
}
</script>
<style scoped="three">
.label-frame{
  width: 1000px; display: flex;
  justify-content: center;
  position: absolute;
  /* width: max-content; */
  top: -10px;
  left: 50%;
  transform: translate(-50%, -100%);
}
.label{
  border-radius: 20px;
  background: #0008;
  padding: 5px 10px;
  color: white;
}
.breathe-btn{
  width:20px;
  height:20px;
  border:5px solid #2b92d4;
  border-radius:20px;
  animation:ease-in-out breathe 2700ms infinite alternate;
}
@keyframes breathe{
0% {box-shadow:0 1px 2px rgba(255,255,255,0.1);}
100% {border:5px solid rgba(59,235,235,1); box-shadow:0 1px 30px rgba(59,255,255,1);}
}
</style>

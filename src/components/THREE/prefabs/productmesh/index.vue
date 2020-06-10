<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none', width:100*size[0]+10+'px', height:100*size[1]+10+'px'}">
    <div :style="layout[item.align || '4']">
      <el-button class="layer" type="text"  @click="$emit('action', item)" style="padding:0">
        <img v-if="item.style === 1" :src="url" :max-width="100*size[0]+'px'" :style="{'object-fit':'contain','max-width':100*size[0]+'px', 'max-height':100*size[1]+'px'}"/>
        <video-panel v-if="item.style === 2" :width="100*size[0]" :height="100*size[1]" :src="url" :item="item" :mesh="mesh"/>
        <div v-if="item.style === 2" :style="{'width':100*size[0]+'px','height':100*size[1]+'px'}"/>
        <!-- <iframe v-if="item.style === 2" :src="videourl" :style="{'max-width':100*size[0]+'px','max-height':100*size[1]+'px', border: '0'}"/> -->
        <img v-if="item.type===1" :src="iconPath" style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%); width:40px; height:40px;" />
        <!-- <svg-icon v-if="item.type===1" icon-class='example' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" /> -->
        <i v-if="item.type===2" class='el-icon-location' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" />
        <div v-if="item.label" class="label">{{item.label}}</div>
      </el-button>
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
    iconPath:()=>iconPath
  },
  mounted(){},
  beforeDestroy(){}
}
</script>
<style scoped="three">
.label{
  position: absolute;
  border-radius: 20px;
  background: #0008;
  padding: 5px 10px;
  color: white;
  /* width: max-content; */
  top: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

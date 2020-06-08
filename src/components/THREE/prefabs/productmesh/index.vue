<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none', width:100*size[0]+10+'px', height:100*size[1]+10+'px'}">
    <div :style="layout[item.align || '4']">
      <el-button class="layer" type="text" @click="$emit('action', item)" style="padding:0">
        <img v-if="item.style === 1" :src="url" :max-width="100*size[0]+'px'" :style="{'object-fit':'contain','max-width':100*size[0]+'px', 'max-height':100*size[1]+'px'}"/>
        <video v-if="item.style === 2" :src="url" loop autoplay playsinline :style="{'max-width':100*size[0]+'px','max-height':100*size[1]+'px','object-fit':contain}" muted />
        <svg-icon v-if="item.type===1" icon-class='example' style="z-index:1; color:white; text-shadow: 1px 1px 2px pink; position:absolute;left:50%; top:50%; transform:translate(-50%,-50%)" />
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

export default {
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
  mounted(){},
  beforeDestroy(){}
}
</script>

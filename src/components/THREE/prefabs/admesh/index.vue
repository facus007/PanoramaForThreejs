<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none'}">
    <div :style="layout[item.align || '4']" @click="$emit('action',item)">
      <div v-if="item.style === 1 && image && imageData" :style="{width:width * 100+'px', height: height * 100+'px'}"/>
      <gl-image v-if="item.style === 1 && image && imageData && visible" :image="imageData" :mesh="mesh" :item="item" :visible="visible"/>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import mixin from '../mixin'
import path from 'path'
// import VideoPanel from '../video'

const iconPath = './static/m.gif'

export default {
  // components:{VideoPanel},
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
    visible(){return !this.hidden && this.obj && this.obj.visible}
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

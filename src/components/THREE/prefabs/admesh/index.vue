<template>
  <div class="css3d" :style="{border: outline ? '5px dashed yellow' : 'none', width:size[0] * 100+'px', height: size[1] * 100+'px'}">
    <div :style="layout[item.align || '4']" @click="$emit('action',item)">
      <div v-if="item.style === 1 && image && imageData" :style="{width:width * 100+'px', height: height * 100+'px'}"/>
      <gl-image v-if="item.style === 1 && image && imageData && !item.target.dynamic_img" :image="imageData" :mesh="mesh" :item="item" :visible="visible"/>
      <dgl-image v-if="item.style === 1 && image && imageData && item.target.dynamic_img" :image="imageData" :mesh="mesh" :item="item" :visible="visible"/>
      <gl-video v-if="item.style === 2 && image && imageData && visible" :image="imageData" :video="item.target.video" :mesh="mesh" :item="item" :visible="visible"/>
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
  computed:{
    visible(){return !this.hidden}
  },
}
</script>
<style scoped>
.css3d{
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 1;
}
</style>

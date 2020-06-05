<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none'}">
    <el-button class="layer" type="text" @click="$emit('action',item)">
      <img v-if="item.style === 1" :src="url" :width="100*size[0]+'px'" :height="100*size[1]+'px'" style="object-fit:contain">
      <video v-if="item.style === 2" :src="url" loop autoplay playsinline :style="{width:100*size[0]+'px',height:100*size[1]+'px'}" style="object-fit:contain" muted />
    </el-button>
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

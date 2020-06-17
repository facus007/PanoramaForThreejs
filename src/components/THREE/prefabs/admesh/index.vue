<template>
  <div :style="{border: outline ? '5px dashed yellow' : 'none', width:100*size[0]+10+'px', height:100*size[1]+10+'px'}">
    <div :style="layout[item.align || '4']" @click="$emit('action',item)">
      <img v-if="item.style === 1" :src="url" :style="{'object-fit':'contain','max-width':100*size[0]+'px', 'max-height':100*size[1]+'px'}"/>
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

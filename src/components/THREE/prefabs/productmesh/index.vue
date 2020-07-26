<template>
  <div class="css3d" :style="{border: outline ? '5px dashed yellow' : 'none', width:size[0] * 100+'px', height:size[1] * 100+'px'}">
    <div :style="layout[item.align || '4']" @click="$emit('action', item)">
      <div v-if="item.style === 1 && image && imageData" :style="{width:width * 100+'px', height:height * 100+'px', position:'absolute'}">
        <div class="label-frame">
          <div v-if="item.label" class="label">{{item.label}}</div>
        </div>
      </div>
      <gl-image v-if="item.style === 1 && image && imageData && !item.target.dynamic_img" :image="imageData" :mesh="mesh" :item="item" :visible="visible"/>
      <dgl-image v-if="item.style === 1 && image && imageData && item.target.dynamic_img" :image="imageData" :mesh="mesh" :item="item" :visible="visible"/>
      <gl-video v-if="item.style === 2 && image && imageData && visible" :image="imageData" :video="item.target.video" :mesh="mesh" :item="item" :visible="visible"/>
      <spot v-if="item.style === 1 && ((item.type === 1 &&item.target.link) || item.type === 3 || item.type === 4) && !item.target.hidespot && image && imageData" :image="imageData" :mesh="mesh" :item="item" :visible="visible" :key="item.target.spot_url"/>
      <goto v-if="item.type===2 && !item.target.hidespot" :mesh="mesh" :item="item" :visible="visible" :key="item.target.spot_url"/>
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
<style scoped="three">
.label-frame{
  width: 1000px; display: flex;
  justify-content: center;
  position: absolute;
  /* width: max-content; */
  left: 50%;
  transform: translate(-50%, -100%);
  pointer-events: none;
}
.label{
  border-radius: 20px;
  background: #0008;
  padding: 5px 10px;
  color: white;
}
/* .breathe-btn{
  width:20px;
  height:20px;
  border:5px solid #2b92d4;
  border-radius:20px;
  animation:ease-in-out breathe 2700ms infinite alternate;
}
@keyframes breathe{
0% {box-shadow:0 1px 2px rgba(255,255,255,0.1);}
100% {border:5px solid rgba(59,235,235,1); box-shadow:0 1px 30px rgba(59,255,255,1);}
} */
</style>
<style scoped>
.css3d{
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>

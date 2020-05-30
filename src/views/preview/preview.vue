<template>
  <div class="home shadow" style="background: #304156; grid-area: a; padding: 10px; position: relative;">
    <THREE class="shadow" style="position: relative;" :isDebug="isDebug">
      <stats v-if="isDebug"/>
      <orbit-controls style="z-index: 1" ref="controls" :start_rotation="curedit.start_rotation"/>
      <WebGLRenderer :option="{antialias:true}" ref="renderer">
        <CSS3DRenderer/>
        <panorama v-if="sideImgs" :sideImgs="sideImgs"/>
        <prebuild :template="curedit.template" v-model="group">
          <span v-for="item, index in group && curedit.embeddings[0].hotspots">
            <ad-mesh class="event" v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item"/>
          </span>
        </prebuild>
        <prebuild :template="curedit.template" v-model="group">
          <span v-for="item, index in group && curedit.embeddings[1].hotspots">
            <product-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item"/>
          </span>
        </prebuild>
      </WebGLRenderer>
    </THREE>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'

export default {
  mixins:[mixin],
  components:{...THREE},
  props:['curedit'],
  data(){
    return {
    self: this,
    group: null,
  }},
  computed:{
    isDebug: () => process.env.NODE_ENV === "development",
    sideImgs() {
      return this.curedit && [
        this.curedit.pano_graphic_url1,
        this.curedit.pano_graphic_url2,
        this.curedit.pano_graphic_url3,
        this.curedit.pano_graphic_url4,
        this.curedit.pano_graphic_url5,
        this.curedit.pano_graphic_url6
      ]
    },
  },
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>
<style scoped="three">
.event :hover{
  cursor: pointer;
  pointer-events: visible;
}
</style>

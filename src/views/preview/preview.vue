<template>
  <div class="home shadow" style="background: #304156; grid-area: a; position: relative; width:100%; height:100%">
    <THREE class="shadow" style="position: relative;" :isDebug="isDebug">
      <stats v-if="isDebug"/>
      <orbit-controls style="z-index: 1" ref="controls" :start_rotation="curScene.start_rotation"/>
      <WebGLRenderer :option="{antialias:true}" ref="renderer">
        <CSS3DRenderer/>
        <panorama v-if="sideImgs" :sideImgs="sideImgs"/>
        <prebuild :template="curScene.template" v-model="group">
          <span v-for="item, index in group && curScene.embeddings[0].hotspots">
            <ad-mesh class="event" v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" @action="action"/>
          </span>
        </prebuild>
        <prebuild :template="curScene.template" v-model="group">
          <span v-for="item, index in group && curScene.embeddings[1].hotspots">
            <product-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" @action="action"/>
          </span>
        </prebuild>
      </WebGLRenderer>
    </THREE>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'

export default {
  components:{...THREE},
  props:['curScene'],
  data(){
    return {
    self: this,
    group: null,
  }},
  computed:{
    isDebug: () => process.env.NODE_ENV === "development",
    sideImgs() {
      return this.curScene && [
        this.curScene.pano_graphic_url1,
        this.curScene.pano_graphic_url2,
        this.curScene.pano_graphic_url3,
        this.curScene.pano_graphic_url4,
        this.curScene.pano_graphic_url5,
        this.curScene.pano_graphic_url6
      ]
    },
  },
  methods:{
    action(item){
      if(item.type===1){
        var a = document.createElement('a');
        a.href=item.target.link
        a.click()
      }
    }
  },
  mounted(){},
  beforeDestroy(){},
  created(){
    console.log(this.curScene.start_rotation)
  }
}
</script>
<style scoped="three">
.event :hover{
  cursor: pointer;
  pointer-events: visible;
}
</style>

<template>
  <span>
    <WebGLRenderer :option="{antialias:true}" ref="renderer">
      <CSS3DRenderer>
        <orbit-controls ref="controls" :start_rotation="curScene.start_rotation"/>
        <panorama v-if="sideImgs" :sideImgs="sideImgs" :key="value"/>
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
          <prebuild :template="curScene.template" v-model="group">
            <span v-for="item, index in group && curScene.embeddings[2].hotspots">
              <hotspot-mesh :url="item.img_url" :key="index" :item="item" @action="action"/>
            </span>
          </prebuild>
      </CSS3DRenderer>
    </WebGLRenderer>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'

export default {
  components:{...THREE},
  props:['curScene', 'value'],
  data(){
    return {
      self: this,
      group: null,
    }},
    computed:{
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
        if(item.type===1 && item.target.link){
          var a = document.createElement('a');
          a.href=item.target.link
          a.click()
        }
        else if (item.type===2 && item.target.scene_id) {
          this.$emit('input', item.target.scene_id)
        }
      }
    },
    mounted(){},
    beforeDestroy(){},
    created(){}
  }
  </script>
  <style scoped="three">
  .event :hover{
    cursor: pointer;
    pointer-events: visible;
  }
  </style>

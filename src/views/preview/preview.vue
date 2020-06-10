<template>
  <span>
    <transition name="el-fade-in"><span>
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
    </span></transition>
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

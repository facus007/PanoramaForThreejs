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
    <transition name="el-fade-in">
      <div v-if="showDialog" style="width: 100%; height: 100%; z-index: 2000; top: 0; left: 0; position: absolute;background: #000E; display: flex; align-items: center;" @click="showDialog=false">
        <el-button icon="el-icon-close" type="text" style="position: absolute; font-size: 30px; right: 20px; top: 40px; padding: 0;"/>
        <video v-if="link" :src="link" style="width:100%; border:0px;" controls autoplay playsinline webkit-playsinline x5-playsinline/>
      </div>
    </transition>
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
      link: null,
      showDialog: null,
    }},
    watch:{
      showDialog(next){
        if(!next){
          this.link = null
        }
      }
    },
    methods:{
      action(item){
        if(item.type===1 && item.target.link){
          this.$emit('action')
          var a = document.createElement('a');
          a.href=item.target.link
          a.click()
        }
        else if (item.type===2 && item.target.scene_id) {
          this.$emit('input', item.target.scene_id)
        }
        else if (item.type===3 && item.target.video) {
          this.link = item.target.video
          this.showDialog = true
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
  .dialog >>> .el-dialog{
    margin-top: 15vw;
    padding: 0;
    background: #0000;
  }
  .dialog >>> .el-dialog__header{
    padding: 0;
  }
  .dialog >>> .el-dialog__body{
    height: 70vw;
    padding: 0;
    overflow: hidden;
  }
  </style>

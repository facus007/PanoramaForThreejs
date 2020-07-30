<template>
  <div style="position:absolute; width:100%; height:100%;">
    <transition name="el-fade-in">
      <div class="event scene-tab" v-if="showSceneTab" :style="{bottom: height+'px'}">
        <div class="block">
          <div v-for="scene,index in product.scenes" class="tab">
            <img :src="scene.pano_graphic_url4" style="height:50px; width:100px; object-fit: cover;" @click="switchScene(scene)"/>
            <div style="position:absolute; width:100%; height:15px; display:flex;justify-content:center; background:#0008; bottom:0;align-items:center;">
              {{scene.name}}
            </div>
          </div>
        </div>
        <div class="block" style="overflow:hidden">{{product.name}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:['height'],
  data(){return {
    showSceneTab: false
  }},
  computed:{
    ...mapState('preview', ['product','scene']),
  },
  methods:{
    sceneTab(){
      this.showSceneTab = !this.showSceneTab
    },
    switchScene(scene){
      this.$store.commit('preview/SET_CURSCENE_ID', scene.scene_id)
    }
  }
}
</script>

<style scoped>
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: auto;
}
.scene-tab{
  position:absolute;
  width:100%;
  height:86px;
  display: grid;
  grid-gap: 4px;
  grid-template-rows: 1fr 22px;
}
.block{
  width: 100%;
  background:#0008;
  color: white;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  grid-auto-flow: column;
  overflow: auto;
  gap: 10px;
  padding: 5px;
}
.tab{
  height: 50px;
  width: 100px;
  background: white;
  position: relative;
  cursor: pointer;
}
</style>

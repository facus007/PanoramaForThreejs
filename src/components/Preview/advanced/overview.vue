<template>
  <div class="absolute">
    <transition name="el-fade-in">
      <div class="event grid grid-centering grid-horizontal scene-tab" v-if="showSceneTab" :style="{bottom: height+'px'}">
        <div v-for="scene,index in product.scenes" style="position: relative; overflow:hidden;" class="scene-box">
          <img :src="scene.pano_graphic_url4" class="scene-box" @click="switchScene(scene)"/>
          <div style="position:absolute; width:100%; height:15px; display:flex;justify-content:center; background:#0008; bottom:0;align-items:center;">
            {{scene.name}}
          </div>
        </div>
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
.scene-tab{
  position:absolute;
  width:100%;
  background:#0008;
  color: white;
  font-size: 12px;
  overflow: auto;
  padding: 5px;
  justify-content: center;
}
</style>

<template>
  <div class="scene" style="display: grid;width:100%; height:100%; grid-template-areas:'a' 'c'; grid-column-gap: 4px; grid-row-gap: 2px; grid-template-rows:1fr 20px;">
    <el-button class="upload" type="text" @click="showSceneSelector=true" style="grid-area: a; width: 100%; height: 100%; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="selected.target.scene_id" :src="selected.target.scene_cover" fit="cover" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <el-checkbox v-model="selected.target.hidespot" style="margin-left:auto;color:gray; grid-area: c;">隐藏呼吸灯</el-checkbox>
    <scene-selector v-model="showSceneSelector" @select="selectScene" :curSceneId="curedit.scene_id"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import SceneSelector from '@/views/exhibition/sceneselector'

export default {
  props:['selected','getSelecteds'],
  data(){return{showSceneSelector:false}},
  components:{SceneSelector},
  methods:{
    selectScene(scene){
      this.getSelecteds().forEach((item, i) => {
        item.target.scene_id = this.product.scenes.indexOf(scene) + ''
        item.target.scene_cover = scene.pano_graphic_url4
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
  },
  computed:{
    ...mapState('editor',['curedit', 'product']),
  }
}
</script>

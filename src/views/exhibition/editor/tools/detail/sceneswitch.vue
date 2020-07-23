<template>
  <div class="scene" style="display: grid;width:100%; height:100%; grid-template-areas:'a' 'c'; grid-column-gap: 4px; grid-row-gap: 2px; grid-template-rows:1fr 60px;">
    <el-button class="upload" type="text" @click="showSceneSelector=true" style="grid-area: a; width: 100%; height: 100%; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="selected.target.scene_id" :src="selected.target.scene_cover" fit="cover" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <span v-if="curedit.embeddings[0].hotspots.indexOf(selected) < 0" style="display: grid;width:100%; grid-template-areas:'a b' 'd c'; grid-column-gap: 4px; grid-row-gap: 2px;align-items: center; justify-items: flex-end;">
      <el-button type="primary" size="mini" style="width:100%;margin:0; grid-area: a;" @click="showSpotDialog=true">修改热点图标</el-button>
      <el-button type="primary" size="mini" style="width:100%;margin:0; grid-area: b;" @click="clearSpot">默认热点图标</el-button>
      <el-checkbox v-model="hidespot" style="margin:0;color:gray; grid-area: c;">隐藏热点图标</el-checkbox>
    </span>
    <material-selector v-model="showSpotDialog" @select="selectSpot" imgtype="1"/>
    <scene-selector v-model="showSceneSelector" @select="selectScene" :curSceneId="curedit.scene_id"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'
import SceneSelector from '@/views/exhibition/sceneselector'

export default {
  props:['selected','getSelecteds'],
  data(){return{
    showSceneSelector:false,
    showSpotDialog:false,
  }},
  components:{SceneSelector,MaterialSelector},
  methods:{
    selectScene(scene){
      this.getSelecteds().forEach((item, i) => {
        item.target.scene_id = this.product.scenes.indexOf(scene) + ''
        item.target.scene_cover = scene.pano_graphic_url4
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
    selectSpot(material){
      this.getSelecteds().forEach((item, i) => {
        item.target.spot_url = material.material_content
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
    clearSpot(){
      this.getSelecteds().forEach((item, i) => {
        item.target.spot_url = null
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    }
  },
  computed:{
    ...mapState('editor',['curedit', 'product']),
    hidespot:{
      get(){return this.selected.target.hidespot},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.target.hidespot = value
        })
      }
    }
  }
}
</script>

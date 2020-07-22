<template>
  <div style="color: white; font-size: 14px; font-weight: bold; height: 100%; width: 200px; display: grid; grid-gap: 1px; grid-template-rows: 30px 30px 1fr 40px 1fr;" class="event">
  <div class="block">属性</div>
  <div class="block" style="display:flex;align-items:center">
    <span style="width:60px">标签:</span><el-input class="select" size="mini" v-model="label" style=""></el-input>
  </div>
  <div class="block" style="display:flex; flex-direction:column; align-items: flex-start;">
    <div style="width:100%;justify-content:flex-start;display:flex;">当前影像<span style="margin-left:auto;"></span></div>
    <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 100%; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="selected.img_url && selected.style === 1" :src="selected.img_url" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <video v-if="selected.target.video && selected.style === 2" :src="selected.target.video" autoplay playsinline x5-playsinline x5-video-player-type="h5" style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <el-checkbox v-model="selected.target.dynamic_img" style="margin-left:auto;color:gray;">序列帧长图</el-checkbox>
    <el-button type="primary" size="mini" style="width:100%;margin:0;" @click="clear">清空影像</el-button>
  </div>
  <div class="block">
    <el-select class="select" size="mini" v-model="option" style="">
      <el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"/>
    </el-select>
  </div>
  <div class="block" style="display:flex; flex-direction: column; justify-content:space-between; align-items:center; width: 100%;">
    <div v-if="option === '1'" style="display: flex; flex-direction: column; width: 100%; height:100%; align-items: flex-start;">
      <span>
        请输入超链接
        <el-tooltip class="item" effect="dark" content="超链接需附上 http:// 或 https:// " placement="right-end">
          <el-button type="text" class="el-icon-info" style="margin: 0;padding:0"/>
        </el-tooltip>
      </span>
      <el-input class="input" size="mini" v-model="link" style="margin:5px 0px"/>
      <span v-if="curedit.embeddings[0].hotspots.indexOf(selected) < 0" style="display: grid;width:100%; grid-template-areas:'a b' 'c c'; grid-column-gap: 4px; grid-row-gap: 2px;">
        <el-button type="primary" size="mini" style="width:100%;margin:0; grid-area: a;" @click="showSpotDialog=true">修改呼吸灯</el-button>
        <el-button type="primary" size="mini" style="width:100%;margin:0; grid-area: b;" @click="clearStop">默认呼吸灯</el-button>
        <el-checkbox v-model="selected.target.hidespot" style="margin-left:auto;color:gray; grid-area: c;">隐藏呼吸灯</el-checkbox>
      </span>
    </div>
    <div class="scene" v-if="option === '2'" style="width: 100%;display:flex; flex-direction: column;align-items:center;  ">
      <el-button class="upload" type="text" @click="showSceneSelector=true" style="width: 160px; height: 80px; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
        <el-image v-if="selected.target.scene_id" :src="selected.target.scene_cover" fit="cover" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-button>
      <el-checkbox v-model="selected.target.hidespot" style="margin-left:auto;color:gray;">隐藏图标</el-checkbox>
    </div>
    <div class="scene" v-if="option === '3'" style="display: grid;width:100%; height:100%; grid-template-areas:'a' 'c'; grid-column-gap: 4px; grid-row-gap: 2px; grid-template-rows:1fr 20px;">
      <el-button class="upload" type="text" @click="showvideoDialog=true" style="grid-area: a; width: 100%; height: 100%; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
        <video v-if="selected.target.video" :src="selected.target.video" controls autoplay playsinline style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-button>
      <el-checkbox v-model="selected.target.hidespot" style="margin-left:auto;color:gray; grid-area: c;">隐藏呼吸灯</el-checkbox>
    </div>
  </div>
  <material-selector v-model="showDialog" @select="select" imgtype="1,2"/>
  <material-selector v-model="showSpotDialog" @select="selectSpot" imgtype="1"/>
  <material-selector v-model="showvideoDialog" @select="selectVideo" imgtype="2"/>
  <scene-selector v-model="showSceneSelector" @select="selectScene" :curSceneId="curedit.scene_id"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'
import SceneSelector from '@/views/exhibition/sceneselector'

const options = [
  { value: '0', label: '无动作'},
  { value: '1', label: '超链接'},
  { value: '2', label: '场景跳转'},
  { value: '3', label: '视频展示'},
]
export default {
  components:{MaterialSelector,SceneSelector},
  data(){return {
    group: null,
    options,
    showDialog:false,
    showSpotDialog:false,
    showSceneSelector: false,
    showvideoDialog: false,
  }},
  props:['selected'],
  watch:{
  },
  methods:{
    onChange(){
      this.showDialog=true
    },
    select(material){
      this.getSelecteds().forEach((item, i) => {
        item.style = parseInt(material.material_type)
        item.img_url = material.material_content
        if(item.style === 2) {
          item.img_url = material.resource_url
          item.target.video = material.material_content
        }
      });
    },
    selectVideo(material){
      this.getSelecteds().forEach((item, i) => {
        item.img_url = material.resource_url || item.img_url
        item.target.video = material.material_content
      });
    },
    selectSpot(material){
      this.getSelecteds().forEach((item, i) => {
        item.target.spot_url = material.material_content
      });
    },
    selectScene(scene){
      this.getSelecteds().forEach((item, i) => {
        item.target.scene_id = this.product.scenes.indexOf(scene) + ''
        item.target.scene_cover = scene.pano_graphic_url4
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
    getSelecteds(){
      let selecteds = []
      this.product.scenes.forEach((item, i) => {
        item.embeddings[0].hotspots.forEach((item_, i) => {
          if(item_.name === this.selected.name){
            selecteds.push(item_)
          }
        });
        item.embeddings[1].hotspots.forEach((item_, i) => {
          if(item_.name === this.selected.name){
            selecteds.push(item_)
          }
        });
        item.embeddings[2].hotspots.forEach((item_, i) => {
          if(item_.name === this.selected.name){
            selecteds.push(item_)
          }
        });
      });
      return selecteds
    },
    clear(){
      this.getSelecteds().forEach((item, i) => {
        item.img_url = null
        item.target.video = null
      });
    },
    clearStop(){
      this.getSelecteds().forEach((item, i) => {
        item.target.spot_url = null
      });
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    ...mapState('editor',['curedit', 'product']),
    label:{
      get(){return this.selected.label},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.label = value
        })
      }
    },
    option:{
      get(){return this.selected.type.toString()},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.type = parseInt(value)
        })
      }
    },
    link:{
      get(){return this.selected.target.link},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.target.link = value
        })
      }
    }
  }
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
.block{
  text-align: center;
  background: rgba(51,51,51,0.8);
  padding: 5px;
  display: grid; grid-gap: 5px;
  width:100%;
}
.select >>> input{
  background-color: #0000;
  border-color: #0000;
  color: white;
}
.upload >>> .el-upload--picture-card{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #0000;
}
.radio >>> .el-radio{
  color: white;
}
.input >>> input {
  width:100%;
}
</style>

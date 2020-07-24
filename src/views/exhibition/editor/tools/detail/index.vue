<template>
  <div :style="{'grid-template-rows': options[option].layout}" class="event panel">
    <div class="block">属性</div>
    <div class="block" style="display:flex;align-items:center">
      <span style="width:60px">标签:</span><el-input class="select" size="mini" v-model="label"></el-input>
    </div>
    <div class="block" style="display:flex; flex-direction:column; align-items: flex-start;">
      <div style="width:100%;justify-content:flex-start;display:flex;">当前影像
        <span style="margin-left:auto;">
          <el-checkbox v-model="selected.target.dynamic_img" style="color:gray;">序列帧长图</el-checkbox>
        </span>
      </div>
      <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 100%; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
        <el-image v-if="selected.img_url && selected.style === 1" :src="selected.img_url" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
        <video v-if="selected.target.video && selected.style === 2" :src="selected.target.video" autoplay playsinline x5-playsinline x5-video-player-type="h5" style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-button>
      <el-button type="primary" size="mini" style="bottom:0;width:100%;margin:0;" @click="clear">清空影像</el-button>
    </div>
    <div class="block">
      <el-select class="select" size="mini" v-model="option" style="">
        <el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"/>
      </el-select>
    </div>
    <div class="block" style="display:flex; flex-direction: column; justify-content:space-between; align-items:center; width: 100%;">
      <component :is="options[option].component" :getSelecteds="getSelecteds" :selected="selected"/>
    </div>
    <material-selector v-model="showDialog" @select="select" imgtype="1,2"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'
import SceneSelector from '@/views/exhibition/sceneselector'
import empty from './empty'
import hyperlink from './hyperlink'
import sceneswitch from './sceneswitch'
import videoselect from './videoselect'
import hypertext from './hypertext'

const options = [
  { value: '0', label: '无动作', component: 'empty', layout: '30px 30px 180px 40px 122px'},
  { value: '1', label: '超链接', component: 'hyperlink', layout: '30px 30px 180px 40px 122px'},
  { value: '2', label: '场景跳转', component: 'sceneswitch', layout: '30px 30px 180px 40px 172px'},
  { value: '3', label: '视频展示', component: 'videoselect', layout: '30px 30px 180px 40px 152px'},
  { value: '4', label: '富文本', component: 'hypertext', layout: '30px 30px 180px 40px 97px'},
]

const styles = {
  '1':1,'2':2,'10':1
}
export default {
  components:{MaterialSelector,SceneSelector,empty,hyperlink,sceneswitch,videoselect,hypertext},
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
        item.style = styles[material.material_type]
        item.img_url = material.material_content
        if(item.style === 2) {
          item.img_url = material.resource_url
          item.target.video = material.material_content
        }
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
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    ...mapState('editor',['curedit', 'product']),
    label:{
      get(){return this.selected.label},
      set(value){this.getSelecteds().forEach((item, i) => item.label = value)}
    },
    option:{
      get(){return this.selected.type.toString()},
      set(value){this.getSelecteds().forEach((item, i) => item.type = parseInt(value))}
    },
  }
}
</script>

<style scoped="three">
.panel{
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 240px;
  display: grid;
  grid-gap: 1px;
}
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
  position: relative;
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

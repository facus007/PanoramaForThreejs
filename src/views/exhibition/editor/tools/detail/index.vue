<template>
  <div class="grid grid-centering grid-vertical event panel">
    <div class="block centering">属性</div>
    <div class="block grid grid-centering grid-horizontal">
      <span>标签:</span><el-input class="select" size="mini" v-model="label"></el-input>
    </div>
    <div class="block grid grid-centering" style="grid-template-areas:'a b''c c''d d'">
      <span style="grid-area: a; justify-self: flex-start;">当前影像</span>
      <el-checkbox v-model="dynamic_img" style="color:gray; grid-area: b; justify-self: flex-end;">序列帧长图</el-checkbox>
      <el-button class="upload" type="text" @click="onChange" style="grid-area: c; padding:0;">
        <img class="image-box image-box-2x" v-if="selected.img_url && selected.style === 1" :src="selected.img_url"/>
        <video class="image-box image-box-2x" v-else-if="selected.target.video && selected.style === 2" :src="selected.target.video" autoplay playsinline x5-playsinline x5-video-player-type="h5" muted />
        <i v-else class="el-icon-plus avatar-uploader-icon image-box image-box-2x centering" style="border: 1px dashed white;"></i>
      </el-button>
      <el-button type="primary" size="mini" @click="clear" style="grid-area: d; width: 100%; margin: 0;">清空影像</el-button>
    </div>
    <div class="block">
      <el-select class="select" size="mini" v-model="option" style="width: 100%;">
        <el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"/>
      </el-select>
    </div>
    <div class="block" style="width: 100%;">
      <component :is="options[option].component" :getSelecteds="getSelecteds" :selected="selected"/>
    </div>
    <material-selector v-model="showDialog" @select="select" imgtype="1,2"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'
import empty from './empty'
import hyperlink from './hyperlink'
import sceneswitch from './sceneswitch'
import videoselect from './videoselect'
import hypertext from './hypertext'

const options = [
  { value: '0', label: '无动作', component: 'empty'},
  { value: '1', label: '超链接', component: 'hyperlink'},
  { value: '2', label: '场景跳转', component: 'sceneswitch'},
  { value: '3', label: '视频展示', component: 'videoselect'},
  { value: '4', label: '富文本', component: 'hypertext'},
]

const styles = {
  '1':1,'2':2,'10':1
}
export default {
  components:{MaterialSelector,empty,hyperlink,sceneswitch,videoselect,hypertext},
  data(){return {
    group: null,
    options,
    showDialog:false,
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
          item.img_url = item.img_url || material.resource_url
          item.target.video = material.material_content
          item.target = JSON.parse(JSON.stringify(item.target))
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
        item.target.remark = null
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'domElement']),
    ...mapState('editor',['curedit', 'product']),
    label:{
      get(){return this.selected.label},
      set(value){this.getSelecteds().forEach((item, i) => item.label = value)}
    },
    option:{
      get(){return this.selected.type.toString()},
      set(value){this.getSelecteds().forEach((item, i) => item.type = parseInt(value))}
    },
    dynamic_img:{
      get(){return this.selected.target.dynamic_img},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.target.dynamic_img = value
          item.target = JSON.parse(JSON.stringify(item.target))
        })
      }
    },
  }
}
</script>

<style scoped>
.panel{
  color: white;
  font-size: 14px;
  font-weight: bold;
}
</style>

<style scoped="three-editor">
.block{
  background: rgba(51,51,51,0.8);
  padding: 5px;
  width: 100%;
}
.select >>> input{
  background-color: rgba(0,0,0,0);
  border-color: rgba(0,0,0,0);
  color: white;
}
.upload >>> .el-upload--picture-card{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0);
}
.radio >>> .el-radio{
  color: white;
}
.input >>> input {
  width:100%;
}
</style>

<template>
  <div class="grid grid-vertical">
    <el-button type="primary" size="mini" style="width: 100%;" @click="showEditor=true">编 辑</el-button>
    <span class="grid grid-centering" v-if="curedit.embeddings[0].hotspots.indexOf(selected) < 0" style="width:100%; grid-template-areas:'c b' 'd a';">
      <el-button type="primary" size="mini" style="width:100%; margin:0; grid-area: c;" @click="showSpotDialog=true">修改呼吸灯</el-button>
      <el-button type="primary" size="mini" style="width:100%; margin:0; grid-area: b;" @click="clearSpot">默认呼吸灯</el-button>
      <el-checkbox v-model="hidespot" style="margin:0; color:gray; grid-area: a;">隐藏呼吸灯</el-checkbox>
    </span>
    <editor v-model="showEditor" @content="setContent" :item="selected.target"/>
    <material-selector v-model="showSpotDialog" @select="selectSpot" imgtype="1"/>
  </div>
</template>
<script>
import editor from './editor'
import MaterialSelector from '@/views/exhibition/materialselector'

import {mapState} from 'vuex'
export default{
  props:['selected','getSelecteds'],
  components:{editor,MaterialSelector},
  data(){return{
    showEditor:false,
    showSpotDialog:false
  }},
  methods:{
    setContent(content){
      this.getSelecteds().forEach((item, i) => {
        item.target.content = content
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
    link:{
      get(){return this.selected.target.link},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.target.link = value
          item.target = JSON.parse(JSON.stringify(item.target))
        })
      }
    },
    inline:{
      get(){return this.selected.target.inline},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.target.inline = value
          item.target = JSON.parse(JSON.stringify(item.target))
        })
      }
    },
    hidespot:{
      get(){return this.selected.target.hidespot},
      set(value){
        this.getSelecteds().forEach((item, i) => {
          item.target.hidespot = value
          item.target = JSON.parse(JSON.stringify(item.target))
        })
      }
    }
  }

}
</script>

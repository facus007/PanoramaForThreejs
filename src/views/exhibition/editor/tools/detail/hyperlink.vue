<template>
  <div class="grid grid-centering fill">
    <span style="justify-self: flex-start;">
      请输入超链接
      <el-tooltip class="item" effect="dark" content="超链接需附上 http:// 或 https:// " placement="right-end">
        <el-button type="text" class="el-icon-info" style="margin: 0; padding:0"/>
      </el-tooltip>
    </span>
    <el-input class="input" size="mini" v-model="link"/>
    <span v-if="curedit.embeddings[0].hotspots.indexOf(selected) < 0" class="grid grid-centering" style="width:100%; grid-template-areas:'d a' 'c b'; justify-items: flex-start;">
      <el-button type="primary" size="mini" style="width:100%; margin:0; grid-area: a;" @click="showSpotDialog=true">修改呼吸灯</el-button>
      <el-button type="primary" size="mini" style="width:100%; margin:0; grid-area: b;" @click="clearSpot">默认呼吸灯</el-button>
      <el-checkbox v-model="inline" style="margin:0; color:gray; grid-area: d;">弹框打开</el-checkbox>
      <el-checkbox v-model="hidespot" style="margin:0; color:gray; grid-area: c;">隐藏呼吸灯</el-checkbox>
    </span>
    <material-selector v-model="showSpotDialog" @select="selectSpot" imgtype="1"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'

export default {
  props:['selected','getSelecteds'],
  components:{MaterialSelector},
  data(){return{showSpotDialog:false}},
  methods:{
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

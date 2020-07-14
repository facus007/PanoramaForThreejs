<template>
  <div class="frame">
    <div style="width: 100%;">图标</div>
    <el-button class="upload" type="text" @click="showDialog= true">
      <el-image v-if="item.url" :src="item.url" fit="contain" style="position:absolute; width:100%; height: 100%; left:0;top:0;"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>

  <el-button type="primary" size="small" style="margin:0; width: 200px;" @click="showEditor=true">编 辑</el-button>

  <editor v-model="showEditor" @content="setContent"/>
  <material-selector v-model="showDialog" @select="select" imgtype="1"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import MaterialSelector from '@/views/exhibition/materialselector'
import editor from './editor'

export default {
  mixins:[mixin],
  props:['item', 'light'],
  data(){return {
    showDialog: false,
    showEditor: false,
  }},
  components:{MaterialSelector, editor},
  // props:['sideImgs'],
  watch:{},
  methods:{
    select(material){
      this.item.url = material.material_content
    },
    setContent(content){
      this.item.content = content
    }
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview','product']),
  },
}
</script>

<style scoped="views">
.frame {
  width: 100%;
  display: grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-gap: 10px;
  align-content: space-around;
}
.upload{
  width: 100%; height: 160px;
  padding: 0;
  position: relative;
  border-radius: 5px;
  border: 1px dashed;
}
</style>

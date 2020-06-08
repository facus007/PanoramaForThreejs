<template>
  <div class="frame" style="width: 100%; color: white; padding: 5px 10px; height: 100%;">
    <el-tabs v-model="tab_id" type="border-card" style="width: 100%; height: 100%; background: #0000; border: none;-webkit-box-shadow: none; box-shadow: none;">
      <el-tab-pane class="pane" :key="item.scene_id" v-for="(item, index) in product.scenes" :label="item.name" :name="index.toString()" >
        <div style="display: flex; margin: 0 10px; align-items: center">
          <el-button class="upload" type="text" style="width: 160px; height: 80px; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white; pointer-events:none">
            <el-image :src="item.pano_graphic_url4" fit="cover" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
          </el-button>
          <el-form class="form" label-position="left" style="display: flex; flex-direction: column; align-items:space-around; margin-left: 50px;">
            <el-form-item label="场景名称">
              <el-input size="mini" v-model="curedit.name" resize="none" :rows="1"></el-input>
            </el-form-item>
            <el-form-item label="场景描述">
              <el-input size="mini" type="textarea" v-model="curedit.description" resize="none"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
  </el-tabs>
  <material-selector v-model="showDialog" @select="select" imgtype="1"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import MaterialSelector from '../materialselector'

export const scenetab = {
  components:{MaterialSelector},
  mixins:[mixin],
  data(){return {
    tab_id: '0',
    showDialog: false,
  }},
  watch:{
    tab_id(next, pre){
      this.$store.dispatch('editor/setEdit', parseInt(next))
    },
  },
  methods:{
    onChange() {
      this.showDialog = true
    },
    select(material){
      this.curedit.cover = material.material_content
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('editor',['product', 'curedit']),
  }
}

export default scenetab;
</script>

<style scoped>
.frame >>> .el-tabs__item.is-active{
  background-color: #1f2d3d;
  border-right-color: #1f2d3d;
  border-left-color: #1f2d3d;
}
.frame >>> .el-tabs__header{
  background-color: #0000;
  border-bottom: 1px solid #1f2d3d
}
.frame >>> .el-tabs__item{
  color: white;
  padding: 0 10px;
}
.frame >>> .el-tabs__item.is-active{
  color: #409EFF;
}
.frame >>> .el-tabs__content{
  height: 100px;
  padding: 0;
  overflow: auto;
}
.frame >>> .el-tabs__content::-webkit-scrollbar-track-piece {
  background: #d3dce6;
}
.frame >>> .el-tabs__content::-webkit-scrollbar {
  width: 6px;
}
.frame >>> .el-tabs__content::-webkit-scrollbar-thumb {
  background: #99a9bf;
  border-radius: 20px;
}
.upload >>> .el-upload--picture-card{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.pane {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
.form >>> .el-form-item{
  margin-bottom: 5px;
  display: flex;
  /* flex-direction: column; */
}
.form >>> .el-form-item__label{
  color: white;
}
.form >>> .el-form-item__content{
  line-height: 0;
  display: flex;
  align-items: center;
}
</style>

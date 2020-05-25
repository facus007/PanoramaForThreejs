<template>
  <div class="frame" style="width: 100%; color: white; padding: 10px; height: 100%;">
    <el-tabs type="border-card" editable style="width: 100%; height: 100%; background: #0000; border: none;-webkit-box-shadow: none; box-shadow: none;">
      <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
        {{item.content}}
      </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

export const scene = {
  mixins:[mixin],
  data(){return {
    editableTabs: [{
      title: 'Tab 1',
      name: '1',
      content: 'Tab 1 content'
    }, {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content'
    }],
  }},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}

export default scene;
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
  height: 100%;
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
</style>

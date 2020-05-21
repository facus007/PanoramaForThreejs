<template>
  <el-tabs class="sidepanel" tabPosition="right" lazy style="color: white; height: 100%; padding: 10px 0;">
    <el-tab-pane label="基础"><standard/></el-tab-pane>
    <el-tab-pane label="视角"><viewspot/></el-tab-pane>
    <el-tab-pane label="热点"><hotspot/></el-tab-pane>
    <el-tab-pane label="沙盘"><sandbox/></el-tab-pane>
    <el-tab-pane label="音乐"><music/></el-tab-pane>
    <el-tab-pane label="嵌入"><embedded/></el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import standard from './standard'
import viewspot from './viewspot'
import hotspot from './hotspot'
import sandbox from './sandbox'
import music from './music'
import embedded from './embedded'

export default {
  mixins:[mixin],
  components: {standard, viewspot, hotspot, sandbox, music, embedded},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped>
.sidepanel >>> .el-tabs__item{
  color: white;
  padding: 0 10px;
}
.sidepanel >>> .el-tabs__item.is-active{
  color: #409EFF;
}
.sidepanel >>> .el-tabs__content{
  height: 100%;
  overflow-y: auto;
}
.sidepanel >>> .el-tabs__content::-webkit-scrollbar-track-piece {
  background: #d3dce6;
}
.sidepanel >>> .el-tabs__content::-webkit-scrollbar {
  width: 6px;
}
.sidepanel >>> .el-tabs__content::-webkit-scrollbar-thumb {
  background: #99a9bf;
  border-radius: 20px;
}
.sidepanel >>> .el-tab-pane {
  height: 200%;
}
</style>

<template>
  <el-container>
    <el-header style="padding: 0px 20px;">
      <slot name="header"/>
    </el-header>
    <el-main style="position: relative;">
      <el-table size="mini" :data="items" @selection-change="val=>$emit('selection-change',val)" tooltip-effect="dark" style="width: 100%; position:absolute;" :height="'100%'"
        :row-style="{height:'80px'}" :header-row-style="{height:'20px'}" :header-cell-style="{padding:'0'}">
        <slot name="columns"/>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination small background hide-on-single-page layout="total, prev, pager, next" :currentPage.sync="currentPage_"  :total="total" :page-size="pageSize"/>
    </el-footer>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TableFrame',
  data(){return {
    currentPage_: 0,
  }},
  props: ['total', 'pageSize', 'loading', 'items', 'currentPage'],
  watch: {
    currentPage_(next){
      this.$emit('update:currentPage', next)
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.el-container {
  /* position: absolute; */
  width: 100%;
  height: 100%;
}

.el-header{
  display: flex;
  align-items: center;
  padding: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}

.el-main{
  display: flex;
  padding: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}

.el-footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}

.el-table {
  overflow: auto;
}

.el-table ::-webkit-scrollbar-track-piece {
  background: #d3dce6;
}

.el-table ::-webkit-scrollbar {
  width: 4px;
}

.el-table ::-webkit-scrollbar-thumb {
  background: #99a9bf;
}
</style>

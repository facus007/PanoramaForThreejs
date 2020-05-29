<template>
  <container class="home" style="position: relative; display: flex; flex-direction: column;">
    <el-table class="table" :data="source" height="100%" :row-style="{'background-color': '#0000', height: '64px'}">
      <el-table-column :label="label">
        <template slot-scope="scope">
          <div :style="{display:'flex', background:scope.row === value ? '#1f2d3d' : '#0000', height:'64px', padding: '0'}">
            <el-button type="text" style="display:flex; padding:0; width:100%; height:100%; align-items: center; padding: 10px" @click="$emit('input', value !== scope.row && scope.row)">
              <div style="display: flex; width: 100%;">
                {{scope.row.name}}
              </div>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

export default {
  mixins:[mixin],
  props:['label', 'source', 'value'],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped="views">
.table {
  width: 100%;
  background-color: #0000;
  padding: 0;
  flex: auto;
}
.table >>> .el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background: #d3dce6;
}
.table >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 2px;
}
.table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #1f2d3d;
}
.table >>> td{
  padding: 0;
}
.table >>> .is-leaf{
  padding: 0;
}
.table >>> .cell {
  padding: 0;
}
</style>

<style>
.el-table th, .el-table tr{
  background-color: #0000;
}
</style>

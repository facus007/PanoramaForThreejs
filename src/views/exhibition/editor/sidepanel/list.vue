<template>
  <container class="home" style="position: relative; display: flex; flex-direction: column;">
    <el-table class="table" :data="source" height="100%" :row-style="{'background-color': '#0000', height: '64px'}" ref="table">
      <el-table-column :label="label">
        <template slot-scope="scope">
          <div :style="{display:'flex', background:scope.row === value ? '#1f2d3d' : '#0000', height:'64px', padding: '0'}">
            <el-button type="text" style="display:flex; padding:0; width:100%; height:100%; align-items: center; padding: 10px" @click="$emit('input', value !== scope.row && scope.row)">
              <span style="display:flex; padding:0; width:200px; height:100%; align-items: center;">
                <div class="text" style="display: flex; width: 80%">
                  {{scope.row.label || scope.row.name}}
                </div>
                <el-button v-if="clearable" type="text" style="margin-left: auto" icon="el-icon-close" @click="$emit('del', scope.row)"/>
              </span>
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
  props:['label', 'source', 'value', 'clearable'],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped="views">
.text{
  word-break: keep-all;           /* 不换行 */
  white-space: nowrap;          /* 不换行 */
  overflow: hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
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
  background-color: #0000;
  padding: 0;
}
.table >>> .cell {
  padding: 0;
}
.table >>> th, .table >>> tr{
  background-color: #0000;
}
</style>

<template>
  <el-table class="table" :data="source" height="100%" :row-style="{'background-color': '#0000', height: '64px'}" ref="table">
    <el-table-column :label="label">
      <template slot-scope="scope">
        <div :style="{display:'flex', background:scope.row === value ? '#1f2d3d' : '#0000', height:'64px', padding: '0'}">
          <el-button type="text" style="display:flex; padding:0; width:100%; height:100%; align-items: center; padding: 10px" @click="$emit('input', value !== scope.row && scope.row)">
            <span style="display:flex; padding:0; width:200px; height:100%; align-items: center;">
              <span class="text">{{scope.row.label || scope.row.name}}</span>
              <el-button v-if="clearable" type="text" style="margin-left: auto" icon="el-icon-close" @click="$emit('del', scope.row)"/>
            </span>
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
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
.table {
  background-color: #0000;
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

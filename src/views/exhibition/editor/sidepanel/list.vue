<template>
  <el-table class="table absolute" :data="source" height="100%" :row-style="{'background-color': 'rgba(0,0,0,0)', height: '64px'}" ref="table">
    <el-table-column :label="label">
      <template slot-scope="scope">
        <div :style="{background:scope.row === value ? '#1f2d3d' : '#304156', height:'64px', padding: '0'}">
          <el-button type="text" style="width: 100%;" @click="$emit('input', value !== scope.row && scope.row)">
            <span class="grid grid-horizontal grid-centering" style="grid-template-columns: 1fr 40px;">
              <span class="text centering" style="justify-self:flex-start; max-width:100%; padding: 0 10px;">{{scope.row.label || scope.row.name}}</span>
              <el-button v-if="clearable" type="text" icon="el-icon-close" @click="$emit('del', scope.row)"/>
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
  background-color: rgba(0,0,0,0);
}
.table >>> td{
  padding: 0;
}
.table >>> .is-leaf{
  background-color: rgba(0,0,0,0);
  padding: 0;
}
.table >>> .cell {
  padding: 0;
}
.table >>> th, .table >>> tr{
  background-color: rgba(0,0,0,0);
}
</style>

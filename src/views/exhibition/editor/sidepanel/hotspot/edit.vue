<template>
  <container class="home">
    <el-table class="table" :data="[]" height="100%" :row-style="{'background-color': '#0000', height: '64px'}">
      <el-table-column label="当前场景热点">
        <template slot-scope="scope">
          <div style="display: flex;">
            <el-button type='text' icon="el-icon-close" style="padding: 0;"/>
            <el-button type="text" style="display:flex; padding:0; width:100%">
              <div style="display: flex; width: 100%;">
                <div class="text name-label">
                  a
                </div>
                <div class="text type-label">
                  b
                </div>
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
</style>

<style>
.el-table th, .el-table tr{
  background-color: #0000;
}
</style>

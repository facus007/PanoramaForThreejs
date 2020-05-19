<template>
  <container>
    <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false" @selection-change="selectionChange">
      <template v-slot:columns="scope">
        <el-table-column type="selection"/>
        <el-table-column>
        </el-table-column>
      </template>
    </table-frame>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

const datalist = [0,1,2,3,4,5,6,7,8,9]

export default {
  mixins:[mixin],
  data(){ return {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    datalist,
  }},
  watch:{},
  methods:{
    selectionChange(val){},
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

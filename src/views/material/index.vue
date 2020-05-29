<template>
  <container>
    <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false">
      <template v-slot:header="scope">
        <el-button type="primary" size="small" @click="enableUpload = true">添加素材</el-button>
      </template>
      <template v-slot:columns="scope">
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <!-- <el-input size="small" placeholder="输入关键字搜索"/> -->
          </template>
        </el-table-column>
      </template>
    </table-frame>
    <uploader v-model="enableUpload"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import uploader from './uploader'

const datalist = [0,1,2,3,4,5,6,7,8,9]

export default {
  mixins:[mixin],
  components: {uploader},
  data(){ return {
    total: datalist.length,
    pageSize: 10,
    currentPage: 1,
    datalist,
    enableUpload: false,
  }},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

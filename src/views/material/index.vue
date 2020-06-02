<template>
  <container :refresh="refresh" v-loading="loading">
    <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false">
      <template v-slot:header="scope">
        <el-button type="primary" size="small" @click="newMaterial">上传素材</el-button>
      </template>
      <template v-slot:columns="scope">
        <el-table-column label="素材预览">
          <template v-slot:default="scope">
            <img v-if="scope.row.material_type === '1'" :src="scope.row.material_content" style="width:100px; height:50px; border-radius: 10px; object-fit:cover"/>
            <video v-if="scope.row.material_type === '2'" :src="scope.row.material_content" style="width:100px; height:50px; border-radius: 10px;" autoplay playsinline muted/>
            <div v-else style="width:100px; height:50px; border-radius: 10px; background: gray;" >
          </template>
        </el-table-column>
        <el-table-column label="素材类型">
          <template v-slot:default="scope">
            <span v-if="scope.row.material_type==='1'">图片</span>
            <span v-if="scope.row.material_type==='2'">视频</span>
          </template>
        </el-table-column>
      </template>
    </table-frame>
    <uploader v-model="showDialog"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import { listMaterials } from '@/api/server'
import mixin from '@/views/mixin'

export default {
  mixins:[mixin],
  data(){ return {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    datalist: null,
    loading: true,
    showDialog: false,
  }},
  watch:{},
  methods:{
    selectionChange(val){},
    newMaterial(){
      this.showDialog = true
    }
  },
  computed:{
    refresh(){
      this.loading = true
      listMaterials({
        endTime: this.$moment(new Date()).format('YYYYMMDDHHmmss'),
        materialType: '1,2',
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then(result=>{
        this.total = result.total
        this.datalist = result.materials
        this.loading = false
      })
    }
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

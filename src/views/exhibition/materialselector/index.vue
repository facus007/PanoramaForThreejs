<template>
  <el-dialog title="选择素材" :visible.sync="visible" width="50%" v-loading="loading" :modal="false">
    <container v-if="visible" :refresh="refresh" v-loading="loading">
      <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false" style="height:500px">
        <template v-slot:header="scope">
          <el-button type="primary" size="small" @click="newMaterial">上传素材</el-button>
          <el-button type="primary" size="small" @click="refresh_">刷新</el-button>
        </template>
        <template v-slot:columns="scope">
          <el-table-column label="素材预览">
            <template v-slot:default="scope">
              <el-button type="text" @click="()=>{$emit('select',scope.row);$emit('input', false)}" style="width: 100%; height: 100%; padding:0;display:flex;">
                <img v-if="scope.row.material_type === '1'" :src="scope.row.material_content" style="background:#EEE; width:100px; height:50px; border-radius: 10px; object-fit:contain"/>
                <video v-else-if="scope.row.material_type === '2'" :src="scope.row.material_content" style="background:#EEE; width:100px; height:50px; border-radius: 10px;" autoplay playsinline muted/>
                <audio v-else-if="scope.row.material_type === '5'" :src="scope.row.material_content" style="background:#EEE; width:350px; height:50px; border-radius: 10px;" playsinline controls/>
                <div v-else style="background:#EEE; width:100px; height:50px; border-radius: 10px;"/>
              </el-button>
              {{scope.row.remark}}
            </template>
          </el-table-column>
        </template>
      </table-frame>
      <uploader v-model="showDialog"/>
    </container>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { listMaterials } from '@/api/server'
import Container from '@/views/mixin/container'
import TableFrame from '@/components/UI/tableframe'
import Uploader from './uploader'
// import moment from 'moment'

export default {
  components:{Container, TableFrame, Uploader},
  data(){ return {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    datalist: null,
    visible: false,
    loading: true,
    showDialog: false,
  }},
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){
      this.visible = next
      if(!next){
        this.selected = '0'
        this.name = ''
        this.file = null
      }
    },
    showDialog(){
      this.loading = true
      listMaterials({
        // endTime: moment(new Date()).format('YYYYMMDDHHmmss'),
        materialType: this.imgtype,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then(result=>{
        this.total = result.total
        this.datalist = result.materials
        this.loading = false
      })
    }
  },
  props:['value', 'onSelect', 'imgtype'],
  methods:{
    selectionChange(val){},
    newMaterial(){
      this.showDialog = true
    },
    refresh_(){
      this.loading = true
      listMaterials({
        // endTime: moment(new Date()).format('YYYYMMDDHHmmss'),
        materialType: this.imgtype,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then(result=>{
        this.total = result.total
        this.datalist = result.materials
        this.loading = false
      })
    }
  },
  computed:{
    refresh(){
      this.refresh_()
    }
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<template>
  <el-dialog title="选择素材" :visible.sync="visible" width="50%" v-loading="loading" :refresh="refresh" :modal="false">
    <table-frame v-if="visible" :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false" style="height:500px">
      <template v-slot:header="scope">
        <el-button type="primary" size="small" @click="newMaterial" v-if="!showSystemStore">上传素材</el-button>
        <el-button type="primary" size="small" @click="refresh_">刷新</el-button>
        <el-checkbox v-if="imgtype.split(',').includes('1')" v-model="showSystemStore" size="small" style="margin-left: 10px">显示云端素材库</el-checkbox>
      </template>
      <template v-slot:columns="scope">
        <columns @select="row=>{$emit('select',row);$emit('input', false)}">
        </columns>
      </template>
    </table-frame>
    <uploader v-model="showDialog" :isCloud="showSystemStore" :accepttype="imgtype"/>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { listMaterials } from '@/api/server'
import Container from '@/views/mixin/container'
import TableFrame from '@/components/UI/tableframe'
import Uploader from './uploader'
import Columns from './columns'
// import moment from 'moment'

export default {
  components:{Container, TableFrame, Uploader, Columns},
  data(){ return {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    datalist: null,
    visible: false,
    loading: true,
    showDialog: false,
    showSystemStore: false,
  }},
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){
      this.visible = next
      if(!next){
        this.selected = '0'
        this.name = ''
        this.file = null
        this.showSystemStore = false
      }
    },
    showDialog(){
      this.loading = true
      listMaterials({
        // endTime: moment(new Date()).format('YYYYMMDDHHmmss'),
        materialType: this.showSystemStore ? '10' : this.imgtype,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then(result=>{
        this.total = result.total
        this.datalist = result.materials
        this.loading = false
      })
    },
    showSystemStore(next){
      this.currentPage = 1
      this.refresh_()
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
        materialType: this.showSystemStore ? '10' : this.imgtype,
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
    refresh(){this.refresh_()}
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

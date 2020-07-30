<template>
  <el-dialog title="选择素材" :visible.sync="visible" width="50%" v-loading="loading" :modal="false">
    <container v-if="visible" :refresh="refresh" v-loading="loading">
      <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false" style="height:500px">
        <template v-slot:header="scope">
          <el-button type="primary" size="small" @click="newMaterial" v-if="!showSystemStore">上传素材</el-button>
          <el-button type="primary" size="small" @click="refresh_">刷新</el-button>
          <el-checkbox v-if="imgtype.split(',').includes('1')" v-model="showSystemStore" size="small" style="margin-left: 10px">显示云端素材库</el-checkbox>
        </template>
        <template v-slot:columns="scope">
          <el-table-column label="素材预览">
            <template v-slot:default="scope">
              <el-button type="text" @click="()=>{$emit('select',scope.row);$emit('input', false)}" style="width: 100%; height: 100%; padding:0;">
                <span style="display:grid; grid-auto-flow: row; gap: 5px; height: 70px;">
                  <img v-if="scope.row.material_type === '1' || scope.row.material_type === '10'" :src="scope.row.material_content" class="image-box"/>
                  <video v-else-if="scope.row.material_type === '2'" :src="scope.row.material_content" class="image-box" autoplay playsinline muted/>
                  <audio v-else-if="scope.row.material_type === '5'" :src="scope.row.material_content" class="image-box" style="width: 350px;" playsinline controls/>
                  <div v-else class="image-box"/>
                  <div class="text" style="width: 350px; text-align: left;">{{scope.row.remark}}</div>
                </span>
              </el-button>
            </template>
          </el-table-column>
        </template>
      </table-frame>
      <uploader v-model="showDialog" :isCloud="showSystemStore" :accepttype="imgtype"/>
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
    refresh(){
      this.refresh_()
    }
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

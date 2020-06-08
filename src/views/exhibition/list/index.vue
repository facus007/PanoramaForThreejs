<template>
  <container :refresh="refresh" v-loading="loading">
    <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false">
      <template v-slot:header="scope">
        <el-button type="primary" size="small" @click="newProduct">新建作品</el-button>
      </template>
      <template v-slot:columns="scope">
        <el-table-column label="作品封面">
          <template v-slot:default="scope">
            <img :src="scope.row.cover" width="100px" height="50px" style="border-radius: 5px; box-shadow: 0 0 4px 0 gray; object-fit: cover;"/>
          </template>
        </el-table-column>
        <el-table-column label="作品名称">
          <template v-slot:default="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="作品描述">
          <template v-slot:default="scope">
            {{scope.row.description}}
          </template>
        </el-table-column>
        <el-table-column label="发布状态">
          <template v-slot:default="scope">
            <span :style="{'color': scope.row.published==='0' ? 'red' : 'green' }">{{scope.row.published==='0'?"未发布":"发布"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template v-slot:default="scope">
            {{scope.row.create_time}}
          </template>
        </el-table-column>
        <el-table-column label="修改日期">
          <template v-slot:default="scope">
            {{scope.row.update_time}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <div style="display: grid; grid-template-rows: 1fr;grid-template-columns: 1fr 1fr 1fr; grid-gap: 5px;">
              <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="preview(scope.row)">预览</el-button>
              <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="link(scope.row)">复制链接</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </table-frame>
    <new-product v-model="showDialog"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import { listProducts } from '@/api/server'
import NewProduct from './newproduct'
import mixin from '@/views/mixin'

export default {
  mixins:[mixin],
  components:{NewProduct},
  data(){ return {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    datalist: null,
    loading: true,
    showDialog: false,
  }},
  watch:{
    showDialog(){
      this.refresh_()
    }
  },
  methods:{
    selectionChange(val){},
    newProduct(){
      this.showDialog = true
    },
    edit(row){
      this.$router.push({path:'/exhibition/editor', query: { product_id: row.product_id }})
    },
    preview(row){
      this.$router.push({path:'/preview', query: { product_id: row.product_id }})
    },
    link(row){
      var input = document.createElement('input');
      document.body.appendChild(input);
      input.value = location.href.replace(this.$route.path,'/share?product_id='+row.product_id);
      input.focus();
      input.select();
      var result = document.execCommand('copy');
      input.remove()
      if (result === 'unsuccessful') {
        this.$message.error("复制至剪贴板失败")
      }
      else {
        this.$message("已复制至剪贴板")
      }
    },
    refresh_(){
      this.loading = true
      listProducts({
        endTime: this.$moment(new Date()).format('YYYYMMDDHHmmss'),
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then(result=>{
        this.total = result.total
        this.datalist = result.products
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

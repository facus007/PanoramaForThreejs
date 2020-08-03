<template>
  <div class="absolute" :refresh="refresh" v-loading="loading">
    <table-frame class="table" :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false">
      <template v-slot:header="scope">
        <div class="fill grid grid-horizontal grid-centering" style="grid-template-columns: auto 1fr auto auto auto">
          <el-button type="primary" size="small" @click="newProduct">新建作品</el-button>
          <div/><!-- placeholder -->
          <el-input v-model="queryParams.name" placeholder="请输入作品名称" clearable size="small"/>
          <el-date-picker v-model="queryParams.dateRanges" size="small" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <el-button type="warning" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>
      </template>
      <template v-slot:columns="scope">
        <columns :refresh="refresh_" @loading="value=>loading=value"/>
      </template>
    </table-frame>
    <new-product v-model="showDialog"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { listProducts } from "@/api/server";
import NewProduct from "./newproduct";
import {TableFrame} from "@/components/UI"
import Columns from "./columns"

export default {
  components: { Columns, NewProduct, TableFrame },
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      datalist: null,
      loading: true,
      showDialog: false,
      queryParams: {
        name: "",
        dateRanges: [],
      },
    };
  },
  watch: {
    showDialog() {
      this.$nextTick(() => this.refresh_());
    }
  },
  methods: {
    resetQuery() {
      this.queryParams = {name: "", dateRanges: [],}
    },
    newProduct() {
      this.showDialog = true;
    },
    refresh_() {
      this.loading = true
      if (this.queryParams.name) {
        this.queryParams.name = this.queryParams.name.replace(/\s+/g, "");
      }
      listProducts({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        name: this.queryParams.name,
        startTime: this.queryParams.dateRanges && this.queryParams.dateRanges[0],
        endTime: this.queryParams.dateRanges && this.queryParams.dateRanges[1],
      }).then(result => {
        this.total = result.total;
        this.datalist = result.products;
        this.loading = false;
      });
    },

  },
  computed:{
    refresh(){this.refresh_()}
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

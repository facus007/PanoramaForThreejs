<template>
  <container :refresh="refresh" v-loading="loading">
    <table-frame
      :total="total"
      :page-size="pageSize"
      :currentPage.sync="currentPage"
      :items="datalist"
      :loading="false"
    >
      <template v-slot:header="scope">
        <el-button type="primary" size="small" @click="newtemp">新增模板</el-button>
      </template>
      <template v-slot:columns="scope">
        <el-table-column label="模板组" class="ccc" style="text-align: center;">
          <template v-slot:default="scope" style="text-align: center;">{{scope.row.tmp_group_id}}</template>
        </el-table-column>
        <el-table-column label="模板预览图" class="ccc" style="text-align: center;">
          <template v-slot:default="scope" style="text-align: center;">
            <div style="width:200px;height:150px;margin:0 auto;">
              <img
                style="width: auto;height: auto;max-width: 100%;max-height: 100%"
                :src="scope.row.tmp_details[0].pano_graphic_url4"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" class="ccc" style="text-align: center;">
          <template v-slot:default="scope" style="text-align: center;">{{scope.row.create_time}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-button
              style="padding:0;margin:0 20px; width:min-content;"
              type="text"
              @click="endittemp(scope.row)"
            >编辑</el-button>
            <el-button
              style="padding:0;margin:0 auto; width:min-content;color:#F56C6C;"
              type="text"
              @click="deltemp(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </template>
    </table-frame>
  </container>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { listProducts } from "@/api/server";
import { getProduct, saveVR } from "@/utils/server";
import mixin from "@/views/mixin";
import { listTmps, deleteTmpUpload } from "@/api/server";
export default {
  mixins: [mixin],
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      datalist: null,
      loading: true,
      showDialog: false,
      rawData: []
    };
  },
  watch: {
    showDialog() {
      this.$nextTick(() => this.refresh_());
    }
  },
  methods: {
    selectionChange(val) {},
    newtemp() {
      this.$router.push({
        path: "/templates/add",
        query: {
          tmp_group_id:
            Number(this.datalist[this.datalist.length - 1].tmp_group_id) + 1
        }
      });
      // this.showDialog = true
    },
    addtemp() {
      this.$router.push({ path: "/templates/add" });
    },
    endittemp(row) {
      //编辑
      this.$router.push({
        path: "/templates/add",
        query: { tmpGroupId: row.tmp_group_id }
      });
    },
    preview(row) {
      this.$router.push({
        path: "/preview",
        query: { product_id: row.product_id }
      });
    },
    link(row) {
      var input = document.createElement("input");
      document.body.appendChild(input);
      input.value = location.href.replace(
        this.$route.path,
        "/share?product_id=" + row.product_id
      );
      input.focus();
      input.select();
      var result = document.execCommand("copy");
      input.remove();
      if (result === "unsuccessful") {
        this.$message.error("复制至剪贴板失败");
      } else {
        this.$message("已复制至剪贴板");
      }
    },
    refresh_() {
      this.loading = true;
      // listProducts({
      //   pageNum: this.currentPage,
      //   pageSize: this.pageSize,
      // }).then(result=>{
      //   this.total = result.total
      //   this.datalist = result.products
      //   this.loading = false
      // })
      listTmps({
        type: "1"
        // pageNum: this.currentPage,
        // pageSize: this.pageSize
      }).then(result => {
        // console.log(result, "ress");
        // this.rawData = this.rawData.concat(result.tmps)
        this.datalist = result.tmps;
        // this.total = result.total
        this.loading = false;
        // this.total === 1 && this.$emit('input', this.rawData[0]) && (this.tmp_group_id=this.rawData[0].tmp_group_id)
      });
    },
    deltemp(row) {
      // console.log(row, "row");
      this.$confirm("删除此模板组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // console.log("确定");
        deleteTmpUpload({ tmpGroupId: row.tmp_group_id }).then(res => {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.refresh_();
        });
      });
    }
  },
  computed: {
    refresh() {
      this.refresh_();
    }
  },
  mounted() {}
};
</script>
<style>
tr .cell,
tr .cell {
  text-align: center !important;
}
</style>

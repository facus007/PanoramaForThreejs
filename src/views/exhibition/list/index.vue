<template>
  <container :refresh="refresh" v-loading="loading">
    <table-frame
      class="table"
      :total="total"
      :page-size="pageSize"
      :currentPage.sync="currentPage"
      :items="datalist"
      :loading="false"
    >
      <template v-slot:header="scope">
        <el-button type="primary" size="small" @click="newProduct">新建作品</el-button>
        <div style="margin-top:20px;margin-left:30px;">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
            <el-form-item label="作品名称:" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入作品名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="作品创建时间" prop="dateRanges">
              <el-date-picker
                v-model="dateRanges"
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-left:30px;">
              <el-button type="success" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button type="warning" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template v-slot:columns="scope">
        <el-table-column label="作品封面">
          <template v-slot:default="scope">
            <img
              :src="scope.row.cover"
              width="100px"
              height="50px"
              style="margin:5px 5px; display:flex;border-radius: 5px; box-shadow: 0 0 4px 0 gray; object-fit: contain;"
            >
          </template>
        </el-table-column>
        <el-table-column label="作品名称">
          <template v-slot:default="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="作品ID">
          <template v-slot:default="scope">{{scope.row.product_id}}</template>
        </el-table-column>
        <el-table-column label="发布状态">
          <template v-slot:default="scope">
            <span
              :style="{'color': scope.row.published==='0' ? 'red' : 'green' }"
            >{{scope.row.published==='0'?"未发布":"发布"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template v-slot:default="scope">{{scope.row.create_time}}</template>
        </el-table-column>
        <el-table-column label="修改日期">
          <template v-slot:default="scope">{{scope.row.update_time}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <div
              style="display: grid; grid-auto-flow: row; grid-template-columns: 1fr 1fr; grid-gap: 5px; align-items: center;"
            >
              <el-button
                style="padding:0;margin:0; width:min-content;"
                type="text"
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button
                style="padding:0;margin:0; width:min-content;"
                type="text"
                @click="del(scope.row)"
              >删除</el-button>
              <el-button
                style="padding:0;margin:0; width:min-content;"
                type="text"
                @click="preview(scope.row)"
              >预览</el-button>
              <el-button
                style="padding:0;margin:0; width:min-content;"
                type="text"
                @click="link(scope.row)"
              >复制链接</el-button>
              <el-button
                style="padding:0;margin:0; width:min-content;"
                type="text"
                @click="copy(scope.row)"
              >复制作品</el-button>
              <el-button
                style="padding:0;margin:0; width:min-content;"
                type="text"
                @click="download(scope.row)"
              >下载配置</el-button>
              <el-popover placement="left" trigger="click">
                <div style="text-align:center;">
                  <canvas :id="'qrcodeContent'+scope.$index" style="width: 100%; height: 150px"/>
                  <el-button
                    slot="reference"
                    style="padding:5px;margin:auto; width:min-content;position: absolute;bottom: 3px;left: 30%;"
                    type="text"
                    @click="downloadqrcode(scope.$index)"
                  >下载二维码</el-button>
                  <a style="display:none;" href="" :download="scope.row.name" id="download"></a>
                </div>
                <el-button
                  slot="reference"
                  style="padding:0;margin:auto; width:min-content;"
                  @click="qrcode(scope.row, scope)"
                  type="text"
                >显示二维码</el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </template>
    </table-frame>
    <new-product v-model="showDialog"/>
  </container>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { listProducts, delProduct } from "@/api/server";
import { getProduct, saveVR } from "@/utils/server";
import NewProduct from "./newproduct";
import mixin from "@/views/mixin";
import QRCode from "qrcode";

export default {
  mixins: [mixin],
  components: { NewProduct },
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      datalist: null,
      loading: true,
      showDialog: false,
      queryParams: {
        name: ""
      },
      dateRanges: [],
      qrcodelink: ""
    };
  },
  watch: {
    showDialog() {
      this.$nextTick(() => this.refresh_());
    }
  },
  methods: {
    selectionChange(val) {},
    handleQuery() {
      if (this.dateRanges != null) {
        this.queryParams.startTime = this.dateRanges[0];
        this.queryParams.endTime = this.dateRanges[1];
      } else {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      this.refresh_();
    },
    resetQuery() {
      this.dateRanges = [];
      this.queryParams.startTime = null;
      this.queryParams.endTime = null;
      this.resetForm("queryForm");
      this.refresh_();
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    newProduct() {
      this.showDialog = true;
    },
    edit(row) {
      this.$router.push({
        path: "/exhibition/editor",
        query: { product_id: row.product_id }
      });
    },
    preview(row) {
      this.$router.push({
        path: "/exhibition/preview",
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
    qrcode(row, scope) {
      var link = location.href.replace(
        this.$route.path,
        "/share?product_id=" + row.product_id
      );
      this.qrcodelink = link;
      QRCode.toCanvas(
        document.getElementById("qrcodeContent" + scope.$index),
        link
      );
    },
    downloadqrcode(index) {
      let canvas = document.getElementById("qrcodeContent" + index);
      let dataURL = canvas.toDataURL("image/png");
      let a = document.getElementById("download");
      a.setAttribute("href", dataURL);
      // console.log(dataURL, "dataURL");
      document.getElementById("download").click();
    },
    refresh_() {
      this.loading = true;
      if (this.queryParams.name) {
        this.queryParams.name = this.queryParams.name.replace(/\s+/g, "");
      }
      listProducts({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.queryParams
      }).then(result => {
        this.total = result.total;
        this.datalist = result.products;
        this.loading = false;
      });
    },
    async copy(row) {
      this.loading = true;
      let result = await getProduct(row.product_id);
      result.product_id = undefined;
      result.name += "-复制";
      await saveVR(result);
      this.refresh_();
      this.loading = false;
    },
    async download(row) {
      this.loading = true;
      let result = await getProduct(row.product_id);
      var urlObject = window.URL || window.webkitURL || window;
      var a = document.createElement("a");
      a.href = urlObject.createObjectURL(new Blob([JSON.stringify(result)]));
      a.download = "data.json";
      a.click();
      this.loading = false;
    },
    del(row) {
      this.$confirm(
        "一旦点击删除，作品将无法恢复，您确定是否继续操作？",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        try {
          this.loading = true;
          await delProduct({ productId: row.product_id });
          this.refresh_();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } catch (e) {
        } finally {
          this.loading = false;
        }
      });
    }
  },
  computed: {
    refresh() {
      this.refresh_();
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
      <el-form-item label="展商标题:" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入展商标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="参展商名称:" prop="exhibitorId">
        <el-select
          v-model="queryParams.exhibitorId"
          placeholder="请选择参展商名称:"
          clearable
          filterable
          :style="{width: '100%'}"
        >
          <el-option
            v-for="(item, index) in QexhibitorList"
            :key="index"
            :label="item.exhibitorName"
            :value="item.exhibitorId"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展商创建时间" prop="dateRanges">
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
    <!-- <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
            </el-col>
    </el-row>-->
    <!-- <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="toggleSelection([postList[0], postList[2]])"
    >切换第二、第三行的选中状态</el-button>-->
    <el-table
      v-loading="loading"
      :data="postList"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="isDisabled" disabled="true"></el-table-column>
      <el-table-column label="缩略图" align="center" width="200">
        <template slot-scope="scope">
          <div
            class="thumbnail"
            style="text-align:center; width:50px;height:60px;"
            v-if="scope.row.thumbUrl1"
          >
            <img :src="scope.row.thumbUrl1" style="margin-left:-20px;" alt="缩略图">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="参展商编号" align="center" prop="exhibitorId" width="100"/>
      <el-table-column label="参展商名称" align="center" prop="exhibitorName" width="150"/>
      <el-table-column label="展品" align="center" prop="productName" min-width="150"/>
      <el-table-column label="3D展品链接" align="center" min-width="400">
        <template slot-scope="scope">
          <div style="text-align:left;">{{scope.row.resourceUrl}}</div>
          <div
            v-if="scope.row.resourceUrl"
            style="margin:0 10px;color:#409EFF;cursor:pointer;"
            size="mini"
            @click="CopyUrl1(scope.row.resourceUrl,'')"
          >复制链接</div>
        </template>
      </el-table-column>
      <el-table-column label="平面展品链接" align="center" width="400">
        <template slot-scope="scope">
          <div style="text-align:left;">{{websourcesUrl}}{{scope.row.id}}</div>
          <div
            style="margin:0 10px;color:#409EFF;cursor:pointer;"
            size="mini"
            @click="CopyUrl1(websourcesUrl,scope.row.id)"
          >复制链接</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
                label="操作"
                align="center"
                class-name="small-padding fixed-width"
                width="200"
            >
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        plain
                    >修改</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-tickets"
                        @click="showHalldetail(scope.row)"
                        plain
                    >详情</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-close"
                        @click="handleDelete(scope.row)"
                    >删除</el-button>
                </template>
      </el-table-column>-->
    </el-table>
    <!--    <el-pagination
      v-show="total>0"
      :total="total"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      @pagination="getList"
    />-->
    <div style="float:right;margin:20px;">
      <el-button type="primary" size="mini" @click="toggleSelectionData">确定</el-button>
    </div>
    <div style="margin:20px;float:right;">
      <el-pagination
        @current-change="getList"
        :current-page.sync="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        layout="total, prev, pager, next"
        :total="total"
        :disabled="disable"
      ></el-pagination>
    </div>
    <div style="margin:10px 30px;">
      <div
        style="position: fixed; bottom: 20px; left: 20px; background:#1118;color:white;padding: 10px;z-index:10; border-radius: 5px;"
      >当前已选{{sCount}}件，可选{{max_hotspot_num}}件</div>
      <!-- <div style="float:left;">
        <p>
          可选
          <span>{{max_hotspot_num}}</span>条
          已选
          <span>{{sCount}}</span>条
        </p>
      </div>-->
    </div>
    <!-- 超出可选范围弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="overshow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="20%"
      append-to-body
    >
      <div style="text-align:center;">当前已选{{sCount}}件，可选{{max_hotspot_num}}件</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refreshdata">重新选择</el-button>
        <el-button type="primary" @click="toggleSelectionData">直接提交</el-button>
      </span>
    </el-dialog>
    <!-- 超出可选范围弹窗 end-->
  </div>
</template>
<script>
import { listExhibitor } from "./exhibitor";
import {
  boxlist,
  boxaddChooseBox,
  listChooseHotspots
} from "./externalLinks/index";
import { mapState } from "vuex";
export default {
  name: "exhibitionbox",
  inheritAttrs: false,
  props: ["max_hotspot_num"],
  data() {
    return {
      currentUrl: window.location.protocol + "//" + window.location.host, //当前域名 就快来点击了解了解
      QexhibitorList: [], //参展商列表  查询
      exhibitorList: [], //参展商列表
      //是否修改
      isEdit: false,
      //全角度参数
      resourceParams: { oldPath: null },
      //视频参数
      videoParams: { oldPath: null, oldPreviewurl: null },
      //音频参数
      audioParams: { oldPath: null },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      idList: [],
      sCount: 0, //已选中数量
      num: 0,
      tempnum: 0,
      // 选中下标
      indexs: [],
      // 当前页码
      currentPage: 1,
      // 当前页选中数据
      pageSlectData: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 表格数据
      postList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      formData: {
        exhibitorId: undefined,
        productName: undefined,
        productDescription: null,
        thumbUrl1: null,
        resourceUrl: null,
        videoUrl: null,
        audioUrl: null,
        mainUrl: null
      },
      dateRanges: [],
      videoFlag: true,
      videoUploadPercent: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        endTime: null,
        exhibitorId: null,
        productName: null,
        exhibitorId: null,
        beginTime: null
      },
      templateSelection: {},
      templateRadio: false,
      showdetail: false,
      detailData: {}, //详情
      //上传
      dialogImageUrl: "",
      dialogVisible: false,
      picList: [], //图片列表
      Viewworks: false, //查看作品
      id: null,
      websourcesUrl: "",
      overshow: false,
      disable: false //是否禁用
    };
  },
  created() {
    if (this.$route.query.exhibitorId && this.$route.query.exhibitorId != "") {
      this.queryParams.exhibitorId = this.$route.query.exhibitorId;
      // this.$route.query.publishStatus ? this.listQuery.publishStatus = parseInt(publishStatus) : "";
    }
    this.getList();
    this.getlistExhibitor(1);
    // this.getlistExhibitor();
    this.currentUrl = process.env.VUE_APP_WEBSOURCE_API;
    this.websourcesUrl =
      process.env.VUE_APP_WEBSOURCE_API + "/xiangqing/index.html?id=";
  },
  methods: {
    onClose() {
      //   this.$refs["elForm"].resetFields();
      this.$emit("open:visible", false);
    },
    /** 查询展商列表 */
    getList(over) {
      this.loading = true;
      if (this.dateRanges != null) {
        this.queryParams.beginTime = this.dateRanges[0];
        this.queryParams.endTime = this.dateRanges[1];
      } else {
        this.queryParams.beginTime = undefined;
        this.queryParams.endTime = undefined;
      }
      boxlist(this.queryParams).then(response => {
        this.postList = response.rows;
        this.total = response.total;
        this.loading = false;
        if (this.indexs.length > 0) {
          this.pageData(this.currentPage);
        }
        this.getPageSelectData(this.queryParams.pageNum);
      });
    },
    //获取参展商列表
    getlistExhibitor(status) {
      listExhibitor().then(response => {
        let item = response.rows.map((item, index) => {
          return {
            ...item,
            exhibitorId: item.userId
          };
        });
        if (status) {
          //搜索
          this.QexhibitorList = item;
        } else {
          //新增
          this.exhibitorList = item;
        }
      });
    },
    pageData(page) {
      /**页码选择数据记录 */
      console.log(this.pageSlectData, "this.pageSlectData");
      for (let i = 0; i < this.pageSlectData.length; i++) {
        if (page == this.pageSlectData[i].page) {
          this.pageSlectData.splice(i, 1);
        }
        // num += this.pageSlectData[i].ids.length;
      }
      this.pageSlectData.push({
        page: page,
        indexs: this.indexs,
        ids: this.ids
      });
      // this.pageSlectData = Array.from(new Set(this.pageSlectData));
    },
    getPageSelectData(page) {
      // 当前页数是否有选择过数据  有就反选
      this.num = 0; //一共已选多少条
      // this.sCount=this.sCount;
      for (let i = 0; i < this.pageSlectData.length; i++) {
        if (page == this.pageSlectData[i].page) {
          // console.log(
          //   this.pageSlectData[i].indexs,
          //   "this.pageSlectData[i].indexs"
          // );
          for (let j = 0; j < this.pageSlectData[i].indexs.length; j++) {
            this.toggleSelection1([
              this.postList[this.pageSlectData[i].indexs[j]]
            ]);
          }
        } else {
          this.num += this.pageSlectData[i].ids.length;
        }
      }
      // console.log(this.num, "num*****");
      this.sCount = this.num;
      this.tempnum = 0;
      // console.log(this.pageSlectData, "页码数据");
    },
    // 表单重置
    reset() {
      this.formData = {
        exhibitorId: undefined,
        productName: undefined,
        productDescription: null,
        thumbUrl1: null,
        resourceUrl: null,
        videoUrl: null,
        audioUrl: null,
        mainUrl: null
      };
      this.videoFlag = true;
      this.field103fileList = [];
      this.dbgcimgList = [];
      this.field104fileList = [];
      this.mediaList = [];
      this.audioList = [];
      this.resetForm("elForm");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRanges = [];
      this.queryParams.endTime = null;
      this.resetForm("queryForm");
      this.handleQuery();
    },
    getTemplateRow(index, row) {
      //获取选中数据
      // console.log(row, "选中的数据");
      this.templateSelection = row;
    },
    isDisabled(row, index) {
      //禁用多选框
      // console.log(row, "禁用");
      // return false;
      if (row.disable == true) {
        return false;
      } else {
        return true;
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.indexs = selection.map((item, index) => {
        return this.contains(this.postList, item);
      });
      // console.log(this.indexs, "indexs");
      this.num = this.num - this.tempnum;
      this.num += selection.length;
      this.tempnum = selection.length;
      this.sCount = this.num;
      this.currentPage = this.queryParams.pageNum;
      if (this.sCount > this.max_hotspot_num) {
        // this.$message.error("只能选择" + this.max_hotspot_num + "条！**");
        this.ids.length = this.ids.length - 1;
        this.indexs.length = this.indexs.length - 1;
        this.sCount = Number(this.max_hotspot_num);
        // this.overshow = true;//弹窗
        // this.pageData(this.currentPage, 1);
        // this.postList = this.postList.map(item => {
        //   return {
        //     ...item,
        //     disable: true
        //   };
        // });
        for (let i = 0; i < this.postList.length; i++) {
          for (let j = 0; j < this.indexs.length; j++) {
            if (i != this.indexs[j]) {
              this.postList[i].disable = true;
            }
          }
        }
        this.disable = true;
        // console.log(this.postList, "000---达到禁用条件了");
        return;
      } else if (this.sCount == this.max_hotspot_num) {
        for (let i = 0; i < this.postList.length; i++) {
          for (let j = 0; j < this.indexs.length; j++) {
            if (i != this.indexs[j]) {
              this.postList[i].disable = true;
            }
          }
        }
        this.disable = true;
      }
    },
    // 获取数组下标
    contains(arrays, item) {
      var i = arrays.length;
      while (i--) {
        if (arrays[i] === item) {
          return i;
        }
      }
      return false;
    },
    //复制功能
    CopyUrl() {
      let Url2 = document.getElementsByClassName("el-link")[0].attributes[
        "href"
      ].value;
      let oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      // oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    CopyUrl1(url, id) {
      //复制
      // let Url2 = document.getElementsByClassName("el-link")[0].attributes["href"].value;
      let oInput = document.createElement("input");
      oInput.value = url + id;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      // oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    toggleSelection1(rows) {
      //反选操作
      let arr = [];
      this.postList.forEach((e, index) => {
        rows.forEach((i, ind) => {
          if (e.id === i.id) {
            arr.push(this.postList[index]);
          }
        });
      });
      if (arr) {
        this.$nextTick(() => {
          arr.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    toggleSelectionData() {
      // 确定
      this.pageData(this.currentPage);
      let ids = [];
      console.log(this.pageSlectData, "提交的页码数据");
      for (let i = 0; i < this.pageSlectData.length; i++) {
        for (let j = 0; j < this.pageSlectData[i].ids.length; j++) {
          // console.log(this.pageSlectData[i].ids[j], "********");
          ids.push(this.pageSlectData[i].ids[j]);
        }
      }
      // this.idList = Array.from(new Set(this.idList.concat(this.ids)));
      let localStorage = window.localStorage;
      localStorage.removeItem("batchNo");
      // let ids = Array.from(new Set(this.idList));
      // console.log("toggleSelectionData==--=", ids);
      if (ids.length > 0) {
        boxaddChooseBox(ids).then(res => {
          if (res.code == 200) {
            localStorage.setItem("batchNo", res.data.batchNo);
            this.$emit("exhibitionFinished", res.data.batchNo);
          }
        });
      } else {
        this.$emit("exhibitionFinished", "");
      }
    },
    refreshdata() {
      this.loading = true;
      boxlist(this.queryParams).then(response => {
        this.postList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      this.$refs.multipleTable.clearSelection();
      this.overshow = false;
      // console.log(this.sCount, "sCount****");
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    }
  },
  computed: {
    ...mapState("editor", ["product"])
  }
};
</script>
<style scoped>
.el-upload__tip {
  line-height: 1.2;
}
.viewdetail {
  color: #1890ff;
  cursor: pointer;
  margin: 0 8px;
}
.imgcontent {
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center; /*主轴居中*/
  align-items: center;
}
.boximg {
  flex: 1;
  height: auto;
}
.boxtitle {
  flex: 3;
  text-align: left;
  margin-left: 10px;
  line-height: 30px;
}
.boximg img {
  width: 100%;
  height: auto;
}
.edit_container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ql-editor {
  height: 600px !important;
}
.pic-list {
}
.pic-list img {
  display: inline-block;
  width: 120px;
  max-width: 100%;
  margin: 5px;
}
video {
  width: 200px;
  max-height: 100%;
}

.thumbnail {
  width: 100px;
  height: 60px;
  margin: 0 auto;
  /* text-align: center; */
}
.thumbnail img {
  width: 100px;
  height: auto;
}
.el-button--text,
.el-button--text:hover {
  border: 1px solid transparent !important;
  background: none !important;
}
.iframe {
  width: 50%;
  height: 100px;
}
</style>

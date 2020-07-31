<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="110px">
            <!-- <el-form-item label="展会名称:" prop="fairId">
                <el-select
                    v-model="queryParams.fairId"
                    placeholder="请选择展会名称:"
                    clearable
                    filterable
                    :style="{width: '100%'}"
                >
                    <el-option
                        v-for="(item, index) in QfairList"
                        :key="index"
                        :label="item.fairName"
                        :value="item.id"
                        :disabled="item.disabled"
                    ></el-option>
                </el-select>
            </el-form-item>-->
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
            <el-form-item label="素材类型" prop="materialType">
                <el-select
                    v-model="queryParams.materialType"
                    placeholder="请选择素材类型"
                    clearable
                    size="small"
                >
                    <el-option
                        v-for="dict in typeOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="显示顺序" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          placeholder="请输入显示顺序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <div style="margin:0 30px;">
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                        v-hasPermi="['fair:material:add']"
                    >新增</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
            v-loading="loading"
            :data="materialList"
            @selection-change="handleSelectionChange"
        >
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="素材编号" align="center" prop="id"/>
            <!-- <el-table-column label="展会编号" align="center" prop="fairId"/>
            <el-table-column label="展会名称" align="center" prop="fairName"/>-->
            <el-table-column label="参展商名称" align="center" prop="exhibitorName"/>
            <el-table-column
                label="素材类型"
                align="center"
                prop="materialType"
                :formatter="typeFormat"
            />
            <el-table-column label="素材内容" align="center" prop="materialContent"/>
            <el-table-column label="显示顺序" align="center" prop="orderNum"/>
            <el-table-column label="说明信息" align="center" prop="remark"/>
            <el-table-column
                label="操作"
                align="center"
                width="130"
                class-name="small-padding fixed-width"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['fair:material:edit']"
                    >修改</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['fair:material:remove']"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
        <!-- 添加或修改素材对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <!-- <el-form-item label="展会名称:" prop="fairId">
                    <el-select
                        v-model="form.fairId"
                        placeholder="请选择展会名称:"
                        clearable
                        filterable
                        @change="fairChange"
                        :style="{width: '100%'}"
                    >
                        <el-option
                            v-for="(item, index) in QfairList"
                            :key="index"
                            :label="item.fairName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参展商名称:" prop="exhibitorId">
                    <el-select
                        v-model="form.exhibitorId"
                        placeholder="请选择参展商"
                        clearable
                        filterable
                        :style="{width: '100%'}"
                    >
                        <el-option
                            v-for="(item, index) in exhibitorList"
                            :key="index"
                            :label="item.exhibitorName"
                            :value="item.exhibitorId"
                            :disabled="item.disabled"
                        ></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="素材类型">
                    <el-select v-model="form.materialType" placeholder="请选择素材类型">
                        <el-option
                            v-for="dict in typeOptions"
                            :key="dict.dictValue"
                            :label="dict.dictLabel"
                            :value="dict.dictValue"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="素材内容:" prop="materialContent">
                    <el-input v-model="form.materialContent" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
                <!-- <el-form-item label="全景图:" prop="resourceUrl">
          <el-upload
            ref="resourceUrl"
            :file-list="field104fileList"
            :action="fileUpload"
            :before-upload="field104BeforeUpload"
            :on-success="resourceUrlUpload"
            :on-exceed="overresourcenum"
            :on-remove="resourceremove"
            :limit='1'
                >-->
                <!--  :http-request="fileUploadreq" -->
                <!-- <div slot="tip" class="el-upload__tip">只能上传zip/rar文件，且不超过300M</div>
            <el-button size="small">上传</el-button>
          </el-upload>
                </el-form-item>-->
                <el-form-item label="素材:">
                    <el-upload
                        ref="thumbUrl1"
                        :file-list="field103fileList"
                        :action="imageUpload"
                        multiple
                        :class="{'disabled': uploadDisabled}"
                        :before-upload="field103BeforeUpload"
                        :with-credentials="true"
                        :on-remove="picremove"
                        :on-preview="handlePictureCardPreview"
                        :on-success="thumbUrlUpload"
                        :on-exceed="overpicnum"
                        list-type="picture-card"
                        :limit="1"
                        accept="image/*"
                    >
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">请上传jpg/png格式，尺寸为1：1比例，大小不超过15M</div>
                    </el-upload>
                    <!-- :http-request="myUpload" -->
                </el-form-item>
                <el-form-item label="资源描述:" prop="remark">
                    <el-input v-model="form.remark" placeholder="请输入资源描述"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" style="z-index='100">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import {
  listMaterial,
  getMaterial,
  delMaterial,
  addVrMaterial,
  updateMaterial,
  dictType,
  listFair,
  listExhibitor
} from "@/api/server";

// import {
//   listProduct,
//   getProduct,
//   delProduct,
//   addProduct,
//   updateProduct,
//   exportProduct,
//   imageUpload,
//   removeBg
// } from "@/api/fair/product/product";
// import { envUrl, imgUploadUrl, fileUploadUrl, mediaUpload } from "@/api/upload";
// import { listFair } from "@/api/fair/fair/fair";
// import { getStatus } from "@/utils/index";
// import { listExhibitor } from "@/api/fair/exhibitor/exhibitor";
export default {
  name: "material",
  data() {
    return {
      uploadDisabled: false, //隐藏图片添加图标
      QexhibitorList: [], //参展商列表  查询
      exhibitorList: [], //参展商列表 新增
      defaultExhibitorList: [], //默认参展商列表
      QfairList: [], //展会列表 查询
      fairList: [], //展会列表
      field104fileList: [],
      field101Options: [
        {
          label: "选项一",
          value: 1
        },
        {
          label: "选项二",
          value: 2
        }
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 素材表格数据
      materialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fairId: undefined,
        exhibitorId: undefined,
        materialType: undefined,
        materialContent: undefined,
        orderNum: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 图片上传路径
      imageUpload: process.env.VUE_APP_COS_API + "/imageUpload",
      field103fileList: [],
      dbgcimgList: [],
      //上传
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    this.getList();
    this.getlistFair();
    this.getlistExhibitor(1);
    this.getlistExhibitor();
    this.getDicts();
  },
  methods: {
    getlistFair() {
      //获取展会列表
      listFair().then(response => {
        let arrs = [];
        response.rows.forEach(item => {
          if (item.status != 1) {
            arrs.push(item);
          }
        });
        this.QfairList = arrs;
      });
    },
    getDicts() {
      dictType("vr_material_type").then(response => {
        this.typeOptions = response.data;
      });
    },
    field104BeforeUpload(file) {
      //判断大小
      let isRightSize = file.size / 1024 / 1024 < 300;
      if (!isRightSize) {
        this.$message.error("文件大小超过 300MB");
      }
      return isRightSize;
    },
    resourceUrlUpload(response, file, fileList) {
      //资源包上传成功
      // console.log(response,'1');
      if (response.code == 1) {
        this.msgSuccess(response.msg);
        this.formData.resourceUrl = response.url;
      }
    },
    overresourcenum() {
      //资源包数量限制
      this.msgWarning("最多上传1个文件！");
    },
    resourceremove(file, fileList) {
      //删除资源包
      this.formData.resourceUrl = null;
    },

    /** 查询素材列表 */
    getList() {
      this.loading = true;
      listMaterial(this.queryParams).then(response => {
        this.materialList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 字典翻译
    typeFormat(row, column) {
      //   console.log(this.typeOptions, "this.typeOptions");
      for (let i = 0; i < this.typeOptions.length; i++) {
        if ((row.materialType = this.typeOptions[i].dictValue)) {
          return this.typeOptions[i].dictLabel;
        }
      }
      //   return this.selectDictLabel(this.typeOptions, row.materialType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        fairId: undefined,
        exhibitorId: undefined,
        materialType: undefined,
        materialContent: undefined,
        orderNum: undefined,
        remark: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.field103fileList = [];
      this.dbgcimgList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.uploadDisabled = false;
      this.open = true;
      this.title = "添加素材";
      // if(this.exhibitorList.length==0){
      //     this.getlistExhibitor();
      // }
      this.form.remark = "";
      this.form.materialContent = "";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      this.uploadDisabled = true;
      getMaterial(id).then(response => {
        this.form = response.data;
        let obj = { url: response.data.resourceUrl };
        this.field103fileList.push(obj);
        this.open = true;
        this.title = "修改素材";
        this.uploadDisabled = true;
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateMaterial(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.open = false;
                this.getList();
              } else {
                this.$message.error(response.msg);
              }
            });
          } else {
            addVrMaterial(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.open = false;
                this.getList();
                this.form.remark = "";
              } else {
                this.$message.error(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除素材编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delMaterial(ids);
        })
        .then(() => {
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      //   const queryParams = this.queryParams;
      //   this.$confirm("是否确认导出所有素材数据项?", "警告", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(function() {
      //       return exportMaterial(queryParams);
      //     })
      //     .then(response => {
      //       this.download(response.msg);
      //     })
      //     .catch(function() {});
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
          this.defaultExhibitorList = item;
        }
      });
    },

    /** 图片上传 */
    picremove(file, fileList) {
      // 删除图片
      this.formData = {
        ...this.formData,
        thumbUrl1: null,
        thumbUrl2: null,
        thumbUrl3: null,
        thumbUrl4: null,
        thumbUrl5: null
      };
      for (let i = 0; i < fileList.length; i++) {
        //动态添加图片属性
        this.formData["thumbUrl" + (i + 1)] = fileList[i].response.url;
      }
      this.uploadDisabled = false;
    },
    //图片上传成功
    thumbUrlUpload(response, file, fileList) {
      //   console.log(file, "0000 remark");
      if (response.code == "1") {
        this.$message(response.msg);
        this.form.resourceUrl = response.url;
        this.uploadDisabled = true;
        this.form.remark = file.name;
      } else {
        this.$message.error(response.msg);
        this.field103fileList = [];
        this.uploadDisabled = false;
      }
    },
    //图片数量限制
    overpicnum(files, fileList) {
      this.$message.error("最多上传1张图片！");
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    field103BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 15;
      if (!isRightSize) {
        this.$message.error("文件大小超过 15MB");
      }
      return isRightSize;
    },
    /**图片去背景 */
    picoverNum() {
      this.$message.error("最多上传1张图片！");
    },
    bgcpicremove(file, fileList) {
      // 删除图片
      console.log(file, fileList, "fileList");
      // this.formData={
      this.formData.mainUrl = null;
      // };
    },
    //图片上传成功
    bgcpicUpload(response, file, fileList) {
      // console.log(response,this.dbgcimgList,'上传成功!');
      if (response.code == "1") {
        removeBg({ imgUrl: response.url }).then(res => {
          // console.log(res,'转化');
          if (res.code == 200) {
            this.dbgcimgList.push(res);
            this.$message(res.msg);
            this.formData = {
              ...this.formData,
              mainUrl: res.url
            };
          }
        });
      } else {
        this.$message.error(response.msg);
        this.dbgcimgList = [];
      }
    },
    //根据展会名称筛选参展商名称
    fairChange(val) {
      console.log(val, 10);
      console.log(this.defaultExhibitorList, 11);
      if (val) {
        this.form.exhibitorId = null;
        this.QfairList.forEach(item => {
          if (item.id == val) {
            let fairIds = item.id;
            // console.log(this.exhibitorUserId,230);
            this.exhibitorList = [];
            this.defaultExhibitorList.forEach(item => {
              if (item.fairId == fairIds) {
                this.exhibitorList.push(item);
              }
            });
            console.log(this.exhibitorList, 102);
          }
        });
      }
    },
    resetForm(form) {
      this.$nextTick(() => {
        this.$refs[form].resetFields();
      });
    }
  }
};
</script>

<style scoped>
.disabled >>> .el-upload--picture-card {
  display: none !important;
}
</style>

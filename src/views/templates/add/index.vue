<template>
  <div>
    <div class="addbtn">
      <el-button icon="el-icon-plus" type="primary" @click="addtemp">新增模板</el-button>
    </div>
    <!-- 弹框 -->
    <el-dialog title="新增模板" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
      <el-form
        :model="tempForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="全景图" prop="fileList">
          <el-upload
            ref="thumbUrl1"
            :file-list="fileList"
            :action="imageUpload"
            multiple
            :before-upload="BeforeUpload"
            :with-credentials="true"
            :on-remove="picremove"
            :on-preview="handlePictureCardPreview"
            :on-success="UploadSucccess"
            :on-exceed="overpicnum"
            list-type="picture-card"
            :limit="6"
            :class="{'disableds': iconShow}"
            accept="image/*"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">6面体全景图顺序右后左前上下</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="模糊图" prop="mfileList">
          <el-upload
            ref="mohu"
            :file-list="mfileList"
            :action="imageUpload"
            multiple
            :before-upload="mBeforeUpload"
            :with-credentials="true"
            :on-remove="mpicremove"
            :on-preview="handlePictureCardPreview"
            :on-success="mUploadSucccess"
            :on-exceed="moverpicnum"
            list-type="picture-card"
            :limit="6"
            :class="{'disableds': iconShow}"
            accept="image/*"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">6面体模糊图顺序右后左前上下</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="模板文件" prop="jsonfileList">
          <el-upload
            ref="resource"
            :file-list="jsonfileList"
            :action="jsonUpload"
            :before-upload="jsonBeforeUpload"
            :on-success="jsonUploadSuccess"
            :on-exceed="overjson"
            :on-remove="jsonremove"
            :on-error="jsononError"
            :limit="1"
            accept=".json"
          >
            <div slot="tip" class="el-upload__tip">请上传json格式文件</div>
            <el-button size="small">上传</el-button>
            <span v-if="model=='endit'">template.json</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转下一场景索引" prop="nextTmpIndex" label-width="140px">
          <el-input v-model="tempForm.nextTmpIndex" style="width:200px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹框end -->
    <el-dialog :visible.sync="dialogImg" style="z-index='100">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="templist" v-if="templateList.length>0">
      <el-card class="box-card" v-for="(item,index) in templateList" :key="index">
        <div slot="header" class="clearfix">
          <span>场景{{index+1}}</span>
        </div>
        <div class="tempimgbox">
          <img :src="item.pano_graphic[0]" alt="模板全景图片">
        </div>
        <div style="margin-top:20px;">
          <div style="font-size:14px;" v-if="model=='endit'">索引编号：{{item.tmpIndex}}</div>
          <el-button type="text" @click="endittemp(index)">编辑</el-button>
        </div>
      </el-card>
      <div class="sumbtn">
        <el-button type="primary" @click="savetemp">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { saveTmpInfo, getTmpUploadInfo, updateTmpInfo } from "@/api/server";
export default {
  name: "addtemp",
  data() {
    return {
      model: "add",
      index: 0, //当前编辑
      tmpIndex: null, //当前编辑
      tmp_group_id: null,
      dialogVisible: false,
      fileList: [],
      dialogImg: false,
      iconShow: true,
      dialogImageUrl: "",
      imageUpload: process.env.VUE_APP_COS_API + "/imageUpload",
      mfileList: [],
      //   json
      jsonfileList: [],
      jsonUpload: process.env.VUE_APP_COS_API + "/dataJsonUpload",
      tempForm: {
        nextTmpIndex: ""
      },
      rules: {
        fileList: [
          { required: false, message: "请上传全景图", trigger: "blur" }
        ],
        mfileList: [
          { required: false, message: "请上传模糊图", trigger: "blur" }
        ],
        nextTmpIndex: [
          { required: false, message: "请输入场景索引", trigger: "blur" }
        ],
        jsonfileList: [
          {
            required: false,
            message: "请上传json文件",
            trigger: "change"
          }
        ]
      },
      panoramaList: [], //全景图列表
      vagueList: [], //模糊图列表
      jsonData: null, //json数据
      templateList: []
    };
  },
  created() {
    if (this.$route.query.tmpGroupId) {
      //编辑
      this.model = "endit";
      this.tmp_group_id = this.$route.query.tmpGroupId;
      getTmpUploadInfo({ tmpGroupId: this.$route.query.tmpGroupId }).then(
        res => {
          this.templateList = res.data.tmpInfo;
          // console.log(this.templateList, "编辑res");
        }
      );
    } else {
      this.model = "add";
      this.tmp_group_id = this.$route.query.tmp_group_id;
      // console.log(this.tmp_group_id, "this.tmp_group_id");
    }
  },
  methods: {
    addtemp() {
      if (this.$refs["ruleForm"] !== undefined) {
        this.resetForm("ruleForm");
      }
      this.dialogVisible = true;
    },
    //图片数量限制
    overpicnum(files, fileList) {
      this.$message.error("最多上传6张图片！");
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImg = true;
    },
    BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 15;
      if (!isRightSize) {
        this.$message.error("文件大小超过 10MB");
      }
      return isRightSize;
    },
    mBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 15;
      if (!isRightSize) {
        this.$message.error("文件大小超过 10MB");
      }
      return isRightSize;
    },
    picremove(file, fileList) {
      // 删除图片
      this.iconShow = false;
      // };
    },
    moverpicnum(file, fileList) {
      this.$message.error("最多上传6张图片！");
      this.iconShow = false;
    },
    mpicremove(file, fileList) {
      this.iconShow = true;
      // };
    },
    //图片上传成功
    UploadSucccess(response, file, fileList) {
      // console.log(response);
      // console.log(file);
      // console.log(fileList);
      this.iconShow = true;
      if (response.code == "1") {
        this.panoramaList = [];
        if (this.model == "endit") {
          for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].response) {
              fileList[i].url = fileList[i].response.url;
            }
            this.panoramaList.push(fileList[i].url);
          }
        } else {
          for (let i = 0; i < fileList.length; i++) {
            this.panoramaList.push(fileList[i].response.url);
          }
        }

        // console.log(this.panoramaList, "全景图this.panoramaList");
      } else {
        this.$message.error(response.msg);
      }
    },
    mUploadSucccess(response, file, fileList) {
      if (response.code == "1") {
        this.vagueList = [];
        if (this.model == "endit") {
          for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].response) {
              fileList[i].url = fileList[i].response.url;
            }
            this.vagueList.push(fileList[i].url);
          }
        } else {
          for (let i = 0; i < fileList.length; i++) {
            this.vagueList.push(fileList[i].response.url);
          }
        }

        // console.log(this.vagueList, "模糊图this.vagueList");
      } else {
        this.$message.error(response.msg);
      }
    },
    // json文件上传
    jsonBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 3;
      if (!isRightSize) {
        this.$message.error("文件大小超过 3MB");
      }
      return isRightSize;
    },
    jsonUploadSuccess(response, file, fileList) {
      this.jsonData = response.json;
      // console.log(response.json, "responseJSON");
    },
    overjson() {
      this.$message.error("最多上传1个文件！");
    },
    jsonremove() {},
    jsononError() {
      this.$message.error("上传失败，请稍后再试!");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.panoramaList, "全景图片");
          if (this.model == "endit") {
            if (this.panoramaList.length == 0) {
              this.panoramaList = this.templateList[this.index].pano_graphic;
            }
            if (this.vagueList.length == 0) {
              this.vagueList = this.templateList[this.index].pano_graphic_blur;
            }
            this.templateList[this.index] = {
              pano_graphic: this.panoramaList,
              pano_graphic_blur: this.vagueList,
              template: this.jsonData,
              nextTmpIndex: this.tempForm.nextTmpIndex,
              tmpIndex: this.templateList[this.index].tmpIndex,
              tmpId: this.templateList[this.index].tmpId
            };
            // console.log(this.templateList, "编辑确定");
          } else {
            this.templateList.push({
              pano_graphic: this.panoramaList,
              pano_graphic_blur: this.vagueList,
              template: this.jsonData,
              nextTmpIndex: this.tempForm.nextTmpIndex
            });
          }
          this.dialogVisible = false;
          this.resetForm(formName);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      this.mfileList = [];
      this.jsonfileList = [];
      this.panoramaList = [];
      this.vagueList = [];
    },
    endittemp(index) {
      //编辑
      // console.log(index, "iii");
      this.index = index;
      let list = [];
      let list_b = [];
      for (let i = 0; i < this.templateList[index].pano_graphic.length; i++) {
        list.push({ url: this.templateList[index].pano_graphic[i] });
      }
      for (
        let i = 0;
        i < this.templateList[index].pano_graphic_blur.length;
        i++
      ) {
        list_b.push({ url: this.templateList[index].pano_graphic_blur[i] });
      }
      this.jsonData = this.templateList[index].template;
      this.tmpIndex = this.templateList[index].tmpIndex;
      // console.log(list, "list");
      this.fileList = list;
      this.mfileList = list_b;
      if (this.templateList[index].nextTmpIndex) {
        this.tempForm.nextTmpIndex = this.templateList[index].nextTmpIndex;
      } else {
        this.tempForm.nextTmpIndex = null;
      }
      this.dialogVisible = true;
    },
    savetemp() {
      let _data = {
        tmp_group_id: this.tmp_group_id,
        tmpInfo: this.templateList
      };
      if (this.model == "endit") {
        updateTmpInfo(_data).then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.templateList = [];
          this.$router.push({
            path: "/templates/list"
          });
        });
      } else {
        saveTmpInfo(_data).then(res => {
          // console.log(res, "res");
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.templateList = [];
        });
      }
    }
  }
};
</script>
<style>
.addbtn {
  margin: 30px 0;
  text-align: center;
}
.templist {
  margin: 30px 0;
  text-align: center;
}
.box-card {
  display: inline-block;
  margin: 0 30px;
}
.sumbtn {
  margin: 30px auto;
}
.tempimgbox {
}
.tempimgbox img {
  width: 200px;
  height: 150px;
}
/*隐藏上传图标*/
.disableds >>> .el-upload--picture-card {
  display: none !important;
}
</style>


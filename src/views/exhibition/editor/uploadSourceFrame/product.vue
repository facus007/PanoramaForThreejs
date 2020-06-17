<template>
  <div class="app-container advs">
    <h3>上传产品资源</h3>
    <div class="uploadbox">
      <el-form :model="formData" ref="dataForm" :inline="false" :rules="rules" label-width>
        <el-form-item label="" prop="imageUrl">
          <el-upload
            ref="imageUrl"
            multiple
            :action="vrResourceUpload"
            :file-list="productList"
            :before-upload="productBeforeUpload"
            :on-success="productUpload"
            :on-exceed="overreProduct"
            :on-error="onError"
            :on-progress="onProgress"
            accept=".zip"
          >
            <div slot="tip" class="el-upload__tip">
              <div
                style="width:250px;margin:0px auto;font-size:12px;text-align:left;line-height:16px;"
              >产品上传的说明：
                <p>1. zip包中需要包含相应的产品图片</p>
                <p>2. zip包中需要包含相应的产品相关信息的excel</p>
                <p>3. 示例产品包下载</p>
              </div>
            </div>
            <el-button size="small">上传</el-button>
          </el-upload>
          <!--             :limit="1"
                    :on-remove="resourceremove"
          -->
        </el-form-item>
        <!-- <el-form-item label="" prop="productName">
          <el-upload ref="resourceUrl" multiple :limit="1" :action="fileUpload">
            <div slot="tip" class="el-upload__tip">请上传Excel</div>
            <el-button size="small">上传</el-button>
          </el-upload>
        </el-form-item>-->
        <el-form-item>
          <div>
            <el-button type="primary" icon="el-icon-check" @click="handelConfirm">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { vrResourceUpload } from "@/api/upload";
import { saveproductchoose } from "@/api/externalLinks";
export default {
  name: "product",
  data() {
    return {
      vrResourceUpload: 'https://manager.match.ccb.com/file-api/vrResourceUpload',
      formData: {},
      rules: {
        imageUrl: [
          {
            required: false,
            message: "",
            trigger: "change"
          }
        ]
      },
      productList: [],
      resPonseData: []
    };
  },
  methods: {
    productBeforeUpload() {},
    productUpload(response, file, fileList) {
      //上传成功处理
      console.log(response, "respone");
      let arr = response.data.map(item => {
        return {
          mainUrl: item.imageUrl,
          ...item
        };
      });
      this.resPonseData = this.resPonseData.concat(arr);
      this.$message({
        message: "上传成功！",
        type: "success"
      });
    },
    onError() {
      this.$message({
        message: "上传失败！",
        type: "error"
      });
    },
    onProgress() {},
    overreProduct(files, fileList) {
      // this.msgWarning("最多上传个资源！");
    },
    handelConfirm() {
      //确定 返回batchNo
      if (this.resPonseData.length == 0) {
        this.$message({
          message: "请上传产品资源包！",
          type: "warning"
        });
        return;
      }
      saveproductchoose(this.resPonseData).then(res => {
        console.log(res.data.batchNo, "batchNo");
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.productList = [];
        this.resPonseData = [];
        this.resetForm("dataForm");
      });
    }
  }
};
</script>
<style scoped>
.advs {
  /* text-align: center; */
}
h3 {
  text-align: center;
}
.uploadbox {
  text-align: center;
  width: 30%;
  margin: 30px auto;
}
.el-form-item__error {
  position: static !important;
  color: blue;
}
</style>

<template>
  <div class="app-container advs">
    <h3>上传广告资源</h3>
    <div class="uploadbox">
      <el-form :model="queryParams" ref="dataForm" :inline="false" :rules="rules" label-width>
        <el-form-item label="" prop="productName">

<!--          <el-upload class="upload" action="#" drag :show-file-list="false" :auto-upload="false" :on-change="onChange" accept=".zip">-->

          <el-upload
            ref="resourceUrl"
            multiple
            :action="vrAdvResourceUpload"
            :file-list="advsList"
            :on-success="advsUpload"
            :on-exceed="overreProduct"
            :on-error="onError"
            accept=".zip"
            :headers="headers"
          >
            <div slot="tip" class="el-upload__tip">请上传zip格式文件</div>
            <el-button size="small">上传</el-button>
          </el-upload>
          <span>已上传{{num}}个资源包</span>
          <!-- :file-list="field104fileList"
                      :limit="1"
                    :before-upload="field104BeforeUpload"
                    :on-success="resourceUrlUpload"
                    :on-exceed="overresourcenum"
                    :on-remove="resourceremove"
          -->
        </el-form-item>
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
  // import { vrAdvResourceUpload } from "@/api/upload";
  import { saveAdvResource } from "./index.js";
  import { AdvResourceUpload } from '@/api/cos'
  import { getToken } from '@/utils/auth'
  export default {
    name: "advs",
    data() {
      return {
        // "https://manager.flycloudinfo.com/file-api/vrAdvResourceUpload",
        vrAdvResourceUpload: process.env.VUE_APP_COS_API + '/vrAdvResourceUpload',
        queryParams: {},
        rules: {},
        num: 0,
        advsList: [],
        resPonseData: [],
        name: '',
        file: null,
        url: null,
        remark: null,
        headers: {
          Authorization: getToken()
        },
      };
    },
    methods: {
      onChange(file) {
        this.file = file
        this.name = this.name || this.file.name
        this.remark = this.remark || this.file.name
        this.url = null
        var fr = new FileReader();
        fr.readAsDataURL(this.file.raw);
        fr.onload= (e)=>{
          this.url = e.target.result

          this.loading= true
          let formData = new FormData()
          // formData.append('filename',this.file.name)
          formData.append('file',this.file.raw)
            AdvResourceUpload(formData).then(result=>{
              console.log(result)
              // addMaterial({
              //   materialType: '1',
              //   materialContent: result.url,
              //   remark: this.remark,
              // }).then(_=>{this.loading=false;this.visible=false})
            })
        }
      },
      advsUpload(response, file, fileList) {
        //上传成功处理
        console.log(response, "respone");
        this.num++;
        this.$message({
          message: "上传成功！",
          type: "success"
        });
        this.resPonseData = this.resPonseData.concat(response.data);
        console.log(this.resPonseData, "6666");
      },
      overreProduct(files, fileList) {
        // this.msgWarning("最多上传1个资源！");
      },
      handelConfirm() {
        //确定 返回batchNo
        if (this.resPonseData.length == 0) {
          this.$message({
            message: "请上传广告资源包！",
            type: "warning"
          });
          return;
        }
        saveAdvResource(this.resPonseData).then(res => {
          console.log(res.data.batch_no, "batch_no");
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.advsList = [];
          this.resPonseData = [];
          this.resetForm("dataForm");
        });
      },
      onError() {
        this.$message({
          message: "上传失败！",
          type: "error"
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
</style>

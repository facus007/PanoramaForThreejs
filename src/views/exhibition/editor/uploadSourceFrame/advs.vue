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
            :before-upload="onChange"
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
    <transition name="el-fade-in">
    <div style="position: fixed; width:100%; height:100%; z-index:5000; top:0;left:0; background:#FFFE; display:flex; align-items:center; justify-content: center;" v-if="loading">
      <span style="margin:auto;">
        <i class="el-icon-loading" style="margin: auto;margin-right:10px"/>
        请稍后，正在进行图片处理
      </span>
    </div>
    </transition>
  </div>
</template>

<script>
  // import { vrAdvResourceUpload } from "@/api/upload";
  import { saveAdvResource } from "./index.js";
  import { AdvResourceUpload } from '@/api/cos'
  import { getToken } from '@/utils/auth'
  export default {
    name: "advs",
    props:['value'],
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
        loading: false
      };
    },
    methods: {
      onChange(file) {
        console.log(1)
        this.loading=true
      },
      advsUpload(response, file, fileList) {
        //上传成功处理
        this.loading=false
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
          // this.resetForm("dataForm");
          this.$emit('input', res.data.batch_no)
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

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
            :headers="headers"
            :on-progress="onProgress"
            accept=".zip"
          >
            <div slot="tip" class="el-upload__tip">
              <div
                style="width:250px;margin:0px auto;font-size:12px;text-align:left;line-height:16px;"
              >产品上传的说明：
                <p>1. zip包中需要包含相应的产品图片</p>
                <p>2. zip包中需要包含相应的产品相关信息的excel</p>
                <p>3. zip包的文件夹名字需为英文</p>
                <p>4. 示例产品包下载</p>
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
// import { vrResourceUpload } from "@/api/upload";
import { saveproductchoose } from "./index";
import { listChooseHotspots } from "../../../../api/server";
import { getToken } from '@/utils/auth'

export default {
  name: "product",
  props:['value'],
  data() {
    return {
      // vrResourceUpload: process.env.VUE_APP_COS_API + '/vrResourceUpload',
      vrResourceUpload: process.env.VUE_APP_COS_API + '/saveVrResource',
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
      resPonseData: null,
      loading: false,
      flag:false,
      headers: {
        Authorization: getToken()
      },
    };
  },
  methods: {
    productBeforeUpload() {
      this.loading=true
    },
    productUpload(response, file, fileList) {
      //上传成功处理
      // console.log(response,'response')
      this.resPonseData = response.data;
      // this.resPonseData = this.resPonseData.concat(arr);
      // this.$message({
      //   message: "上传成功！",
      //   type: "success"
      // });
      if(response.data){
        this.savelistChooseHotspots(response.data);
      }
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
    savelistChooseHotspots(batchNo){
      // console.log(this.$store.state.editor.product.tmp_group_id,'this.$store.state.editor.product.tmp_group_id')
      this.$store.state.editor.product.tmp_group_id;
      listChooseHotspots({batch_no:batchNo,tmp_group_id:this.$store.state.editor.product.tmp_group_id}).then(res=>{
        // console.log(res,'00')
        if(res.code==200&&res.flag){
          //有数据返回才结束
        this.flag=res.flag;
        this.loading=false
        this.$message({
          message: res.msg,
          type: "success"
        });
        }else{
          //没有数据就10s请求一次  5min超时
        let times=0;
        let timer=setInterval(() => {
          if(times>30||this.flag){
        clearInterval(timer)
          }else{
            times++;
        this.savelistChooseHotspots(this.resPonseData);
          }
        }, 10000);
        return;
        }
        
      })
    },
    handelConfirm() {
      if (this.resPonseData) {
        //隐藏弹框
      this.$emit('openAdvsSouceFrame', false)
      this.$emit('input', this.resPonseData)
      }else{
        this.$message({
          message: "请上传产品资源包！",
          type: "warning"
        });
        return;
      }
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

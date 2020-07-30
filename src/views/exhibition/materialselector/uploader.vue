<template>
  <el-dialog title="提示" :visible.sync="visible" width="50%" append-to-body :modal="false" v-loading="loading">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="资源类型">
        <el-select size="small" v-model="selected" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" :disabled="checkAccept(item)"/>
        </el-select>
      </el-form-item>
      <el-form-item label="选择资源">
        <el-upload class="upload image-box image-box-3x" action="#" drag :show-file-list="false" :auto-upload="false" :on-change="onChange" :accept="selected && selected.accept">
          <img v-if="file && selected.value==='1'" :src="url" class="image-box image-box-3x"/>
          <video v-else-if="file && selected.value==='2'" controls :src="url" class="image-box image-box-3x" style="max-width: 100%; max-height: 100%;" playsinline/>
          <audio v-else-if="file && selected.value==='5'" controls :src="url" class="image-box image-box" style="width: 350px; max-width: 100%; max-height: 100%;" playsinline/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="资源描述">
        <el-input v-model="remark" style="width: 200px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input', false)">取 消</el-button>
      <el-button type="primary" @click="upload">上 传</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import { imageUpload, mediaUpload } from '@/api/cos'
import { addMaterial } from '@/api/server'

const options = [
  {value: '1', label: '图片', accept: 'image/*', action: imageUpload},
  {value: '2', label: '视频', accept: 'video/*', action: mediaUpload},
  {value: '5', label: '音频', accept: 'audio/*', action: mediaUpload},
]

const label = ['right','back','left','front','top','bottom']

export default {
  // mixins:[mixin],
  data(){return {
    options,
    selected: null,
    name: '',
    file: null,
    visible: false,
    loading: false,
    url: null,
    remark: null,
  }},
  props:['value', 'isCloud', 'accepttype'],
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){
      this.visible = next
      if(!next){
        this.name = ''
        this.selected = null
        this.file = null
        this.url = null
        this.remark = null
      } else {
        let accepttype = this.accepttype.split(',')
        for (var i = 0; i < options.length; i++) {
          if( accepttype.includes(options[i].value)){
            this.selected = options[i]
          }
        }
      }
    },
    selected(){
      this.name = ''
      this.file = null
      this.url = null
      this.remark = null
    }
  },
  methods:{
    onChange(file) {
      this.file = file
      this.name = this.name || this.file.name
      this.remark = this.remark || this.file.name
      this.url = null
      var fr = new FileReader();
      fr.readAsDataURL(this.file.raw);
      fr.onload= (e)=>{
        this.url = e.target.result
      }
    },
    async upload(){
      if(!this.file){
        this.$message.warning('请上传图片')
        return
      }
      this.loading= true
      let formData = new FormData()
      formData.append('filename',this.file.name)
      formData.append('file',this.file.raw)
      this.selected.action(formData).then(result=>{
        addMaterial({
          materialType: this.selected.value,
          materialContent: result.url,
          remark: this.remark,
        }).then(_=>{this.loading=false;this.visible = false})
      })
    },
    checkAccept(item){
      return !this.accepttype.split(',').includes(item.value)
    }
  },
}
</script>

<style scoped="views" lang="scss">
  @import '@/assets/styles/custom.scss';
  .upload{
    /deep/ .el-upload-dragger {
      padding: 0px;
      @extend .centering;
      @extend .image-box;
      @extend .image-box-3x;
    }
    padding: 0px;
  }
</style>

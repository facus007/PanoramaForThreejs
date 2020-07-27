<template>
  <el-dialog title="提示" :visible.sync="visible" width="50%" append-to-body :modal="false" v-loading="loading">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="资源类型">
        <el-select size="small" v-model="selected" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="!accepttype.split(',').includes(item.value) || (item.value !== '1' && isCloud)"/>
        </el-select>
      </el-form-item>
      <el-form-item label="选择资源">
        <el-upload class="upload" action="#" drag :show-file-list="false" :auto-upload="false" :on-change="onChange" :accept="accept">
          <img v-if="file && selected==='1'" :src="url" style="width: 100%; height: 100%; object-fit: contain;"/>
          <video v-else-if="file && selected==='2'" controls :src="url" style="max-width: 100%; max-height: 100%;" playsinline/>
          <audio v-else-if="file && selected==='5'" controls :src="url" style="max-width: 100%; max-height: 100%;" playsinline/>
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

const options = [{
  value: '1',
  cloudvalue: '10',
  label: '图片',
  accept: 'image/*',
},{
  value: '2',
  cloudvalue: '10',
  label: '视频',
  accept: 'video/*',
},{
  value: '5',
  cloudvalue: '10',
  label: '音频',
  accept: 'audio/*',
}]

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
        this.selected = null,
        this.file = null
        this.url = null
        this.remark = null
      } else {
        let accepttype = this.accepttype.split(',')
        for (var i = 0; i < options.length; i++) {
          if( accepttype.includes(options[i].value)){
            this.selected = options[i].value
          }
        }
      }
    },
    selected(){
      this.file = null
      this.name = ''
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
      // this.loading = true
      // const preprocessing = request('@/utils/preprocessing')
      // preprocessing(this.url).then(async (result)=>{
      //   if(this) {
      //     var zip = new JSZip()
      //     for (var i = 0; i < result.length; i++) {
      //       await fetch(result[i]).then(r=>zip.file(label[i]+'.jpg',r.blob()))
      //     }
      //     var a = document.createElement('a');
      //     a.href = URL.createObjectURL(await zip.generateAsync({type:"blob"}))
      //     a.download = this.file.name + '.zip'
      //     a.click()
      //     this.loading = false
      //     this.$emit('input', false)
      //   }
      // })
      if(!this.file){
        return
      }
      this.loading= true
      let formData = new FormData()
      formData.append('filename',this.file.name)
      formData.append('file',this.file.raw)
      if (this.selected==='1') {
        imageUpload(formData).then(result=>{
          addMaterial({
            materialType: this.isCloud ? this.cloudvalue : this.select,
            materialContent: result.url,
            remark: this.remark,
          }).then(_=>{this.loading=false;this.visible=false})
        })
      }
      else if (this.selected ==='2') {
        mediaUpload(formData).then(result=>{
          console.log(result)
          addMaterial({
            materialType: this.isCloud ? this.cloudvalue : this.select,
            materialContent: result.url,
            remark: this.remark,
            resourceUrl: result.previewurl,
          }).then(_=>{this.loading=false;this.visible=false})
        })
      }
      else if (this.selected ==='5') {
        mediaUpload(formData).then(result=>{
          console.log(result)
          addMaterial({
            materialType: this.isCloud ? this.cloudvalue : this.select,
            materialContent: result.url,
            remark: this.remark,
          }).then(_=>{this.loading=false;this.visible=false})
        })
      }
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    accept(){
      var accept;
      options.forEach((item, i) => {
        item.value === this.selected && (accept = item.accept)
      });
      return accept;
    },
    cloudvalue(){
      var cloudvalue;
      options.forEach((item, i) => {
        item.value === this.selected && (cloudvalue = item.cloudvalue)
      });
      return cloudvalue;
    }
  },
}
</script>

<style scoped="views">
  .upload >>> .el-upload-dragger{
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>

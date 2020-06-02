<template>
  <el-dialog title="提示" :visible.sync="visible" width="70%" v-loading="loading">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="作品名称">
        <el-input size="small" v-model="name" style="width: 200px" show-word-limit :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="作品描述">
        <el-input size="small" type="textarea" v-model="description" :rows="2" style="width: 200px" show-word-limit :maxlength="50" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择封面">
        <el-upload class="upload" action="#" drag :show-file-list="false" :auto-upload="false" :on-change="onChange">
          <img v-if="file" :src="url" style="width: 200px; height: 100px; border-radius: 5px; box-shadow: 0 0 4px 0 gray; object-fit: cover;">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="选择模板">
        <template-selector/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input', false)">取 消</el-button>
      <el-button type="primary" @click="upload">创 建</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import TemplateSelector from './templateselector'
import { imageUpload } from '@/api/cos'
import { addMaterial } from '@/api/server'

export default {
  // mixins:[mixin],
  components:{TemplateSelector},
  data(){return {
    selected: '0',
    name: '',
    description: '',
    file: null,
    visible: false,
    loading: false,
  }},
  props:['value'],
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){
      this.visible = next
      if(!next){
        this.selected = '0'
        this.name = ''
        this.file = null
      }
    },
  },
  methods:{
    onChange(file) {
      this.file = file
      this.name = this.name || this.file.name
    },
    async upload(){
      let formData = new FormData()
      formData.append('filename',this.file.name)
      formData.append('file',this.file.raw)
      imageUpload(formData).then(result=>{
        addMaterial({
          materialType: '1',
          materialContent: result.url,
        }).then(a=>console.log(a))
      })
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    url(){
      return this.file && URL.createObjectURL(this.file.raw)
    }
  },
}
</script>

<style scoped="views">
  .upload >>> .el-upload-dragger{
    display:flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 100px;
  }
</style>

<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content:center; flex-direction: column" v-loading="loading">
    <el-card style="display: flex; align-items: center; justify-content:center; flex-direction: column">
      <div slot="header" class="clearfix">
        全景图处理工具
      </div>
      <el-upload class="upload" action="#" drag :show-file-list="false" :auto-upload="false" :on-change="onChange">
        <img v-if="file" :src="url" style="width: 100%; height: 100%; object-fit: cover;">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div style="width: 100%; display: flex;">
        <el-button type="primary" @click="processing" style="margin: 10px 0px; margin-left: auto">处 理</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import preprocessing from '@/utils/preprocessing'
import JSZip from 'jszip'

const label = ['right', 'back', 'left', 'front', 'top', 'bottom']

export default {
  data(){return {
    file: null,
    loading: false,
  }},
  methods:{
    onChange(file) {
      this.file = file
      this.name = this.name || this.file.name
    },
    async processing(){
      this.loading = true
      let result = await preprocessing(this.url)
      var zip = new JSZip()
      for (var i = 0; i < result.length; i++) {
        await fetch(result[i]).then(r=>zip.file(label[i]+'.jpg',r.blob()))
      }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(await zip.generateAsync({type:"blob"}))
      a.download = this.file.name + '.zip'
      a.click()
      this.loading = false
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

<style scoped>
.upload >>> .el-upload-dragger{
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>

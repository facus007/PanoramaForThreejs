<template>
  <el-dialog title="新建作品" :visible.sync="visible" width="70%" v-loading="loading">
    <el-form v-if="visible" label-position="right" label-width="100px">
      <el-form-item label="作品名称">
        <el-input size="small" v-model="name" style="width: 250px" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="作品描述">
        <el-input size="small" type="textarea" v-model="description" :rows="2" style="width: 250px" show-word-limit :maxlength="50" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择封面">
        <el-button class="upload centering" type="text" @click="onChange">
          <el-image v-if="cover" :src="cover" class="scene-box scene-box-2x"/>
          <i v-else class="el-icon-plus avatar-uploader-icon image-box image-box-2x centering" style="border: 1px dashed #d9d9d9;"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="选择模板">
        <template-selector v-model="template"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input', false)">取 消</el-button>
      <el-button type="primary" @click="upload">创 建</el-button>
    </span>
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { v4 as uuid} from 'uuid'
import { saveVR } from '@/utils/server'
import mixin from '@/views/mixin'
import TemplateSelector from './templateselector'
import MaterialSelector from '@/views/exhibition/materialselector'

const defaultScene = {
  fov: 60,
  start_rotation: [Math.PI/2, Math.PI/2],
}

export default {
  // mixins:[mixin],
  components:{TemplateSelector, MaterialSelector},
  data(){return {
    selected: '0',
    name: '',
    description: '',
    file: null,
    visible: false,
    loading: false,
    template: null,
    showDialog: false,
    cover: false,
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
        this.cover = null
        this.template = null
      }
    },
  },
  methods:{
    async upload(){
      if(!this.name){
        this.$message.warning('请输入作品名')
        return
      }
      if(!this.template){
        this.$message.warning('请选择模版')
        return
      }
      try {
        this.loading = true
        var scenes = []
        var music_url = null
        this.template.tmp_details.forEach((item, i) => {
          music_url = item.music_url
          scenes.push({...defaultScene, tmp_id: item.tmp_id, name: '场景' + (1+i)})
          this.template.tmp_group_id === '1' && item.tmp_id === '1' && (scenes[i].start_rotation[0] -= Math.PI/6) //TODO:  hardcode
        });

        await saveVR({
          name: this.name,
          description: this.description,
          cover: this.cover,
          scenes,
          tmp_group_id: this.template.tmp_group_id,
          music_url: music_url,
          loop: true,
          animation: true,
          features: [
            {"type":"scene","uuid":uuid(),"size":"1 x 1","position":{"group":1,"x":"0","y":"0"},"name":"场景列表","url":"","link":"","content":""},
            {"type":"info","uuid":uuid(),"size":"1 x 1","position":{"group":2,"x":2,"y":0},"name":"简介","url":"","link":"","content":""}
          ],
        })
        this.$message.success('创建成功')
        this.visible=false
      } catch (e) {
        this.$message.error(e)
      } finally {
        this.loading=false
      }
    },
    onChange(){
      this.showDialog = true
    },
    select(material){
      this.cover = material.material_content
    }
  },
  mounted(){},
  beforeDestroy(){},
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

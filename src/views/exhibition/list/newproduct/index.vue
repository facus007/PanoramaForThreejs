<template>
  <el-dialog title="新建作品" :visible.sync="visible" width="70%" v-loading="loading">
    <el-form v-if="visible" label-position="right" label-width="100px">
      <el-form-item label="作品名称">
        <el-input size="small" v-model="name" style="width: 200px" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="作品描述">
        <el-input size="small" type="textarea" v-model="description" :rows="2" style="width: 200px" show-word-limit :maxlength="50" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择封面">
        <el-button class="upload" type="text" @click="onChange" style="width: 200px; height: 100px; border-radius: 5px; border: 1px dashed gray; position:ralative;">
          <el-image v-if="cover" :src="cover" fit="cover" style="position:absolute; width: 200px; height: 100px;left:0;top:0; padding:1px;"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="选择参展商">
        <exhibitor-selector v-model="exhibitor_id"/>
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
import mixin from '@/views/mixin'
import TemplateSelector from './templateselector'
import ExhibitorSelector from './exhibitorselector'
import { imageUpload } from '@/api/cos'
import { saveVR } from '@/utils/server'
import MaterialSelector from '@/views/exhibition/materialselector'

const defaultScene = {
  fov: 60,
  start_rotation: [Math.PI/2, Math.PI/2],
}

export default {
  // mixins:[mixin],
  components:{TemplateSelector, MaterialSelector,ExhibitorSelector},
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
    exhibitor_id: null,
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
        this.exhibitor_id = null
      }
    },
  },
  methods:{
    async upload(){
      if(!this.name){
        this.$message.warning('请输入作品名')
        return
      }
      if(!this.exhibitor_id){
        this.$message.warning('请选择参展商')
        return
      }
      if(!this.template){
        this.$message.warning('请选择模版')
        return
      }
      try {
        console.log(this.exhibitor_id,)
        this.loading = true
        var scenes = []
        this.template.tmp_details.forEach((item, i) => {
          scenes.push({...defaultScene, tmp_id: item.tmp_id, name: '场景' + (1+i)})
        });
        await saveVR({
          name: this.name,
          description: this.description,
          cover: this.cover,
          scenes,
          tmp_group_id: this.template.tmp_group_id,
          exhibitor_id: this.exhibitor_id,
          music_url: null,
        })
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

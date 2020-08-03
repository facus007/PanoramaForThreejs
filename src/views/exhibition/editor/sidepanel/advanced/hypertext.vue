<template>
  <div class="grid grid-centering grid-vertical">
    <div style="width: 100%;">图标
      <el-tooltip class="item" effect="dark" content="支持jpg、png、gif等格式图片" placement="right-end">
        <el-button type="text" class="el-icon-info" style="margin: 0;padding:0"/>
      </el-tooltip>
    </div>

    <el-button type="text" @click="showDialog=true">
      <img v-if="item.url" :src="item.url" class="image-box image-box-2x"/>
      <i v-else class="el-icon-plus avatar-uploader-icon image-box image-box-2x centering" style="border: 1px dashed #d9d9d9;"></i>
    </el-button>

    <el-button type="primary" size="small" style="margin:0; width: 100%;" @click="showEditor=true">编 辑</el-button>

    <editor v-model="showEditor" @content="setContent" :item="item" :key="item.uuid"/>
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import MaterialSelector from '@/views/exhibition/materialselector'
import { editor } from '@/components/Quill'

export default {
  mixins:[mixin],
  props:['item', 'light'],
  data(){return {
    showDialog: false,
    showEditor: false,
  }},
  components:{MaterialSelector, editor},
  // props:['sideImgs'],
  watch:{},
  methods:{
    select(material){
      this.item.url = material.material_content
    },
    setContent(content){
      this.item.content = content
    }
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview','product']),
  },
}
</script>

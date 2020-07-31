<template>
  <div class="grid grid-centering grid-vertical">
    <div style="width: 100%;">图标
       <el-tooltip class="item" effect="dark" content="支持jpg、png、gif等格式图片" placement="right-end">
        <el-button type="text" class="el-icon-info" style="margin: 0;padding:0"/>
      </el-tooltip>
    </div>
    <el-button type="text" @click="onChange">
      <img v-if="item.url" :src="item.url" class="image-box image-box-2x"/>
      <i v-else class="el-icon-plus avatar-uploader-icon image-box image-box-2x centering" style="border: 1px dashed #d9d9d9;"></i>
    </el-button>
    <div style="width: 100%;">请输入超链接
      <el-tooltip class="item" effect="dark" content="超链接需附上 http:// 或 https:// " placement="right-end">
        <el-button type="text" class="el-icon-info" style="margin: 0;padding:0"/>
      </el-tooltip>
    </div>
    <el-input class="input" size="small" v-model="item.link" style="width: 100%;"/>
    <el-checkbox v-model="item.inline" style="justify-self: flex-end">弹框打开</el-checkbox>
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'

export default {
  props:['item', 'light'],
  data(){return {
    showDialog: false,
  }},
  components:{MaterialSelector},
  // props:['sideImgs'],
  watch:{},
  methods:{
    onChange(){
      this.showDialog= true
    },
    select(material){
      this.item.url = material.material_content
    }
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview','product']),
  },
}
</script>

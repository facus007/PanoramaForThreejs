<template>
  <div class="scene" style="display: grid;width:100%; height:100%; grid-template-areas:'a' 'c'; grid-column-gap: 4px; grid-row-gap: 2px; grid-template-rows:1fr 20px;">
    <el-button class="upload" type="text" @click="showvideoDialog=true" style="grid-area: a; width: 100%; height: 100%; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <video v-if="selected.target.video" :src="selected.target.video" controls autoplay playsinline style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <el-checkbox v-model="selected.target.hidespot" style="margin-left:auto;color:gray; grid-area: c;">隐藏呼吸灯</el-checkbox>
    <material-selector v-model="showvideoDialog" @select="selectVideo" imgtype="2"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'

export default {
  props:['selected','getSelecteds'],
  data(){return{showvideoDialog:false}},
  components:{MaterialSelector},
  methods:{
    selectVideo(material){
      this.getSelecteds().forEach((item, i) => {
        item.img_url = material.resource_url || item.img_url
        item.target.video = material.material_content
      });
    },
  },
  computed:{
    ...mapState('editor',['curedit', 'product']),
  }
}
</script>

<template>
  <div class="grid grid-centering fill" style="grid-template-areas:'a' 'c';">
    <el-button class="upload image-box image-box-2x" type="text" @click="showvideoDialog=true" style="grid-area: a; padding: 0; border: 1px dashed white;">
      <video v-if="selected.target.video" :src="selected.target.video" controls autoplay playsinline class="image-box image-box-2x" muted />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <el-checkbox v-if="curedit.embeddings[0].hotspots.indexOf(selected) < 0" v-model="selected.target.hidespot" style="margin-left:auto; color:gray; grid-area: c;">隐藏呼吸灯</el-checkbox>
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
        item.img_url = item.img_url || material.resource_url
        item.target.video = material.material_content
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
  },
  computed:{
    ...mapState('editor',['curedit', 'product']),
  }
}
</script>

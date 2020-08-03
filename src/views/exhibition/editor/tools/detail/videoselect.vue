<template>
  <div class="grid grid-centering grid-vertical fill">
    <el-button class="upload" type="text" @click="showvideoDialog=true" style="padding: 0;">
      <div class="grid grid-centering grid-vertical">
        <video v-if="selected.target.video" :src="selected.target.video" controls autoplay playsinline class="image-box image-box-2x" muted />
        <i v-else class="el-icon-plus avatar-uploader-icon image-box image-box-2x centering" style="border: 1px dashed white;"></i>
        <span class="text image-box-2x" style="height:auto;margin: 0;">{{selected.target.remark}}</span>
      </div>
    </el-button>
    <el-checkbox v-if="curedit.embeddings[0].hotspots.indexOf(selected) < 0" v-model="selected.target.hidespot" style="margin-left:auto; color:gray;">隐藏呼吸灯</el-checkbox>
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
        item.target.remark = material.remark
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
  },
  computed:{
    ...mapState('editor',['curedit', 'product']),
  }
}
</script>

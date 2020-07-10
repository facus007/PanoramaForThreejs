<template>
  <div class="frame">
    <div style="width: 100%;">显示图标</div>
    <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 160px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="item.url" :src="item.url" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <div>
      请输入超链接
      <el-tooltip class="item" effect="dark" content="超链接需附上 http:// 或 https:// " placement="right-end">
        <el-button type="text" class="el-icon-info" style="margin: 0;padding:0"/>
      </el-tooltip>
    </div>
    <el-input class="input" size="small" v-model="item.link" style="margin-top:5px"/>
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import MaterialSelector from '@/views/exhibition/materialselector'

export default {
  mixins:[mixin],
  props:['item'],
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

<style scoped="views">
.frame {
  width: 100%;
  display: grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-gap: 10px;
  align-content: space-around;
}
</style>

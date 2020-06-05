<template>
  <div class="frame">
    <div style="width: 100%;">作品封面</div>
    <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 100%; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="product.cover" :src="product.cover" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'
import MaterialSelector from '@/views/exhibition/materialselector'

export default {
  mixins:[mixin],
  data(){return {
    showDialog: false,
  }},
  components:{ ...THREE, MaterialSelector},
  // props:['sideImgs'],
  watch:{},
  methods:{
    onChange(){
      this.showDialog= true
    },
    select(material){
      this.product.cover = material.material_content
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
  height: 160px;
  display:flex;
  margin: 5px 0;
  justify-content: center;
  padding: 15px 0px;
  flex-flow: wrap;
  align-content: space-around;
}
</style>

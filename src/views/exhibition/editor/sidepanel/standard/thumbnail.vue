<template>
  <div class="fill grid grid-centering">
    <div style="width: 100%;">作品封面</div>
    <el-button class="upload" type="text" @click="onChange" >
      <img v-if="product.cover" :src="product.cover" class="scene-box scene-box-2x"/>
      <i v-else class="el-icon-plus avatar-uploader-icon scene-box scene-box-2x" style="border: 1px dashed #d9d9d9;"></i>
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

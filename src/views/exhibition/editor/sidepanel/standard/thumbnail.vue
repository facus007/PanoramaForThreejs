<template>
  <div class="frame">
    <div style="width: 200px;">封面</div>
    <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 100%; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="product.cover" :src="product.cover" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <!-- <video v-if="selected.img_url && selected.style === 2" :src="selected.img_url" autoplay playsinline style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted /> -->
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <!-- <img style="width: 200px; height: 100px; border-radius: 5px; box-shadow: 0 0 4px 0 gray; object-fit: cover;" :src="sideImgs && sideImgs[3]"/> -->
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'

export default {
  mixins:[mixin],
  data(){return {
    showDialog: false,
  }},
  components:{ ...THREE},
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

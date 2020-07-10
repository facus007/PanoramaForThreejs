<template>
  <div class="frame">
    <div style="width: 100%;display:flex;align-items:center;">背景音乐
       <span style="margin-left: auto;"><el-button size="mini" class="upload" type="primary" @click="onChange">
        选择背景音乐
      </el-button></span>
    </div>
    <audio v-if="product.music_url" controls :src="product.music_url" style="max-width: 100%; max-height: 100%;" playsinline/>
    <div v-else  style="width: 100%; height: 50%;"/>
    <el-checkbox v-model="product.loop" style="margin-left: auto">循环播放</el-checkbox>
    <material-selector v-model="showDialog" @select="select" imgtype="5"/>
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
      this.product.music_url = material.material_content
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
  justify-content: center;
  flex-flow: wrap;
  align-content: space-around;
}
.frame >>> .el-checkbox__label{
  color: white;
}
</style>

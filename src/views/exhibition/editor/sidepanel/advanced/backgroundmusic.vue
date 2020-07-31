<template>
  <div class="grid grid-centering grid-vertical">
    <div class="grid grid-horizontal grid-centering" style="width: 100%;">
      <span style="justify-self: flex-start">背景音乐:</span>
      <el-button size="mini" type="primary" @click="onChange" style="justify-self: flex-end">
        选择背景音乐
      </el-button>
    </div>
    <span v-if="item.url" class="image-box image-box-2x centering" style="width: 100%;"><audio controls :src="item.url" style="width: 100%;" playsinline/></span>
    <div v-else class="image-box image-box-2x" style="width: 100%;"/>
    <el-checkbox v-model="item.loop" style="justify-self: flex-end">循环播放</el-checkbox>
    <material-selector v-model="showDialog" @select="select" imgtype="5"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'
import MaterialSelector from '@/views/exhibition/materialselector'

export default {
  props:['item', 'light'],
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
      this.item.url = material.material_content
    }
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview','product']),
  },
}
</script>

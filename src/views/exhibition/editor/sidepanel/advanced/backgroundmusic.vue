<template>
  <div class="grid grid-centering grid-vertical">
    <div class="grid grid-horizontal grid-centering" style="width: 100%;">
      <span style="justify-self: flex-start">背景音乐:</span>
      <el-button size="mini" type="primary" @click="onChange" style="justify-self: flex-end">
        选择背景音乐
      </el-button>
    </div>
    <span v-if="item.url" class="centering grid grid-vertical" >
      <audio controls :src="item.url" playsinline style="width: 230px;"/>
      <span class="text" style="width: 230px;">{{item.remark}}</span>
    </span>
    <div v-else class="image-box" style="width: 230px;"/>
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
      this.item.remark = material.remark
      this.item.url = material.material_content
    }
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview','product']),
  },
}
</script>

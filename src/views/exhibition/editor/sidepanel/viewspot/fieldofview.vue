<template>
  <div class="grid grid-centering" style="height:200px; grid-template-rows: 20px 1fr 40px;">
    <div style="width: 100%">当前视角大小</div>
    <div style="width: 100%; grid-template-columns: 20px 1fr 20px;" class="grid grid-horizontal grid-centering">
      30 <el-slider class="slider" v-model="curedit.fov" :min="30" :max="160" style="width:100%"></el-slider> 160
    </div>
    <el-button type="primary" size='small' style="width:100%;" @click="save">保存视角大小</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'

export default {
  mixins:[mixin],
  components:{ ...THREE},
  watch:{
    'camera.fov'(next, pre){
      this.curedit.fov = next
      this.camera.updateProjectionMatrix()
    },
    'curedit.fov'(next, pre){
      this.camera.fov = next
      this.camera.updateProjectionMatrix()
    }
  },
  methods:{
    save(){
      this.$store.dispatch('editor/save')
      this.$message.success('设置成功')
    }
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview', 'product', 'curedit']),
  },
  mounted(){
    this.camera.fov = this.curedit.fov
  }
}
</script>

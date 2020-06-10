<template>
  <div class="frame">
    <div style="width: 200px;">当前视角大小</div>
    <div style="width: 90%; justify-content:space-between; flex-direction: row; display: flex; align-items: center;">
      30 <el-slider class="slider" v-model="curedit.fov" :min="30" :max="160"></el-slider> 160
    </div>
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
  methods:{},
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview', 'product', 'curedit']),
  },
  mounted(){
    this.camera.fov = this.curedit.fov
  }
}
</script>

<style scoped="views">
.frame {
  width: 100%;
  height: 140px;
  display:flex;
  margin: 5px 0;
  justify-content: center;
  padding: 15px 0px;
  flex-flow: wrap;
  align-content: space-around;
}
.slider {
  width: 80%;
  margin: 0 5px;
}
</style>

<template>
  <div class="home noevent">
    <div class="frame">
      <el-button type="primary" class="event" @click="setView">
        将当前视角设定为初识视角
      </el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

export default {
  mixins: [THREEComponent],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    setView(){
      console.log(this.camera.quaternion)
      console.log(this.camera.fov)
    },
    // update(){},
    // propCompute(){},
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  margin: auto;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
</style>

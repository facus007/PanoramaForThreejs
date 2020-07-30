<template>
  <div style="color: white; font-size: 14px; font-weight: bold; height: 70%; width: 130px; display: grid; grid-gap: 2px; grid-template-rows: 26px 1fr 1fr 26px;" class="event">
  <div class="block">细节调整</div>
  <div class="block">
    <div>平 移</div>
    <div style="display: grid; grid-template-areas:'. . a . .' '. . b . .' 'c d . e f' '. . g . .' '. . h . .'; place-items: center center;">
      <div style="grid-area: a;">上</div>
      <el-button type="text" style="grid-area: b; padding: 0;margin: 0;" icon="el-icon-arrow-up" @click="up"/>
      <div style="grid-area: c;">左</div>
      <el-button type="text" style="grid-area: d; padding: 0;margin: 0;" icon="el-icon-arrow-left" @click="left"/>
      <el-button type="text" style="grid-area: e; padding: 0;margin: 0;" icon="el-icon-arrow-right" @click="right"/>
      <div style="grid-area: f;">右</div>
      <el-button type="text" style="grid-area: g; padding: 0;margin: 0;" icon="el-icon-arrow-down" @click="down"/>
      <div style="grid-area: h;">下</div>
    </div>
  </div>
  <div class="block">
    <div>缩 放</div>
    <div style="display: grid; grid-template-areas:'a b c' 'd e f'; place-items: center center;">
      <div style="grid-area: a;">水平</div>
      <el-button type="text" style="grid-area: b; padding: 0;margin: 0;" icon="el-icon-minus" @click="horizonal_minus"/>
      <el-button type="text" style="grid-area: c; padding: 0;margin: 0;" icon="el-icon-plus" @click="horizonal_add"/>
      <div style="grid-area: d;">竖直</div>
      <el-button type="text" style="grid-area: e; padding: 0;margin: 0;" icon="el-icon-minus" @click="vertical_minus"/>
      <el-button type="text" style="grid-area: f; padding: 0;margin: 0;" icon="el-icon-plus" @click="vertical_add"/>
    </div>
  </div>
  <div class="block">
    <el-button type="text" style="color: white; padding: 0; border: 0;" @click="reset">重置</el-button>
  </div>
</div>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
// import * as THREE from '@/components/THREE'
const scaleStep = Math.pow(2, 0.1)
const posStep = 1

export default {
  data(){return {
    group: null,
  }},
  props:['selected'],
  // components:{...THREE},
  methods:{
    right(){
      this.selected.transform.affine_transform[0] -= posStep
      // this.selected.transform.affine_transform[0] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[0], -100, 100)
      this.selected.transform = {...this.selected.transform}
    },
    left(){
      this.selected.transform.affine_transform[0] += posStep
      // this.selected.transform.affine_transform[0] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[0], -100, 100)
      this.selected.transform = {...this.selected.transform}
    },
    up(){
      this.selected.transform.affine_transform[1] -= posStep
      // this.selected.transform.affine_transform[1] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[1], -1, 1)
      this.selected.transform = {...this.selected.transform}
    },
    down(){
      this.selected.transform.affine_transform[1] += posStep
      // this.selected.transform.affine_transform[1] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[1], -1, 1)
      this.selected.transform = {...this.selected.transform}
    },
    horizonal_add(){
      this.selected.transform.affine_transform[2] *= scaleStep
      // this.selected.transform.affine_transform[2] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[2], 0.5, 2)
      this.selected.transform = {...this.selected.transform}
    },
    horizonal_minus(){
      this.selected.transform.affine_transform[2] /= scaleStep
      // this.selected.transform.affine_transform[2] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[2], 0.5, 2)
      this.selected.transform = {...this.selected.transform}
    },
    vertical_add(){
      this.selected.transform.affine_transform[3] *= scaleStep
      // this.selected.transform.affine_transform[3] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[3], 0.5, 2)
      this.selected.transform = {...this.selected.transform}
    },
    vertical_minus(){
      this.selected.transform.affine_transform[3] /= scaleStep
      // this.selected.transform.affine_transform[3] = THREE.MathUtils.clamp(this.selected.transform.affine_transform[3], 0.5, 2)
      this.selected.transform = {...this.selected.transform}
    },
    reset(){
      this.selected.transform.affine_transform = [0, 0, 1, 1, 0, 0.5, 0.5]
      this.selected.transform = {...this.selected.transform}
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'domElement']),
    ...mapState('editor',['curedit']),
  }
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
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
.el-button {
  color: #AAA;
}
.el-button :hover{
  color: yellow;
}
.block{
  text-align: center;
  background: rgba(51,51,51,0.8);
  padding: 5px;
  display: grid; grid-gap: 5px;
  grid-template-rows: 16px 1fr;
  width:100%;
}
</style>

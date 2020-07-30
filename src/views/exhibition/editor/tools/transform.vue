<template>
  <div style="height: 70%; width: 130px; grid-template-rows: 26px 1fr 1fr 26px;" class="grid event">
  <div class="block">细节调整</div>
  <div class="block">
    <div>平 移</div>
    <div class="grid" style="grid-template-areas:'. . a . .' '. . b . .' 'c d . e f' '. . g . .' '. . h . .'; place-items: center center;">
      <div style="grid-area: a;">上</div>
      <div style="grid-area: c;">左</div>
      <div style="grid-area: f;">右</div>
      <div style="grid-area: h;">下</div>
      <el-button class="textbtn" type="text" style="grid-area: b;" icon="el-icon-arrow-up" @click="action('up')"/>
      <el-button class="textbtn" type="text" style="grid-area: d;" icon="el-icon-arrow-left" @click="action('left')"/>
      <el-button class="textbtn" type="text" style="grid-area: e;" icon="el-icon-arrow-right" @click="action('right')"/>
      <el-button class="textbtn" type="text" style="grid-area: g;" icon="el-icon-arrow-down" @click="action('down')"/>
    </div>
  </div>
  <div class="block">
    <div>缩 放</div>
    <div class="grid" style="grid-template-areas:'a b c' 'd e f'; place-items: center center;">
      <div style="grid-area: a;">水平</div>
      <div style="grid-area: d;">竖直</div>
      <el-button class="textbtn" type="text" style="grid-area: b;" icon="el-icon-minus" @click="action('horizonal_minus')"/>
      <el-button class="textbtn" type="text" style="grid-area: c;" icon="el-icon-plus" @click="action('horizonal_add')"/>
      <el-button class="textbtn" type="text" style="grid-area: e;" icon="el-icon-minus" @click="action('vertical_minus')"/>
      <el-button class="textbtn" type="text" style="grid-area: f;" icon="el-icon-plus" @click="action('vertical_add')"/>
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
const scaleStep = Math.pow(2, 0.1)
const posStep = 1

const actions = {
  right: selected => selected.transform.affine_transform[0] -= posStep,
  left: selected => selected.transform.affine_transform[0] += posStep,
  up: selected => selected.transform.affine_transform[1] -= posStep,
  down: selected => selected.transform.affine_transform[1] += posStep,
  horizonal_add: selected => selected.transform.affine_transform[2] *= scaleStep,
  horizonal_minus: selected => selected.transform.affine_transform[2] /= scaleStep,
  vertical_add: selected => selected.transform.affine_transform[3] *= scaleStep,
  vertical_minus: selected => selected.transform.affine_transform[3] /= scaleStep,
}

export default {
  data(){return {
    group: null,
  }},
  props:['selected'],
  // components:{...THREE},
  methods:{
    action(key){
      actions[key](this.selected)
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

<style scoped="three-editor" lang="scss">
.el-button {
  color: #AAA;
  & :hover{
    color: yellow;
  }
}
.block{
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background: rgba(51,51,51,0.8);
  padding: 5px;
  display: grid; grid-gap: 5px;
  grid-template-rows: 16px 1fr;
  width:100%;
}
.textbtn{
  padding: 0;
  margin: 0;
}
</style>

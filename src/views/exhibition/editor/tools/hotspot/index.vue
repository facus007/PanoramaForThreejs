<template>
  <div class="home noevent" style="display: flex; align-items: center; padding: 10px;">
    <div style="color: white; font-size: 14px; font-weight: bold; height: 70%; width: 130px;
      display: grid; grid-gap: 2px;
      grid-template-rows: 26px 1fr 1fr 26px;
      " class="event">
      <div class="block">细节调整</div>
      <div class="block">
        <div>平 移</div>
        <div style="display: grid; grid-template-areas:'. . a . .' '. . b . .' 'c d . e f' '. . g . .' '. . h . .'; place-items: center center;">
          <div style="grid-area: a;">上</div>
          <el-button type="text" style="grid-area: b; padding: 0;margin: 0;" icon="el-icon-arrow-up"/>
          <div style="grid-area: c;">左</div>
          <el-button type="text" style="grid-area: d; padding: 0;margin: 0;" icon="el-icon-arrow-left"/>
          <el-button type="text" style="grid-area: e; padding: 0;margin: 0;" icon="el-icon-arrow-right"/>
          <div style="grid-area: f;">右</div>
          <el-button type="text" style="grid-area: g; padding: 0;margin: 0;" icon="el-icon-arrow-down"/>
          <div style="grid-area: h;">下</div>
        </div>
      </div>
      <div class="block">
        <div>缩 放</div>
        <div style="display: grid; grid-template-areas:'a b c' 'd e f'; place-items: center center;">
          <div style="grid-area: a;">水平</div>
          <el-button type="text" style="grid-area: b; padding: 0;margin: 0;" icon="el-icon-minus"/>
          <el-button type="text" style="grid-area: c; padding: 0;margin: 0;" icon="el-icon-plus"/>
          <div style="grid-area: d;">竖直</div>
          <el-button type="text" style="grid-area: e; padding: 0;margin: 0;" icon="el-icon-minus"/>
          <el-button type="text" style="grid-area: f; padding: 0;margin: 0;" icon="el-icon-plus"/>
        </div>
      </div>
      <div class="block">
        <el-button type="text" style="color: white; padding: 0; border: 0;">重置</el-button>
      </div>
    </div>
    <prebuild :template="curedit.template" v-model="meshes">
      <builded-mesh v-for="item, index in meshes" :mesh="item" url="/static/monotex.png" :key="index"/>
    </prebuild>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'

export default {
  data(){return {
    meshes: [],
  }},
  components:{...THREE},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
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

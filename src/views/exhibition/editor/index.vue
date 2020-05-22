<template>
  <grid :grid="grid" v-loading="!sideImgs" style="grid-template-columns: 1fr 300px; grid-template-rows: 40px 1fr 150px;">
    <div class="shadow" style="background: #304156; grid-area: t; display:flex; padding: 0 20px; align-items: center;">
      <el-checkbox v-model="autosave"><span style="color: white;">自动保存</span></el-checkbox>
      <el-button type="text" icon="el-icon-edit" style="padding: 0; margin-left: auto; color: white; font-size:20px;"/>
    </div>
    <div class="home shadow" style="background: #304156; grid-area: a; padding: 10px; position: relative;">
      <THREE class="shadow" style="background:black; position: relative;" :isDebug="isDebug" :loadsource="loadsource" ref="three-window">
        <stats v-if="isDebug"/>
        <orbit-controls style="z-index: 1"/>
        <WebGLRenderer :option="{alpha: true, antialias:true}" ref="renderer">
          <panorama v-if="sideImgs" :sideImgs="sideImgs"/>
        </WebGLRenderer>
        <transition name="el-fade-in">
          <component :is="curFeature && features[curFeature].tools" style="z-index: 2" :renderer="$refs.renderer"/>
        </transition>
      </THREE>
    </div>
    <div class="shadow" style="background: #304156; grid-area: b;">
      <sidepanel v-model="curFeature" v-if="$refs['three-window']">
        <el-tab-pane v-for="feature in features" :label="feature.name" :key="feature.name">
          <component :is="feature.sidepanel" :sideImgs="sideImgs"/>
        </el-tab-pane>
      </sidepanel>
    </div>
    <div class="shadow" style="background: #304156; grid-area: c;">
      <div v-if="$refs['three-window']"/>
    </div>
  </grid>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as sidepanel from './sidepanel'
import * as THREE from '@/components/THREE'
import store from './store'

import path from 'path'
import preprocessing from '@/utils/preprocessing'
const monoTexPath = path.join(__dirname,'../static/monotex.png')

const datalist = [0,1,2,3,4,5,6,7,8,9]
const grid = "'a t' 'a b' 'c b'"

const moduleName = "editor"
var features = [{
    name: "基础",
    sidepanel: "standard",
  },{
    name: "视角",
    sidepanel: "viewspot",
    tools: "view-tools"
  }, {
    name: "热点",
    sidepanel: "hotspot",
  }, {
    name: "沙盘",
    sidepanel: "sandbox",
  }, {
    name: "音乐",
    sidepanel: "music",
  }, {
    name: "嵌入",
    sidepanel: "embedded",
  },
]

export default {
  mixins:[mixin],
  components:{...THREE, ...sidepanel},
  data(){ return {
    isDebug: process.env.NODE_ENV === "development",
    total: 100,
    pageSize: 10,
    currentPage: 1,
    datalist,
    sideImgs: null,
    features,
    curFeature: null,
    autosave: false,
  }},
  computed:{
    grid:() => grid,
    loadsource(){
      preprocessing(monoTexPath).then((result)=>{
        if(this) {
          this.sideImgs = result
        }
      })
    },
  },
  methods:{},
  created(){
    this.$store.registerModule(moduleName, store)
  },
  mounted(){},
  beforeDestroy(){},
  destroyed(){
    this.$store.unregisterModule(moduleName)
  }
}
</script>

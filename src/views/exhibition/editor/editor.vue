<template>
  <grid :grid="grid" style="grid-template-columns: 1fr 350px; grid-template-rows: 40px 1fr 100px; 40px">
    <div class="home shadow" style="background: #304156; grid-area: a; padding: 10px; position: relative;">
      <THREE class="shadow" style="position: relative;" :isDebug="isDebug">
        <stats v-if="isDebug"/>
        <WebGLRenderer>
          <CSS3DRenderer>
            <orbit-controls ref="controls" :start_rotation="curedit.start_rotation"/>
          </CSS3DRenderer>
        </WebGLRenderer>
        <panorama v-if="sideImgs" :sideImgs="sideImgs" :key="'scene'+curedit.scene_id"/>
        <component :is="curFeature && features[curFeature].tools" style="z-index: 2" :renderer="$refs.renderer" :controls="$refs.controls" ref="tools" :key="curedit.scene_id"/>
      </THREE>
    </div>
    <div class="shadow" style="background: #304156; grid-area: b;">
      <sidepanel v-model="curFeature" :key="curedit.scene_id">
        <el-tab-pane v-for="(feature, index) in features" :label="feature.name" :key="feature.name">
          <component v-if="feature.name === features[curFeature].name" :is="features[index].sidepanel" :sideImgs="sideImgs" :editor="self"/>
        </el-tab-pane>
      </sidepanel>
    </div>
    <div class="shadow" style="background: #304156; grid-area: c;">
      <scenetab/>
    </div>
    <div class="shadow" style="background: #304156; grid-area: t;">
      <autosave/>
    </div>
    <div class="shadow" style="background: #304156; grid-area: d;">
      <autofill/>
    </div>
    <div class="shadow" style="background: #304156; grid-area: e;">
      <exhibitionEntrance @openExhibitionBox="openExhibitionBox" ref="exhibitionEntrance"/>
      <el-dialog title="" :visible.sync="exhibitionBoxVisible" :fullscreen="true" destroy-on-close>
          <exhibitionBox @exhibitionFinished="exhibitionFinished"/>
      </el-dialog>
    </div>
  </grid>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as sidepanel from './sidepanel'
import * as scenetab from './scenetab'
import * as THREE from '@/components/THREE'
import * as Tools from './tools'
import autosave from './autosave'
import autofill from './autofill'
import exhibitionBox from './exhibitionBox/exhibitionBox'
import exhibitionEntrance from './exhibitionEntrance'


const grid = "'a t' 'a b' 'c b' 'c d' 'c e'"
const moduleName = "editor"

const features = [
  {name: "基础", sidepanel: "standard", },
  {name: "视角", sidepanel: "viewspot", tools: "viewspot-tools"},
  {name: "广告位热点", sidepanel: "adspot", tools: 'adspot-tools'},
  {name: "产品位热点", sidepanel: "productspot", tools: 'productspot-tools'},
  {name: "自定义热点", sidepanel: "hotspot", tools: 'hotspot-tools'},
  // {name: "音乐", sidepanel: "music", },
]

export default {
  mixins:[mixin],
  components:{...THREE, ...sidepanel, ...scenetab, ...Tools, autosave, autofill, exhibitionBox, exhibitionEntrance},
  data(){
    return {
    curFeature: 0,
    self: this,
      exhibitionBoxVisible: false
  }},
  computed:{
    isDebug: () => process.env.NODE_ENV === "development",
    features: () => features,
    grid:() => grid,
    sideImgs() {
      return this.curedit && [
        this.curedit.pano_graphic_url1,
        this.curedit.pano_graphic_url2,
        this.curedit.pano_graphic_url3,
        this.curedit.pano_graphic_url4,
        this.curedit.pano_graphic_url5,
        this.curedit.pano_graphic_url6
      ]
    },
    ...mapState(moduleName, ['product', 'setting', 'curedit']),
  },
  methods:{
    openExhibitionBox(val){
      this.exhibitionBoxVisible = true
    },
    exhibitionFinished(batchNo){
      this.exhibitionBoxVisible = false
      this.$refs.exhibitionEntrance.fill(batchNo)
    }
  },
  mounted(){},
  beforeDestroy(){},
}
</script>

  <style scoped>
    .el-dialog__body{height: 50vh;overflow: auto;}
  </style>

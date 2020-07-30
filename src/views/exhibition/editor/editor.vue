<template>
  <div class="absolute grid" :style="layoutStyle">
    <div class="absolute block" style="grid-area: a; padding: 10px">
      <THREE style="position: relative;">
        <WebGLRenderer>
          <CSS3DRenderer>
            <orbit-controls ref="controls" :start_rotation="curedit.start_rotation"/>
          </CSS3DRenderer>
        </WebGLRenderer>
        <panorama v-if="sideImgs" :sideImgs="sideImgs" :key="'scene'+curedit.scene_id"/>
        <component :is="curFeature && features[curFeature].tools" style="z-index: 1" :renderer="$refs.renderer" :controls="$refs.controls" :tag="tag" ref="tools" :key="curedit.scene_id" :editor="self"/>
      </THREE>
    </div>
    <div class="block" style="grid-area: b;">
      <sidepanel v-model="curFeature">
        <el-tab-pane v-for="(feature, index) in features" :label="feature.name" :key="feature.name">
          <component v-if="feature.name === features[curFeature].name" :is="features[index].sidepanel" :sideImgs="sideImgs" :editor="self" ref="panel" :key="curedit.scene_id"/>
        </el-tab-pane>
      </sidepanel>
    </div>
    <div class="block" style="grid-area: c;">
      <scenetab/>
    </div>
    <div class="block" style="grid-area: t;">
      <autosave/>
    </div>
    <div v-if="features[curFeature].showtools" class="block centering" style="grid-area: e;">
      <exhibitionEntrance @openExhibitionBox="openExhibitionBox" ref="exhibitionEntrance" style="height:40px;"/>
      <el-dialog title="" :visible.sync="exhibitionBoxVisible" :fullscreen="true" destroy-on-close>
        <exhibitionBox @exhibitionFinished="exhibitionFinished" :max_hotspot_num="product.max_hotspot_num"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as sidepanel from './sidepanel'
import * as scenetab from './scenetab'
import * as THREE from '@/components/THREE'
import * as Tools from './tools'
import autosave from './autosave'
import exhibitionBox from './exhibitionBox/exhibitionBox'
import exhibitionEntrance from './exhibitionEntrance'

const gridtools = "'a t' 'a b' 'a b' 'c b' 'c e'"
const grid = "'a t' 'a b' 'a b' 'c b' 'c b'"

const features = [
  {name: "基础", sidepanel: "standard", showtools: false},
  {name: "扩展", sidepanel: "advanced", tools: "advanced-tools", showtools: false},
  {name: "视角", sidepanel: "viewspot", tools: "viewspot-tools", showtools: false},
  {name: "广告位热点", sidepanel: "adspot", tools: 'spots-tools', showtools: false, tag: 'ad'},
  {name: "产品位热点", sidepanel: "productspot", tools: 'spots-tools', showtools: true, tag: 'prod'},
  {name: "自定义热点", sidepanel: "hotspot", tools: 'spots-tools', showtools: false, tag:'custom'},
]

export default {
  components:{...THREE, ...sidepanel, ...scenetab, ...Tools, autosave, exhibitionBox, exhibitionEntrance},
  data(){
    return {
    curFeature: 0,
    self: this,
    exhibitionBoxVisible: false,
    selected_ids: null,
    grid, gridtools, features,
  }},
  computed:{
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
    layoutStyle(){ return {
        'grid-template-areas': features[this.curFeature].showtools ? gridtools : grid,
        'grid-template-columns': '1fr 350px',
        'grid-template-rows': '40px 1fr 100px 70px 70px'
      }
    },
    tag(){
      return features[this.curFeature].tag
    },
    ...mapState('editor', ['product', 'setting', 'curedit']),
  },
  methods:{
    openExhibitionBox(val){
      this.exhibitionBoxVisible = true
    },
    exhibitionFinished(batchNo){
      this.exhibitionBoxVisible = false
      this.$refs.exhibitionEntrance.fill(batchNo)
    },
  },
  mounted(){},
  beforeDestroy(){},
}
</script>

<style scoped>
.block {
  background: #304156;
  box-shadow: 0 0 10px 0px;
}
</style>

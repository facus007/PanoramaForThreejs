<template>
  <THREE style="position: absolute; width: 100%; height: 100%;"  v-loading="loading" :isDebug="true">
    <WebGLRenderer v-if="loaded" :option="{antialias: true, alpha: true}">
      <CSS3DRenderer>
        <camera-animation v-model="afterloaded" :fov="curScene.fov" :start_rotation="curScene.start_rotation"/>
        <orbit-controls v-if="afterloaded" style="pointer-events:auto" ref="controls" :auto_rotate="true" :start_rotation="curScene.start_rotation"/>
      </CSS3DRenderer>
    </WebGLRenderer>
    <panorama v-if="sideImgs" :sideBlurImgs="sideBlurImgs" :sideImgs="sideImgs" @onload="onload" ref="panorama"/>
    <transition name="el-fade-in">
      <preview v-if="!loading && afterloaded" :curScene="curScene" v-model="curSceneId"/>
    </transition>
    <backgroundmusic v-if="product" :product="product" style="position: absolute; top: 0; right: 0; padding:10px; z-index:1"/>
  </THREE>
</template>

<script>
import { mapState } from 'vuex'
import preview from './preview'
import backgroundmusic from './backgroundmusic'
import CameraAnimation from './cameraanimation'
import {getProduct} from '@/utils/server'
import * as THREE from '@/components/THREE'
import * as three from 'three'

const sides = [
  {
    position: [ 0, 0, - 1 ],
    rotation: [ 0, 0, 0 ]
  },
  {
    position: [ 1, 0, 0 ],
    rotation: [ 0, - Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 0, 1 ],
    rotation: [ 0, Math.PI, 0 ]
  },
  {
    position: [ - 1, 0, 0 ],
    rotation: [ 0, Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 1, 0 ],
    rotation: [ Math.PI / 2, 0, Math.PI ]
  },
  {
    position: [ 0, - 1, 0 ],
    rotation: [ - Math.PI / 2, 0, Math.PI ]
  },
];

export default {
  components:{...THREE, preview, backgroundmusic, CameraAnimation},
  data(){return {
    product: null,
    scenes: {},
    curSceneId: 0,
    loading: true,
    loaded: false,
    afterloaded: false,
  }},
  watch:{
    afterloaded(next){
      if(next){
        this.$refs.panorama.$refs.panel.forEach((item, i) => {
          item.obj.geometry.dispose()
          item.obj.geometry = new three.PlaneGeometry(1, 1)
          item.obj.position = new three.Vector3(sides[i].position[0]* 500,sides[i].position[1]* 500,sides[i].position[2]* 500)
        });
      }
    },
  },
  methods:{
    async init(){
      this.loading = true
      this.product = await getProduct(this.$route.query.product_id, true)
      document.title = this.product.name
      this.product.scenes.forEach((item, i) => {
        this.scenes[item.scene_id] = item
      });
      this.curSceneId = this.$route.query.scene_id || this.product.scenes[0].scene_id
      this.loading = false
    },
    onload(){
      this.loaded = true
      this.loading = false
    },
  },
  mounted(){},
  beforeDestroy(){},
  created(){
    document.title = ''
    if(this.$route.query.product_id){
      this.init()
    }
  },
  destroyed(){},
  computed:{
    curScene(){
      return this.scenes[this.curSceneId]
    },
    sideBlurImgs() {
      return this.curScene && [
        this.curScene.pano_graphic_blur_url1,
        this.curScene.pano_graphic_blur_url2,
        this.curScene.pano_graphic_blur_url3,
        this.curScene.pano_graphic_blur_url4,
        this.curScene.pano_graphic_blur_url5,
        this.curScene.pano_graphic_blur_url6,
      ]
    },
    sideImgs() {
      return this.curScene && [
        this.curScene.pano_graphic_url1,
        this.curScene.pano_graphic_url2,
        this.curScene.pano_graphic_url3,
        this.curScene.pano_graphic_url4,
        this.curScene.pano_graphic_url5,
        this.curScene.pano_graphic_url6
      ]
    },
  },
}
</script>
<style scoped>
</style>

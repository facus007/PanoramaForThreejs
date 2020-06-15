<template>
  <THREE style="position: absolute; width: 100%; height: 100%;" :isDebug="true">
    <WebGLRenderer v-if="loaded" :option="{antialias: true, alpha: true}" ref="renderer">
      <camera-animation v-model="afterloaded" :fov="curScene.fov" :start_rotation="curScene.start_rotation"/>
    </WebGLRenderer>
    <CSS3DRenderer v-if="loaded" :style="{'z-index': '1', visibility: afterloaded ? 'visible' : 'hidden'}">
      <orbit-controls v-if="afterloaded && !loading" style="pointer-events:auto"  ref="controls" :auto_rotate="true" :start_rotation="cookies && start_rotation ||curScene.start_rotation"/>
    </CSS3DRenderer>
    <panorama v-if="sideImgs" :sideImgs="sideImgs" @onload="onload" ref="panorama"/>
    <transition name="el-fade-in">
      <preview v-if="!loading" :curScene="curScene" v-model="curSceneId" :key="curSceneId" @action="action" />
    </transition>
    <backgroundmusic v-if="product&&product.music_url" :product="product" style="position: absolute; top: 0; right: 0; padding:10px; z-index:2"/>
    <div v-if="loading" style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
      <i v-if="loaded" style="font-size: 50px; color: gray; text-shadow: 0 0 5px;" class="el-icon-loading"/>
    </div>
  </THREE>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
import preview from './preview'
import backgroundmusic from './backgroundmusic'
import CameraAnimation from './cameraanimation'
import {getProduct} from '@/utils/server'
import * as THREE from '@/components/THREE'
import * as three from 'three'
const texloader = new three.TextureLoader()

async function loadtex(url){
  return new Promise(function(resolve, reject) {
    texloader.load(url,resolve)
  });
}

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
  components:{...THREE, preview, backgroundmusic, CameraAnimation },
  data(){return {
    product: null,
    scenes: {},
    curSceneId: 0,
    loading: true,
    loaded: false,
    afterloaded: false,
    textures:{},
  }},
  watch:{
    afterloaded(next){
      if(next){
        this.$refs.panorama.$refs.panel.forEach((item, i) => {
          item.obj && item.obj.geometry && item.obj.geometry.dispose()
          item.obj && (item.obj.geometry = new three.PlaneGeometry(1, 1))
          item.obj && (item.obj.position = new three.Vector3(sides[i].position[0]* 500,sides[i].position[1]* 500,sides[i].position[2]* 500))
        });
        this.product.scenes.forEach(async(item, i) => {
          this.textures[item.scene_id] = {}
        })
        this.product.scenes.forEach(async(item, i) => {
          this.textures[item.scene_id].blur = []
          for (var i = 1; i <= 6; i++) {
            let url = item['pano_graphic_blur_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
            this.textures[item.scene_id].blur.push(await loadtex(url))
          }
        });
        this.product.scenes.forEach(async(item, i) => {
          this.textures[item.scene_id].clear = []
          for (var i = 1; i <= 6; i++) {
            let url = item['pano_graphic_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
            this.textures[item.scene_id].clear.push(await loadtex(url))
          }
        });
      }
    },
    async curSceneId(next){
      if(!this.afterloaded){return}
      this.loading = true
      let texs = []
      for (var i = 1; i <= 6; i++) {
        let url = this.curScene['pano_graphic_blur_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
        texs.push(await loadtex(url))
      }
      if(!(this.textures[next] && this.textures[next].clear.length === 6)){
        for (var i = 0; i < 6; i++) {
          this.$refs.panorama.$refs.mats[i].obj.map = texs[i]
          this.$refs.panorama.$refs.texs[i].obj.dispose()
          this.$refs.panorama.$refs.texs[i].obj = texs[i]
        }
      }
      this.loading = false
      texs = []
      for (var i = 1; i <= 6; i++) {
        let url = this.curScene['pano_graphic_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
        texs.push(await loadtex(url))
        this.$refs.panorama.$refs.mats[i-1].obj.map = texs[i-1]
        this.$refs.panorama.$refs.texs[i-1].obj.dispose()
        this.$refs.panorama.$refs.texs[i-1].obj = texs[i-1]
      }
    }
  },
  methods:{
    async init(){
      this.loading = true
      if(!this.product){
        this.product = await getProduct(this.$route.query.product_id, true)
        this.product.scenes.forEach((item, i) => {
          this.scenes[item.scene_id] = item
        });
        this.curSceneId = this.cookies && this.cookies.curSceneId || this.product.scenes[0].scene_id
      }
      document.title = this.product.name
    },
    onload(){
      this.loaded = true
      this.loading = false
      this.afterloaded = this.afterloaded || this.cookies
      this.$emit('input', false)
    },
    action(){
      Cookies.set('vrpreivew' + this.$route.query.product_id, {sceneId: this.$data.curSceneId, start_rotation: [this.$refs.controls.obj.getAzimuthalAngle(), this.$refs.controls.obj.getPolarAngle()]})
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
    cookies(){
      return Cookies.get('vrpreivew' + this.$route.query.product_id) && JSON.parse(Cookies.get('vrpreivew' + this.$route.query.product_id))
    },
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
        this.curScene.pano_graphic_url6,
      ]
    },
    start_rotation(){
      return this.cookies && this.cookies.start_rotation
    }
  },
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all;
  transition-duration: 0.5s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(1.3);
  opacity: 0;
}
</style>

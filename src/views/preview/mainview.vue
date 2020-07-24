<template>
    <THREE v-if="first_loaded" style="position: absolute; width: 100%; height: 100%;" :isDebug="true">
      <stats v-if="isDebug" style="visibility:visible"/>
      <WebGLRenderer :option="{antialias: true}"/>
      <CSS3DRenderer :style="{visibility: after_animation_loaded ? 'visible' : 'hidden','z-index': '1'}">
        <orbit-controls v-model="curRotation" v-if="after_animation_loaded && !loading" style="pointer-events:auto" :auto_rotate="true" :start_rotation="start_rotation || curScene.start_rotation" :key="curScene.scene_id"/>
        <advanced v-if="first_loaded && !loading" style="position: absolute; width: 100%; height: 100%; z-index: 1000;"/>
      </CSS3DRenderer>

      <animated-panorama :curScene="curScene" :textures="textures" ref="panorama"/>
      <camera-animation v-if="!after_animation_loaded && !loading" :fov="curScene.fov" :start_rotation="curScene.start_rotation" :product="product"/>
      <preview v-if="curScene && !loading" :curScene="curScene" :key="curSceneId" :visible="after_animation_loaded" style="visibility: hidden"/>

      <div v-if="loading" style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
        <i v-if="first_loaded" style="font-size: 20px; color: white; text-shadow: 0 0 5px;" class="el-icon-loading"/>
      </div>
    </THREE>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
import Preview from './preview'
import CameraAnimation from './cameraanimation'
import Advanced from './advanced'
import * as THREE from '@/components/THREE'

document.title = ''
const isDebug = process.env.NODE_ENV === "development"

export default {
  components:{...THREE, Preview, CameraAnimation, Advanced},
  props:['getProduct','static'],
  watch:{
    async after_animation_loaded(next){
      if(next){
        await new Promise((resolve, reject) => {
          let a = ()=>{
            if(this.$refs.panorama){resolve()}
            else{requestAnimationFrame(a)}
          }
          a()
        });
        this.$refs.panorama.afterloaded()
      }
    },
    async curSceneId(next){
      if(!this.after_animation_loaded){return}
      this.$store.commit('preview/loading/SET_LOADING', true)
      await this.$store.dispatch('preview/texture/load', {scene: this.curScene})
      await this.$refs.panorama.switchscene()
      this.$store.commit('preview/loading/SET_LOADING', false)
    },
  },
  methods:{
    async init(){
      await this.$store.dispatch('preview/init',{getProduct:this.getProduct})
      await this.$store.dispatch('preview/texture/load', {scene:this.curScene})
      this.$store.commit('preview/loading/SET_FIRST_LOADED', true)
    },
    async deinit(){
      this.$store.commit('preview/loading/SET_FIRST_LOADED', false)
      this.$store.dispatch('preview/texture/unload')
      this.$store.dispatch('preview/deinit')
    },
  },
  mounted(){ this.init(); },
  beforeDestroy(){ this.deinit(); },
  computed:{
    ...mapState('preview', ['product', 'scenes', 'curSceneId', 'cookies']),
    ...mapState('preview/texture', ['textures']),
    ...mapState('preview/loading',['first_loaded', 'after_animation_loaded', 'loading']),
    ...mapState('preview/audio',['isMusicPlaying']),
    start_rotation(){
      (()=>{})(this.curSceneId) // watch
      return this.cookies && this.cookies.start_rotation
    },
    curScene(){ return this.scenes[this.curSceneId] },
    isDebug: () => isDebug,
    curRotation:{
      get (){
        return this.$store.state.preview.curRotation
      },
      set (value) {
        this.$store.commit('preview/SET_CURROTATION', value)
      }
    }
  },
}
</script>

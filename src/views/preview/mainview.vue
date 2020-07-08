<template>
  <THREE style="position: absolute; width: 100%; height: 100%;" :isDebug="true">
    <stats v-if="isDebug"/>
    <WebGLRenderer v-if="first_loaded" :option="{antialias: true, alpha: true}"/>
    <CSS3DRenderer v-if="first_loaded" :style="{visibility: after_animation_loaded ? 'visible' : 'hidden'}">
      <orbit-controls @onchange="playmusic" v-if="after_animation_loaded && !loading" style="pointer-events:auto" ref="controls" :auto_rotate="true" :start_rotation="start_rotation || curScene.start_rotation" :key="curScene.scene_id"/>
    </CSS3DRenderer>

    <animated-panorama v-if="first_loaded" :curScene="curScene" :textures="textures" ref="panorama"/>

    <preview v-if="curScene && !loading" :curScene="curScene" v-model="curSceneId" :key="curSceneId" @action="action" :visible="after_animation_loaded" :product="product" style="visibility: hidden" @videoPlay="$refs.bgm.stop()" @videoStop="()=>isMusicPlaying && $refs.bgm.play()"/>

    <camera-animation v-if="first_loaded && !after_animation_loaded && !loading" v-model="after_animation_loaded" :fov="curScene.fov" :start_rotation="curScene.start_rotation" :product="product"/>

    <texture-loader v-model="textures" ref="textureloader"/>

    <Advanced  v-if="after_animation_loaded && product && product.music_url" style="position: absolute; top: 0; right: 0; z-index:2;"/>
    <!-- <backgroundmusic v-model="isMusicPlaying" ref="bgm" v-if="after_animation_loaded && product && product.music_url" :product="product" style="position: absolute; top: 0; right: 0; padding:10px; z-index:2"/> -->
    <div v-if="loading" style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
      <i v-if="first_loaded" style="font-size: 20px; color: white; text-shadow: 0 0 5px;" class="el-icon-loading"/>
    </div>
  </THREE>
</template>

<script>
import { mapState } from 'vuex'
import { getProduct } from '@/utils/server'
import Cookies from 'js-cookie'
import Preview from './preview'
import backgroundmusic from './backgroundmusic'
import CameraAnimation from './cameraanimation'
import TextureLoader from './textureloader'
import Advanced from './advanced'
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

var interact = false

export default {
  components:{...THREE, Preview, backgroundmusic, CameraAnimation, TextureLoader, Advanced},
  data(){return {
    product: null,
    scenes: {},
    curSceneId: 0,
    loading: false,
    first_loaded: false,
    after_animation_loaded: false,
    textures:{},
    isMusicPlaying: true,
  }},
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
      this.loading = true
      await new Promise((resolve, reject) => {
        this.$refs.textureloader.load(this.curScene, null, resolve)
      });
      await this.$refs.panorama.switchscene()
      this.loading = false
    },
  },
  methods:{
    async init(){
      this.loading = true
      let product = await getProduct(this.$route.query.product_id, true)
      product.scenes.forEach(item => { this.scenes[item.scene_id] = item });
      this.curSceneId = this.cookies && this.cookies.scene_id || product.scenes[0].scene_id
      document.title = product.name
      this.product = product
      this.$nextTick(async()=>{
        await new Promise((resolve, reject) => {
          this.$refs.textureloader.load(this.curScene, null, resolve)
        });
        this.first_loaded = true
        this.$nextTick(()=>{
          this.$emit('input', false)
          this.loading = false
        })
      })
    },
    action(){
      Cookies.set('vrpreivew' + this.$route.query.product_id, {scene_id: this.$data.curSceneId, start_rotation: [this.$refs.controls.obj.getAzimuthalAngle(), this.$refs.controls.obj.getPolarAngle()]})
    },
    async playmusic(){
      try{
        !interact && this.isMusicPlaying && await this.$refs.bgm.$refs.audio.play()
        interact = true
      }catch{}
    }
  },
  mounted(){},
  beforeDestroy(){},
  created(){
    document.title = ''
    if(this.$route.query.product_id){this.init()}
  },
  destroyed(){},
  computed:{
    cookies(){
      return Cookies.get('vrpreivew' + this.$route.query.product_id) && JSON.parse(Cookies.get('vrpreivew' + this.$route.query.product_id))
    },
    curScene(){
      return this.scenes[this.curSceneId]
    },
    start_rotation(){
      let cookies = Cookies.get('vrpreivew' + this.$route.query.product_id) && JSON.parse(Cookies.get('vrpreivew' + this.$route.query.product_id))
      Cookies.remove('vrpreivew' + this.$route.query.product_id);
      (()=>{})(this.curSceneId) // watch
      return cookies && cookies.start_rotation
    },
    isDebug: () => process.env.NODE_ENV === "development",
  },
}
</script>
<style scoped>
</style>

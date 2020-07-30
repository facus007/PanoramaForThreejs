<template>
  <div class="home" :debug="debug">
    <stats v-if="isDebug"/>
    <slot></slot>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import stats from './base/stats'
import THREEComponent from '@/components/THREE/base/threecomponent'
import store from './store'
const isDebug = process.env.NODE_ENV === "development"

export default {
  data(){return {isDebug}},
  components:{stats},
  mixins:[THREEComponent],
  computed:{
    debug(){
      window.scene = isDebug && this.scene
      window.THREE = isDebug && THREE
    },
  },
  created(){
    this.$store.registerModule('THREE', store)
    this.$store.dispatch('THREE/start')
  },
  mounted(){
    this.$store.commit('THREE/SET_DOMELEMENT', this.$el)
    window.addEventListener('resize', this.resize);
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    window.removeEventListener('resize', this.resize);
    this.$store.commit('THREE/SET_DOMELEMENT', null)
  },
  destroyed(){
    this.$store.dispatch('THREE/stop')
    this.$store.unregisterModule('THREE')
  },
  methods:{
    async resize(){
      requestAnimationFrame(()=>{
        let aspect = this.domElement.clientWidth / this.domElement.clientHeight;
        if(this.camera.aspect !== aspect){
          this.camera.aspect = aspect
          this.camera.updateProjectionMatrix();
          this.$store.dispatch('THREE/render')
        }
      })
    },
    rendering(){
      this.$store.dispatch('THREE/render');
      this.frame = requestAnimationFrame(this.rendering)
    },
    startRendering(){
      this.camera.aspect = this.domElement.clientWidth / this.domElement.clientHeight;
      this.camera.updateProjectionMatrix();
      this.frame = requestAnimationFrame(this.rendering)
    },
    stopRendering(){
      cancelAnimationFrame(this.frame)
    },
  }
}
</script>

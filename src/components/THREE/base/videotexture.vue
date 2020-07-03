<template>
  <video loop webkit-playsinline playsinline x5-playsinline x5-video-player-type="h5" style="display:none" ref='video' muted/>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import VideoUtils from '@/utils/video'

export default {
  mixins: [THREEComponent],
  props: ['url', 'onLoad', 'onProgress', 'onError', 'rotation', 'center ', 'offset', 'repeat', 'flipY ', 'value'],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // },
    '$parent.obj'(next, pre){
      pre && pre.map === this.obj && (pre.map = null);
      next && (next instanceof THREE.Material) && (next.map = this.obj);
    }
  },
  methods:{
    // update(){}
    // propCompute(){},
  },
  mounted(){
    this.obj = new THREE.VideoTexture(this.$el)
    this.$el.addEventListener("resize", ev => {
      let w = this.$el.videoWidth;
      let h = this.$el.videoHeight;
      if (w && h) {
        this.$emit('input', {w, h})
      }
    }, false);
    new VideoUtils(this.$el, this.src)
  },
  beforeDestroy(){
    this.obj && this.obj.dispose()
  },
  computed:{
    src(){
      return this.url.replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
    },
  }
}
</script>

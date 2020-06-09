<template>
  <video loop autoplay webkit-playsinline playsinline muted :src="src" style="display:none"/>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

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
    this.$el.play()
    this.$el.addEventListener("resize", ev => {
      let w = this.$el.videoWidth;
      let h = this.$el.videoHeight;
      if (w && h) {
        this.$emit('input', {w, h})
      }
    }, false);
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

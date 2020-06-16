<template>
  <video loop x5-playsinline x5-video-player-type="h5" style="display:none" ref='video' muted/>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
// import MP4Box from 'mp4box'
// import {PostbirdMp4ToBlob} from '@/utils/video'

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
    // var mp4boxfile = MP4Box.createFile();
    // mp4boxfile.onReady = (info)=>{
    //   console.log(info)
    //   // var url = this.src
    //   // var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    //   // PostbirdMp4ToBlob.init(this.$refs.video, url, mimeCodec)
    // }
    // mp4boxfile.onError = function (e) {
    //            console.log("mp4box failed to parse data.",e);
    //        };
    // const range = 'bytes=0-50000';
    // fetch(this.src, {headers: {range,}}).then((res)=>res.arrayBuffer()).then((arrayBuffer)=>{
    //   arrayBuffer.fileStart = 0;
    //   mp4boxfile.appendBuffer(arrayBuffer);
    // })

    this.obj = new THREE.VideoTexture(this.$el)
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

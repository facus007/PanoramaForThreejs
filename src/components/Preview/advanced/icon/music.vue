<template>
  <div class="fill centering" style="color:white">
    <div @click="$store.commit('preview/audio/SET_NEEDPLAYING',!needPlaying)" >
      <div :class="needPlaying ? 'icon icon-music' : 'icon icon-music-mute'"/>
      <audio class="audio-player" :loop="item.loop" :src="item.url" preload="metadata" ref="audio"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default{
  props:['item'],
  data(){return{}},
  watch:{
    isPlaying(next){
      next && this.play() || this.pause()
    }
  },
  methods:{
    async play(){
      try {
        if(this.isPlaying){
          await this.$refs.audio.play()
          window.removeEventListener('mousedown',this.play)
          window.removeEventListener('touchstart',this.play)
        }else{
          await this.$refs.audio.pause()
        }
      }catch(e){}
    },
    async pause(){
      await this.$refs.audio.pause()
    }
  },
  computed:{
    ...mapState('preview/audio',['canMusicPlay','needPlaying']),
    isPlaying(){
      return this.needPlaying && this.canMusicPlay
    }
  },
  mounted(){this.play()},
  beforeDestroy(){ this.stop = true},
  created(){
    window.addEventListener('mousedown',this.play)
    window.addEventListener('touchstart',this.play)
  },
  destroyed(){
    window.removeEventListener('mousedown',this.play)
    window.removeEventListener('touchstart',this.play)
  }

}
</script>

<style scoped>
.icon {
    width: 25px;
    height: 25px;
    background-image: url(../../../../assets/img/icon_maps.png);
    background-repeat: no-repeat;
    background-size: 155px 125px;
    cursor: pointer;
    pointer-events: auto;
}
.icon-music {
    background-position: -32.5px -97.5px;
}
.icon-music-mute{
    background-position: -97.5px -32.5px;
}
</style>

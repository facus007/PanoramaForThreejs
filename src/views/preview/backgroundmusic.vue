<template>
  <el-button type="text" @click="isPlaying=!isPlaying" >
    <div :class="isPlaying ? 'icon icon-music' : 'icon icon-music-mute'"/>
    <!-- <iframe v-if="isPlaying" :src='product.music_url' allow='autoplay' style="display:none"></iframe> -->
    <audio loop :src="product.music_url" ref="audio"/>
  </el-button>
</template>
<script>
export default{
  props:['product'],
  data(){return {isPlaying: true}},
  watch: {
    isPlaying(next){
      if(next){ this.$refs.audio.play()}
      else{this.$refs.audio.pause()}
    }
  },
  methods:{},
  computed:{},
  mounted(){}
}
</script>
<style scoped>
.icon {
    width: 25px;
    height: 25px;
    background-image: url(../../assets/img/icon_maps.png);
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

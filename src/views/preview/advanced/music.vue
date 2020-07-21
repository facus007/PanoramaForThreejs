<template>
  <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:white">
    <div @click="$emit('input',!value)" >
      <div :class="value ? 'icon icon-music' : 'icon icon-music-mute'"/>
      <audio class="audio-player" autoplay :loop="item.loop" :src="item.url" preload="metadata" ref="audio"/>
    </div>
  </div>
</template>

<script>
export default{
  props:['item', 'value'],
  watch: {
    value(next){
      if(next){ this.$refs.audio.play()}
      else{this.$refs.audio.pause()}
    }
  },
  methods:{
    play(){
      this.$refs.audio.play()
    },
    stop(){
      this.$refs.audio.pause()
    }
  },
  computed:{},
  mounted(){}
}
</script>

<style scoped>
.icon {
    width: 25px;
    height: 25px;
    background-image: url(../../../assets/img/icon_maps.png);
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

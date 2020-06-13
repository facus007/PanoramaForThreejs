<template>
  <div class="loading">
    <span class="progress">
      <progress :value="curProgress"  max="100"></progress>
      {{Math.floor(curProgress)}}%
    </span>
  </div>
</template>
<script>
var count = 1
export default {
  data(){return {
    curProgress: 0,
  }},
  props:['loading'],
  watch:{
    loading(){
      this.curProgress=100
    }
  },
  methods:{
    progress(){
      if(100 - this.curProgress > 0.0001){
        this.curProgress = (100 - this.curProgress) * 0.005 + this.curProgress
        requestAnimationFrame(this.progress)
      }
    }
  },
  mounted(){
    requestAnimationFrame(this.progress)
  },
  beforeDestroy(){}
}
</script>
<style scoped>
.loading{
  width: 200px;
  height: 200px;
  background-image: url(../../assets/img/loading_sprite.jpg);
  -webkit-animation:animation 1s steps(41) 0s infinite both;
  animation: animation 1s steps(41) 0s infinite both;
}

@-webkit-keyframes animation {
  to { background-position: -4100% 0}
}
.progress{
  bottom: 10vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  border: 0;
}
</style>

<template>
  <img :src="src" class="loading" :style="style"/>
</template>
<script>
var count = 1
export default {
  data(){return {
    style: {},
    src: null,
    curframe: 0,
    disposed: false,
  }},
  methods:{
    keyframe(){
      if(++count % 2 === 0){
        let str ='00000'+this.curframe;
        this.curframe = (this.curframe + 1) % 43
        let index = str.substring(str.length-5,str.length);
        let name = './static/loading-anime/png序列帧OK_'+index+'.png'
        this.src = name;
      }
      !this.disposed && requestAnimationFrame(this.keyframe)
      return name
    }
  },
  mounted(){
    requestAnimationFrame(this.keyframe)
  },
  beforeDestroy(){
    this.disposed = true
  }
}
</script>
<style scoped>
.loading{
  width: 200px;
  height: 200px;
}
</style>

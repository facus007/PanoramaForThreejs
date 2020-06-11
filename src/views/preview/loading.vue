<template>
  <div class="loading"/>
</template>
<script>
var count = 1
export default {
  data(){return {}},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>
<style scoped>
.loading{
  width: 200px;
  height: 200px;
  background-image: url(../../assets/img/loading_sprite.png);
  -webkit-animation:animation 1s steps(41) 0s infinite both;
  animation: animation 1s steps(41) 0s infinite both;
}

@-webkit-keyframes animation {
  to { background-position: -4100% 0}
}
</style>

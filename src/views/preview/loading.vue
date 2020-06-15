<template>
  <div class="loading">
      <!-- <progress :value="curProgress"  max="100"></progress> -->
      <div class="progress">
        <span class="blue" :style="{width: curProgress +'%'}"><span>{{Math.floor(curProgress)}}%</span></span>
      </div>
      <!-- {{Math.floor(curProgress)}}% -->
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
  background-image: url(../../assets/img/loading_sprite.png);
  -webkit-animation:animation 1s steps(41) 0s infinite both;
  animation: animation 1s steps(41) 0s infinite both;
  transform: scale(0.5);
}

@-webkit-keyframes animation {
  to { background-position: -4100% 0}
}
/* .progress{
  bottom: 10vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  border: 0;
} */
.progress {
	height:10px;
	background:#ebebeb;
	border-left:1px solid transparent;
	border-right:1px solid transparent;
	border-radius:10px;
  bottom: -50vh;
  position: absolute;
  left: 50%;
  border: 0;
  transform: translate(-50%, -50%);
  width:70vw;
}
.progress > span {
	position:relative;
	float:left;
	margin:0 -1px;
	min-width:30px;
	height:10px;
	line-height:30px;
	text-align:right;
	background:#cccccc;
	border:1px solid;
	border-color:#bfbfbf #b3b3b3 #9e9e9e;
	border-radius:10px;
	background-image:-webkit-linear-gradient(top,#f0f0f0 0%,#dbdbdb 70%,#cccccc 100%);
	background-image:-moz-linear-gradient(top,#f0f0f0 0%,#dbdbdb 70%,#cccccc 100%);
	background-image:-o-linear-gradient(top,#f0f0f0 0%,#dbdbdb 70%,#cccccc 100%);
	background-image:linear-gradient(to bottom,#f0f0f0 0%,#dbdbdb 70%,#cccccc 100%);
	-webkit-box-shadow:inset 0 1px rgba(255,255,255,0.3),0 1px 2px rgba(0,0,0,0.2);
	box-shadow:inset 0 1px rgba(255,255,255,0.3),0 1px 2px rgba(0,0,0,0.2);
}
.progress > span > span {
	padding:0 8px;
	font-size:14px;
	font-weight:bold;
	color:#404040;
	color:rgba(0,0,0,0.7);
	text-shadow:0 1px rgba(255,255,255,0.4);
}
.progress > span:before {
	content:'';
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	z-index:1;
	height:18px;
	/* background:url("../img/progress.png") 0 0 repeat-x; */
	border-radius:10px;
}
.progress .blue {
	background:#5aaadb;
	border-color:#78b337 #6ba031 #568128;
	background-image:-webkit-linear-gradient(top,rgb(75, 100, 255) 0%,rgb(75, 100, 255) 70%,rgb(75, 100, 255) 100%);
	background-image:-moz-linear-gradient(top,rgb(75, 100, 255) 0%,rgb(75, 100, 255) 70%,rgb(75, 100, 255) 100%);
	background-image:-o-linear-gradient(top,rgb(75, 100, 255) 0%,rgb(75, 100, 255) 70%,rgb(75, 100, 255) 100%);
	background-image:linear-gradient(to bottom,rgb(75, 100, 255) 0%,rgb(75, 100, 255) 70%,rgb(75, 100, 255) 100%);
}
</style>

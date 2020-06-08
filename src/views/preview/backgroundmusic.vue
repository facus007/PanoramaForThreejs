<template>
  <el-button type="text" @click="isPlaying=!isPlaying">
  <svg xmlns="" class="equilizer" viewbox="0 0 128 128">
    <g>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(0,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(6.25,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(12.5,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(18.75,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(25,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(31.25,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(37.5,0)" y="10"></rect>
      <rect :class="isPlaying?'bar':'bar-no-anime'" transform="translate(43.75,0)" y="10"></rect>
    </g>
  </svg>
  <!-- <iframe :src="link" allow="autoplay"/> -->
  <iframe v-if="isPlaying" :src='product.music_url' allow='autoplay' ref="audio" style="display:none"></iframe>
</el-button>
</template>
<script>
export default{
  props:['product'],
  data(){return {isPlaying: true}},
  methods:{},
  computed:{},
}
</script>
<style scoped>
.equilizer {
	width: 50px;
	height: 50px;
	transform: rotate(180deg);
}

.bar {
	fill: #007aff;
	width: 5px;
	animation: equalize 4s 0s infinite;
}

.bar-no-anime {
	fill: #007aff;
	width: 5px;
  height: 10px;
}

.bar:nth-child(1) {
	animation-delay: -1.9s;
}

.bar:nth-child(2) {
	animation-delay: -2s;
}

.bar:nth-child(3) {
	animation-delay: -2.3s;
}

.bar:nth-child(4) {
	animation-delay: -2.4s;
}

.bar:nth-child(5) {
	animation-delay: -2.1s;
}
.bar:nth-child(6) {
	animation-delay: -2.7s;
}
.bar:nth-child(7) {
	animation-delay: -1.8s;
}
.bar:nth-child(7) {
	animation-delay: -1.2s;
}
@keyframes equalize {
	0% {
		height: 60px;
	}
	4% {
		height: 50px;
	}
	8% {
		height: 40px;
	}
	12% {
		height: 30px;
	}
	16% {
		height: 20px;
	}
	20% {
		height: 30px;
	}
	24% {
		height: 40px;
	}
	28% {
		height: 10px;
	}
	32% {
		height: 40px;
	}
	36% {
		height: 60px;
	}
	40% {
		height: 20px;
	}
	44% {
		height: 40px;
	}
	48% {
		height: 70px;
	}
	52% {
		height: 30px;
	}
	56% {
		height: 10px;
	}
	60% {
		height: 30px;
	}
	64% {
		height: 50px;
	}
	68% {
		height: 60px;
	}
	72% {
		height: 70px;
	}
	76% {
		height: 80px;
	}
	80% {
		height: 70px;
	}
	84% {
		height: 60px;
	}
	88% {
		height: 50px;
	}
	92% {
		height: 60px;
	}
	96% {
		height: 70px;
	}
	100% {
		height: 80px;
	}
}
</style>

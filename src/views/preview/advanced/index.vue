<template>
  <div class="noevent" style="overflow: hidden; width:100%; height:100%;">
    <div v-for="style,index in layerStyle" :style="{...style, height: getHeight(index) * size + 'px'}" class="event">
      <div v-for="feature, i in product.features.filter(item=>item.position.group===index)" :key="feature.uuid"
        :style="{
          position:'absolute',
          left:parseInt(feature.position.x) * 100 / 3+'%',
          top:parseInt(feature.position.y) * size+'px',
          width:sizes[feature.size].width * 100 / 3 +'%',
          height:size * sizes[feature.size].height + 'px',
        }">
        <items :item="feature" :overview="_=>$refs.overview"/>
      </div>
    </div>
    <overview ref='overview' :height="Math.max(getHeight(1),getHeight(3))*size"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import items from './items'
import overview from './overview'

const size = 40;
const layerStyle = [
  {width: size*3+'px', height: size*5+'px', position: 'absolute', left: '0', top: '0', 'z-index': 'auto', margin: '0px 0'},
  {width: size*3+'px', height: size*5+'px', position: 'absolute', left: '0', bottom: '0', 'z-index': 'auto', margin: '0px 0'},
  {width: size*3+'px', height: size*5+'px', position: 'absolute', right: '0', top: '0','z-index': 'auto', margin: '0px 0'},
  {width: size*3+'px', height: size*5+'px', position: 'absolute', right: '0', bottom: '0', 'z-index': 'auto', margin: '0px 0'},
]

const sizes = {
  '1 x 1': { width : 1, height: 1},
  '1 x 2': { width : 1, height: 2},
  '1 x 3': { width : 1, height: 3},
  '2 x 1': { width : 2, height: 1},
  '2 x 2': { width : 2, height: 2},
  '2 x 3': { width : 2, height: 3},
  '3 x 1': { width : 3, height: 1},
  '3 x 2': { width : 3, height: 2},
  '3 x 3': { width : 3, height: 3},
}

export default {
  components:{items,overview},
  data(){return {}},
  methods:{
    // update(){},
    // propCompute(){},
    getItem(uuid){
      return this.product.features.filter(item=>item.uuid === uuid)[0]
    },
    getHeight(index){
      let max = 0
      this.product.features.filter(item=>item.position.group===index).forEach((item, i) => {
        max = Math.max(max, parseInt(item.position.y) + sizes[item.size].height)
      });
      return max
    },
  },
  computed:{
    size: _=>size, layerStyle:_=>layerStyle,sizes:_=>sizes,
    ...mapState('preview', ['product'])
  },
  mounted(){},
  beforeDestroy(){},
}
</script>

<style scoped>
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: auto;
}
</style>

<template>
  <div class="noevent" style="overflow: hidden; width:100%; height:100%;">
    <!-- <div v-for="style,index in layerStyle" :style="{...style, height: getHeight(index) * size + 'px'}" class="event">
      <div v-for="feature, i in product.features && product.features.filter(item=>{;console.log(item);return item.position.group===index}) || []" :key="feature.uuid"
        :style="{
          position:'absolute',
          left:parseInt(feature.position.x) * 100 / 3+'%',
          top:parseInt(feature.position.y) * size+'px',
          width:sizes[feature.size].width * 100 / 3 +'%',
          height:size * sizes[feature.size].height + 'px',
        }">
        <items :item="feature" />
      </div>
    </div> -->
    <div v-for="style,index in layerStyle" :style="style" class="grid-stack event"/>
    <span style="visibility: hidden">
      <items v-for="feature, i in product.features" :item="feature" :grids="grids" :widgets='widgets' :key="feature.uuid" ref="items" :overview="_=>$refs.overview"/>
    </span>

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
  data(){return {
    grids: null,
    widgets: null,
  }},
  methods:{
    // update(){},
    // propCompute(){},
    getItem(uuid){
      return this.product.features.filter(item=>item.uuid === uuid)[0]
    },
    newWidget(item){
      this.widgets[item.uuid] = this.grids[item.position.group].addWidget(
        '<div data-gs-x="'+item.position.x+ '" data-gs-y="' + item.position.y + '" data-gs-width="' + sizes[item.size].width + '" data-gs-height="' + sizes[item.size].height + '"/>'
      )
      var type = document.createAttribute("uuid");
      type.value = item.uuid;
      this.widgets[item.uuid].attributes.setNamedItem(type);
    },
    getHeight(index){
      let max = 0
      this.product.features && this.product.features.filter(item=>item.position.group===index).forEach((item, i) => {
        max = Math.max(max, parseInt(item.position.y) + sizes[item.size].height)
      });
      return max
    },
  },
  computed:{
    size: _=>size, layerStyle:_=>layerStyle,sizes:_=>sizes,
    ...mapState('preview', ['product'])
  },
  mounted(){
    this.grids = GridStack.initAll({
      acceptWidgets: true,
      cellHeight:40,
      disableResize:true,
      column: 3,
      minRow: 1,
      verticalMargin: 0,
      float:false,
      staticGrid:true,
      disableOneColumnMode: true,
    });
    this.widgets = {}
    this.product.features.forEach((item, i) => {
      this.newWidget(item)
    });
  },
  beforeDestroy(){
    this.grids.forEach((item, i) => {
      item.destroy()
    });
    this.grids = null
  },
}
</script>

<style scoped>
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: auto;
}
.grid-stack >>> .grid-stack-item[data-gs-width='1'] {
    width: 33.3333333333%;
}
.grid-stack >>> .grid-stack-item[data-gs-width='2'] {
    width: 66.6666666667%;
}
.grid-stack >>> .grid-stack-item[data-gs-width='3'] {
    width: 100%;
}
.grid-stack >>> .grid-stack-item[data-gs-x='1'] {
    left: 33.3333333333%;
}
.grid-stack >>> .grid-stack-item[data-gs-x='2'] {
    left: 66.6666666667%;
}
.grid-stack >>> .grid-stack-item[data-gs-x='3'] {
    left: 100%;
}
.grid-stack >>> .placeholder-content{
  left: 0px;
  right: 0px;
  border:2px dashed #FFFF;
}
.grid-stack>.grid-stack-item>.grid-stack-item-content{
  left: 0px;
  right: 0px;
  cursor: pointer;
}
</style>

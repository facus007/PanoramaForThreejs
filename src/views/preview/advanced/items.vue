<template>
  <div class="grid-stack-item-content" :widget="widget" >
    <components :is="item.type" :item="item" v-model="isMusicPlaying" @action="$emit('action')" :product="product"/>
  </div>
</template>

<script>
import music from './music'
import imagef from './imagef'
import linkf from './linkf'
import hypertext from './hypertext'
import scene from './scene'
import info from './info'
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

export default{
  props:['item', 'selected', 'widgets', 'grids', 'value', 'product'],
  components:{music, imagef, linkf, hypertext, scene, info},
  data(){return{
    isMusicPlaying: true,
  }},
  methods:{
    onChange(){
      let widget = this.widgets[this.item.uuid]
      this.item.size = widget.attributes['data-gs-width'].value + ' x ' + widget.attributes['data-gs-height'].value
      this.item.position = {group:this.item.position.group, x:widget.attributes['data-gs-x'].value, y:widget.attributes['data-gs-y'].value }
    }
  },
  watch:{
    'item.size'(next, pre){
      let widget = this.widgets[this.item.uuid]
      this.grid.resize(widget, sizes[next].width, sizes[next].height)
      this.grid.batchUpdate()
      this.grid.commit()
      this.item.size = widget.attributes['data-gs-width'].value + ' x ' + widget.attributes['data-gs-height'].value
    },
    'widget'(next){
      if(next){
        this.widget.appendChild(this.$el)
      }
    },
    isMusicPlaying(next){
      this.$emit('input',next)
    },
    value(next){
      this.isMusicPlaying = next
    }
  },
  mounted(){
    if(this.widget){
      this.widget.appendChild(this.$el)
    }
  },
  computed:{
    control(){return this},
    outline(){return this.item === this.selected},
    x(){return this.item.position.x},
    y(){return this.item.position.y},
    width(){return sizes[this.item.size].width},
    height(){return sizes[this.item.size].height},
    grid(){return this.grids && this.grids[this.item.position.group]},
    widget(){return this.widgets && this.widgets[this.item.uuid]}
  }
}
</script>

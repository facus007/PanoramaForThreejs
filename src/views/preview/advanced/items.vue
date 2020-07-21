<template>
  <div class="grid-stack-item-content" :widget="widget" >
    <components :is="item.type" :item="item"/>
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
  props:['item', 'widgets', 'grids'],
  components:{music, imagef, linkf, hypertext, scene, info},
  data(){return{
    isMusicPlaying: true,
  }},
  methods:{},
  watch:{
    'widget'(next){
      if(next){
        this.widget.appendChild(this.$el)
      }
    },
  },
  mounted(){
    if(this.widget){
      this.widget.appendChild(this.$el)
    }
  },
  computed:{
    control(){return this},
    widget(){return this.widgets && this.widgets[this.item.uuid]}
  }
}
</script>

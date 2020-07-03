<template>
  <div class="home noevent center">
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'

export default {
  props:['renderer', 'controls'],
  data(){return {
    selected: null,
  }},
  watch:{
    selected(next){
      if(next){
      }
    }
  },
  methods:{
    setSelected(selected){
      this.selected = selected
    },
    // update(){},
    // propCompute(){},
  },
  computed:{
    ...mapState('editor', ['preview', 'product', 'curedit']),
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
</style>

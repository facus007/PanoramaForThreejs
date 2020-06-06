<template>
  <div :style="{width:(size+4)+'px', height:(size+4)+'px', background: '#EEEEEE'}">
    <img :src="src" width="100%" height="100%" ref="img"/>
  </div>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../../base/threecomponent'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const size = 1000

export default {
  mixins: [THREEComponent],
  props:['pos', 'rot', 'src'],
  data(){return{
    loaded: false,
    blur: 20,
  }},
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){}
  },
  computed:{
    ...mapState('three',['fov']),
    size:()=>size,
  },
  mounted(){
    var obj = new CSS3DObject(this.$el);
    var pos = [];
    pos[0] = this.pos[0] * size/2;  pos[1] = this.pos[1] * size/2;  pos[2] = this.pos[2] * size/2;
    obj.position.fromArray( pos );
    obj.rotation.fromArray( this.rot );
    this.scene.add(obj)
    this.obj = obj
    this.$refs.img.onload = ()=>{this.loaded = true; this.$emit('onload')}
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj = null
  }
}
</script>
<style scoped>
.csspanel{
}
</style>

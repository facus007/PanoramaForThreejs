<template>
  <span :computeProp="computeProp">
    <slot></slot>
  </span>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import admesh from './admesh'

const texloader = new THREE.TextureLoader()

export default {
  mixins: [THREEComponent],
  components: {admesh},
  props: ['template', 'value'],
  data(){ return{
    meshes: null
  }},
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){},
    // propCompute(){},
    dispose(){
      this.obj.children.forEach((item, i) => {
        item.geometry.dispose()
        item.material.dispose()
      });
    }
  },
  mounted(){
    var loader = new THREE.ObjectLoader();
    loader.load( this.jsonPath, ( object ) => {
      if(this){
        this.obj = object
        this.obj.visible=false
        this.$emit('input', this.obj)
        this.scene.add(this.obj)
      }
      else{
        object.children.forEach((item, i) => {
          item.geometry.dispose()
          item.material.dispose()
        });
      }
    } );
  },
  beforeDestroy(){
    if( this.obj){
      this.dispose()
      this.meshes = null
      this.scene.remove(this.obj)
      this.obj = null
    }
  },
  computed:{
    ...mapState('editor',['curedit']),
    jsonPath() {
      return URL.createObjectURL(new Blob([JSON.stringify(this.template)],{type:"application/json"}));
    }
  }
}
</script>

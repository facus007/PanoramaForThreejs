<template>
  <span :computeProp="computeProp">
    <slot></slot>
  </span>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'

const texloader = new THREE.TextureLoader()

export default {
  mixins: [THREEComponent],
  props: ['template', 'value'],
  data(){ return{
    meshes: null
  }},
  watch:{},
  methods:{
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
        this.$emit('input', this.obj)
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

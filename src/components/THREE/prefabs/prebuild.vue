<template>
  <span :computeProp="computeProp">
    <!-- <custom-material ref="shader"/> -->
    <slot></slot>
  </span>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import CustomMaterial from './buildedmesh/custommaterial'

const texloader = new THREE.TextureLoader()

export default {
  mixins: [THREEComponent],
  props: ['template', 'value'],
  components:{CustomMaterial},
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
    jsonPath() {
      return URL.createObjectURL(new Blob([JSON.stringify(this.template)],{type:"application/json"}));
    }
  }
}
</script>

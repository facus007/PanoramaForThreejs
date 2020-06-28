<template>
  <div class="home"><slot/></div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

var frame = 0

export default {
  mixins: [THREEComponent],
  props: ['option'],
  watch:{
    domElement(next, pre){
      pre && pre.removeEventListener('update', this.update)
      next && next.addEventListener('update', this.update)
    }
  },
  mounted(){
    this.obj = new THREE.WebGLRenderer(this.option)
    this.$el.appendChild(this.obj.domElement)
    window.addEventListener('resize', this.resize);
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    window.removeEventListener('resize', this.resize);
    this.obj.domElement.remove()
    this.obj = this.obj.dispose()
  },
  methods:{
    resize(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
      this.obj.setPixelRatio( window.devicePixelRatio );
    },
    startRendering(){
      this.domElement && this.domElement.addEventListener('update', this.update)
    },
    stopRendering(){
      this.domElement && this.domElement.removeEventListener('update', this.update)
    },
    async update(){
      this.resize()
      this.obj.render(this.scene, this.camera);
    },
  }
}
</script>

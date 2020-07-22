<template>
  <div class="home"><slot/></div>
</template>

<script>
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

var frame = 0

export default {
  mixins: [THREEComponent],
  watch:{
    domElement(next, pre){
      pre && pre.removeEventListener('update', this.update)
      next && next.addEventListener('update', this.update)
    }
  },
  mounted(){
    this.obj = new CSS3DRenderer()
    this.$el.appendChild(this.obj.domElement)
    window.addEventListener('resize', this.resize);
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    window.removeEventListener('resize', this.resize);
    this.obj.domElement.remove()
    this.obj = null
  },
  methods:{
    resize(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
    },
    startRendering(){
      this.domElement && this.domElement.addEventListener('update', this.update)
    },
    stopRendering(){
      this.domElement && this.domElement.removeEventListener('update', this.update)
    },
    async update(){
      if( ++frame % 2===0) {
        frame = 0
        this.resize()
      }
      this.obj.render(this.scene, this.camera);
    }
  }
}
</script>

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
  watch:{},
  mounted(){
    this.obj = new CSS3DRenderer()
    this.$el.appendChild(this.obj.domElement)
    window.addEventListener('resize', this.resize);
    this.resize()
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    window.removeEventListener('resize', this.resize);
    this.obj.domElement.remove()
    this.obj = null
  },
  methods:{
    async resize(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
    },
    startRendering(){
      this.frame = requestAnimationFrame(this.update)
    },
    stopRendering(){
      cancelAnimationFrame(this.frame)
    },
    update(){
      this.obj.render(this.scene, this.camera);
      this.frame = requestAnimationFrame(this.update)
    }
  }
}
</script>

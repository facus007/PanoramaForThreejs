<template>
  <div class="home"><slot/></div>
</template>

<script>
import THREEComponent from '@/components/THREE/base/threecomponent'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default {
  mixins: [THREEComponent],
  watch:{},
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
    async resize(){
      requestAnimationFrame(()=>{
        this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
      })
    },
    startRendering(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
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

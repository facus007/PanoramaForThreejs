<template>
  <div class="absolute"><slot/></div>
</template>

<script>
import THREEComponent from '@/components/THREE/base/threecomponent'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default {
  mixins: [THREEComponent],
  watch:{},
  mounted(){
    this.obj = new CSS2DRenderer()
    this.$el.appendChild(this.obj.domElement)
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
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
      if(this.$el.clientWidth / this.$el.clientHeight !== this.camera.aspect){
        this.resize()
      }
      this.frame = requestAnimationFrame(this.update)
    }
  }
}
</script>

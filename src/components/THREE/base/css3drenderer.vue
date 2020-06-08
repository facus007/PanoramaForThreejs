<template>
  <div class="home"><slot/></div>
</template>

<script>
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default {
  mixins: [THREEComponent],
  watch:{
    domElement(next, pre){
      pre && pre.removeEventListener('update', this.update)
      next && next.addEventListener('update', this.update)
    }
  },
  methods:{},
  mounted(){
    this.obj = new CSS3DRenderer()
    this.$el.appendChild(this.obj.domElement)
    this.observer = new ResizeObserver(this.resize)
    this.observer.observe(this.$el, { attributes: true, childList: true, subtree: true })
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    this.observer.unobserve(this.$el)
    this.observer = null
    this.obj.domElement.remove()
    this.obj = null
  },
  methods:{
    resize(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
    },
    rendering(){
      this.obj.render(this.scene, this.camera);
      this.frame = requestAnimationFrame(this.rendering)
    },
    startRendering(){
      this.obj.render(this.scene, this.camera);
      this.frame = requestAnimationFrame(this.rendering)
    },
    stopRendering(){
      cancelAnimationFrame(this.frame)
    },
  }
}
</script>

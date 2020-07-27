<template>
  <div class="home"><slot/></div>
</template>

<script>
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default {
  mixins: [THREEComponent],
  watch:{
    domElement(next, pre){
      pre && pre.removeEventListener('update', this.update)
      next && next.addEventListener('update', this.update)
    }
  },
  methods:{
    update(){
      this.obj.render(this.scene, this.camera);
    }
  },
  mounted(){
    this.obj = new CSS2DRenderer()
    this.$el.appendChild(this.obj.domElement)
    window.addEventListener('resize', this.resize);
    this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
  },
  beforeDestroy(){
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
  }
}
</script>

<template>
  <div style="position: absolute; width: 100%; height: 100%;"><slot/></div>
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
  methods:{
    update(){
      this.obj.setSize(this.$el.clientWidth, this.$el.clientHeight );
      this.obj.render(this.scene, this.camera);
    }
  },
  mounted(){
    this.obj = new CSS3DRenderer()
    this.$el.appendChild(this.obj.domElement)
  },
  beforeDestroy(){
    this.obj.domElement.remove()
    this.obj = null
  }
}
</script>

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
    this.observer = new ResizeObserver(this.resize)
    this.observer.observe(this.$el, { attributes: true, childList: true, subtree: true })
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    this.observer.unobserve(this.$el)
    this.observer = null
    this.obj.domElement.remove()
    this.obj = this.obj.dispose()
  },
  methods:{
    resize(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
    },
    rendering(){
      // let rate = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === "micromessenger" ? 2 : 1;
      let rate = 1
      if(++frame % rate === 0){
        frame= 0
        this.obj.render(this.scene, this.camera);
      }
      this.frame = requestAnimationFrame(this.rendering)
    },
    startRendering(){
      // this.frame = requestAnimationFrame(this.rendering)
      this.domElement && this.domElement.addEventListener('update', this.update)
    },
    stopRendering(){
      // cancelAnimationFrame(this.frame)
    },
    update(){
      this.obj.render(this.scene, this.camera);
    },
  }
}
</script>

<template>
  <div class="absolute"><slot/></div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'

var frame = 0

export default {
  mixins: [THREEComponent],
  props: ['option'],
  mounted(){
    this.obj = new THREE.WebGLRenderer(this.option)
    this.$el.appendChild(this.obj.domElement)
    this.startRendering()
  },
  beforeDestroy(){
    this.stopRendering()
    this.obj.domElement.remove()
    this.obj = this.obj.dispose()
  },
  methods:{
    async resize(){
      requestAnimationFrame(()=>{
        this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
        this.obj.setPixelRatio( window.devicePixelRatio );
      })
    },
    startRendering(){
      this.obj.setSize( this.$el.clientWidth, this.$el.clientHeight );
      this.obj.setPixelRatio( window.devicePixelRatio );
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

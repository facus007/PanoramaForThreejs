<template>
  <div :isloaded="isloaded">
    <panel v-for="src, index in sideImgs" :key="index" :pos="sides[index].position" :rot="sides[index].rotation" :src="src" ref="panel">
      <MashBasicMaterial ref="mats">
        <texture :url='sideBlurImgs && sideBlurImgs[index] || src' :key="src" :onLoad="onLoad" ref="texs"/>
      </MashBasicMaterial>
    </panel>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../../base/threecomponent'
import MashBasicMaterial from '../../base/meshbasicmaterial'
import Texture from '../../base/texture'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import panel from './panel'
const texloader = new THREE.TextureLoader()

const sides = [
  {
    position: [ 0, 0, - 1 ],
    rotation: [ 0, 0, 0 ]
  },
  {
    position: [ 1, 0, 0 ],
    rotation: [ 0, - Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 0, 1 ],
    rotation: [ 0, Math.PI, 0 ]
  },
  {
    position: [ - 1, 0, 0 ],
    rotation: [ 0, Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 1, 0 ],
    rotation: [ Math.PI / 2, 0, Math.PI ]
  },
  {
    position: [ 0, - 1, 0 ],
    rotation: [ - Math.PI / 2, 0, Math.PI ]
  },
];

export default {
  mixins: [THREEComponent],
  components: {panel, MashBasicMaterial, Texture},
  props: ['sideImgs','sideBlurImgs'],
  data(){return {
    sides,
    loaded:0
  }},
  methods:{
    onLoad(){
      this.loaded++
    }
    // update(){}
  },
  computed:{
    isloaded(){
      if(this.loaded >= 6){
        this.loaded = 0
        this.$emit('onload')
        if(this.sideBlurImgs){
          this.sideImgs.forEach((item, i) => {
            var index = i
            let url = item.replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
            texloader.load(url,(tex) => {
              this.$refs.mats[index].obj.map = tex
              this.$refs.texs[index].obj.dispose()
              this.$refs.texs[index].obj = tex
            })
          });
        }
      }
      return this.loaded
    }
  }
}
</script>

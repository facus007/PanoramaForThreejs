<template>
  <div :isloaded="isloaded">
    <panel v-for="src, index in sideImgs" :key="src" :pos="sides[index].position" :rot="sides[index].rotation" :src="src" @onload="loaded++"></panel>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import panel from './csspanel'
import THREEComponent from '../../base/threecomponent'
import MashBasicMaterial from '../../base/meshbasicmaterial'
import Texture from '../../base/texture'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

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
  props: ['sideImgs'],
  data(){return {
    sides,
    loaded:0
  }},
  methods:{
    // update(){}
  },
  computed:{
    isloaded(){
      if(this.loaded >= 6){this.$emit('onload')}
      return this.loaded
    }
  }
}
</script>

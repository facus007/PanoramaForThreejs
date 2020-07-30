<template>
  <div>
    <panel v-for="src, index in sideImgs" :key="index" :pos="sides[index].position" :rot="sides[index].rotation" :src="src" ref="panel">
      <MashBasicMaterial ref="mats">
        <texture :url='src' :key="index+''" ref="texs"/>
      </MashBasicMaterial>
    </panel>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'
import MashBasicMaterial from '../../base/meshbasicmaterial'
import Texture from '../../base/texture'
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
  props: ['sideImgs'],
  data(){return {
    sides,
  }},
  methods:{},
  computed:{}
}
</script>

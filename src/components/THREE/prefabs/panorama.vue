<template>
  <div>
    <img v-for="src in sideImgs" :key="src" ref="img" :width="1026" :src="src"/>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const sides = [
  {
    position: [ 0, 0, - 512 ],
    rotation: [ 0, 0, 0 ]
  },
  {
    position: [ 512, 0, 0 ],
    rotation: [ 0, - Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 0, 512 ],
    rotation: [ 0, Math.PI, 0 ]
  },
  {
    position: [ - 512, 0, 0 ],
    rotation: [ 0, Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 512, 0 ],
    rotation: [ Math.PI / 2, 0, Math.PI ]
  },
  {
    position: [ 0, - 512, 0 ],
    rotation: [ - Math.PI / 2, 0, Math.PI ]
  },
];

export default {
  mixins: [THREEComponent],
  props: ['sideImgs'],
  data(){return {
    objects: []
  }},
  methods:{
    // update(){}
  },
  mounted(){
    for ( var i = 0; i < sides.length; i ++ ) {
      var side = sides[ i ];
      var object = new CSS3DObject( this.$refs.img[i] );
      object.position.fromArray( side.position );
      object.rotation.fromArray( side.rotation );
      this.scene.add( object );
      this.objects[i] = object
    }
  },
  beforeDestroy(){
    for ( var i = 0; i < sides.length; i ++ ) {
      this.scene.remove( this.objects[i] );
      this.objects[i] = null
    }
  }
}
</script>

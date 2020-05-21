<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

import path from 'path'
const jsonPath = path.join(__dirname,'../static/model.json')

export default {
  mixins: [THREEComponent],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){},
    // propCompute(){},
  },
  mounted(){
    var loader = new THREE.ObjectLoader();
    loader.load( jsonPath, ( object ) => {
      this.obj = object
      this.scene.add(this.obj)
    } );
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj = null
  }
}
</script>

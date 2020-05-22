<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../../base/threecomponent'

const size = 10000

export default {
  mixins: [THREEComponent],
  props:['pos', 'rot'],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){}
  },
  mounted(){
    var obj = new THREE.Mesh( new THREE.PlaneGeometry( size, size ) );
    var pos = [];
    pos[0] = this.pos[0] * size/2;  pos[1] = this.pos[1] * size/2;  pos[2] = this.pos[2] * size/2;  
    obj.position.fromArray( pos );
    obj.rotation.fromArray( this.rot );
    this.scene.add(obj)
    this.obj = obj
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj.geometry.dispose()
    this.obj = null
  }
}
</script>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'

const size = 200

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
    var obj = new THREE.Mesh(new THREE.PlaneGeometry());
    obj.position.fromArray( this.pos )
    obj.position.multiplyScalar(size / 2)
    obj.rotation.fromArray( this.rot );
    obj.scale.set(size,size,size)
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

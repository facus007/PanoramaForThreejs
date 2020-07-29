<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'

const loader = new THREE.BufferGeometryLoader()

export default {
  mixins: [THREEComponent],
  props:['pos', 'rot', 'size'],
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
    obj.position.multiplyScalar(this.size)
    obj.rotation.fromArray( this.rot );
    obj.scale.multiplyScalar(this.size * 2)
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

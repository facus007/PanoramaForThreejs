<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../../base/threecomponent'

const size = 200
const loader = new THREE.BufferGeometryLoader()

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
    var obj = new THREE.Mesh();
    obj.rotation.fromArray( this.rot );
    obj.scale.set(size,size,size)
    this.scene.add(obj)
    this.obj = obj

    loader.load('./static/geometry.json',geometry=>{
      if(this.obj){
        this.obj.geometry = geometry
      }
      else{
        geometry.dispose()
      }
    })
  },
  beforeDestroy(){
    if(this.obj.geometry){
      this.obj.geometry.dispose()
    }
    this.scene.remove(this.obj)
    this.obj = null
  }
}
</script>

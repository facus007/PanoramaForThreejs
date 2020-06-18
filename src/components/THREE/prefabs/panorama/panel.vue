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
    loader.load('./static/geometry.json',geometry=>{
      if(this){
        var obj = new THREE.Mesh(geometry);
        obj.rotation.fromArray( this.rot );
        obj.scale.set(size,size,size)
        this.scene.add(obj)
        this.obj = obj
      }
      else{
        geometry.dispose()
      }
    })
  },
  beforeDestroy(){
    if(this.obj){
      this.scene.remove(this.obj)
      this.obj.geometry.dispose()
      this.obj = null
    }
  }
}
</script>

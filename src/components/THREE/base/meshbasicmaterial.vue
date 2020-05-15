<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

export default {
  mixins: [THREEComponent],
  props: ['side', 'transparent', 'color', 'opacity'],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // },
    '$parent.obj'(next, pre){
      pre && pre.material === this.obj && (pre.material = null);
      next && next instanceof THREE.Mesh && (next.material = this.obj);
    }
  },
  methods:{
    // update(){}
    propCompute(){
      this.obj.side = this.side || this.obj.side
      this.obj.transparent = this.transparent || this.obj.transparent
      this.obj.color = this.color || this.obj.color
      this.obj.opacity = this.opacity || this.obj.opacity
    }
  },
  mounted(){
    this.obj = new THREE.MeshBasicMaterial()
  },
  beforeDestroy(){
    this.obj.dispose()
  }
}
</script>

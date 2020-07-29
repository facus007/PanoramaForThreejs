<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'

const raycaster = new THREE.Raycaster();

export default {
  mixins: [THREEComponent],
  props: ['targets'],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
  },
  methods:{
    // update(){
    // },
    raycast(){
      raycaster.setFromCamera(param, this.camera);
      return raycaster.intersectObjects(targets || [], true);
    },
  },
  mounted(){
  },
  beforeDestroy(){}
}
</script>

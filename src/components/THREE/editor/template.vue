<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

export default {
  mixins: [THREEComponent],
  props: ['editing'],
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
  mounted(){},
  beforeDestroy(){}
}
</script>

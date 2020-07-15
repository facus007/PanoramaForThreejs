<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

const texloader = new THREE.TextureLoader()

export default {
  mixins: [THREEComponent],
  props: ['url', 'onLoad', 'onProgress', 'onError', 'rotation', 'center ', 'offset', 'repeat', 'flipY '],
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // },
    '$parent.obj'(next, pre){
      pre && pre.map === this.obj && (pre.map = null);
      next && (next instanceof THREE.Material) && (next.map = this.obj);
    }
  },
  methods:{
    // update(){}
    // propCompute(){}, 
  },
  mounted(){
    let url = this.url.replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
    this.obj = texloader.load(url,this.onLoad,this.onProgress,this.onProgress)
  },
  beforeDestroy(){
    this.obj && this.obj.dispose()
  }
}
</script>

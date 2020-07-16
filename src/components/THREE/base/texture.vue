<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

const texloader = new THREE.TextureLoader()

export default {
  mixins: [THREEComponent],
  data(){return{
    frame: 0
  }},
  props: ['url', 'onLoad', 'onProgress', 'onError', 'rotation', 'center ', 'offset', 'repeat', 'flipY ','dynamic'],
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
    updateTexture(){
      let tex = this.tex
      if(++this.frame % 4 === 0){
        let rate = Math.floor(tex.image.width/tex.image.height*4)
        if(this.frame % rate === 0){
          this.frame = 0
        }
        tex.offset = new THREE.Vector2(this.frame * (tex.image.height / tex.image.width / 4), 0)
        tex.updateMatrix()
      }
      requestAnimationFrame(this.updateTexture)
    }
  },
  mounted(){
    let url = this.url.replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
    this.obj = texloader.load(url,tex=>{
      if(this.dynamic)
      {
        this.tex = tex
        this.tex.repeat = new THREE.Vector2(tex.image.height/tex.image.width, 1)
        requestAnimationFrame(this.updateTexture)
      }
      this.onLoad && this.onLoad(tex)
    },this.onProgress,this.onProgress)
  },
  beforeDestroy(){
    this.obj && this.obj.dispose()
  }
}
</script>

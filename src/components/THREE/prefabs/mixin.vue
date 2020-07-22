<script>
const layout = {
  '0':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'flex-start', width: '100%', height: '100%' },
  '1':{display:'flex', 'justify-content': 'center', 'align-items': 'flex-start', width: '100%' , height: '100%'},
  '2':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'flex-start' , width: '100%', height: '100%'},
  '3':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'center', width: '100%' , height: '100%'},
  '4':{display:'flex', 'justify-content': 'center', 'align-items': 'center' , width: '100%', height: '100%'},
  '5':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'center', width: '100%' , height: '100%'},
  '6':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'flex-end', width: '100%' , height: '100%'},
  '7':{display:'flex', 'justify-content': 'center', 'align-items': 'flex-end' , width: '100%', height: '100%'},
  '8':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'flex-end', width: '100%' , height: '100%'},
}

import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import GlImage from './glimage'
import DglImage from './dglimage'
import GlVideo from './glvideo'
import Spot from './spot'

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI, Math.PI/2, 'XYZ'))

var frame = 0

export default {
  mixins: [THREEComponent],
  components: {GlImage, GlVideo, Spot, DglImage},
  props:['url', 'type', 'mesh', 'side', 'transparent', 'color', 'opacity', 'item', 'selected', 'hidden'],
  data(){return {
    imageData: null,
  }},
  watch:{
    'item.transform'(next, pre){
      this.setTransform()
    },
    url(next){
      this.imageData = null
    }
  },
  methods:{
    // update(){},
    // propCompute(){},
    setTransform(){
      let m = this.item.transform.affine_transform
      this.obj.position.copy(this.mesh.position)
      let pos = new THREE.Vector3(-m[0], -m[1], 0)
      this.obj.quaternion.copy(this.mesh.quaternion)
      this.obj.quaternion.multiply(fix)
      pos.applyQuaternion(this.obj.quaternion)
      this.obj.position.add(pos)
      let short = Math.min(this.mesh.scale.z, this.mesh.scale.x)
      this.obj.scale.set(m[2] * short * 0.01, m[3] * short * 0.01, short * 0.01)
    },
  },
  mounted(){
    // if(!this.url){ return }
    this.obj = new CSS3DObject(this.$el)
    this.setTransform()
    this.scene.add(this.obj)
  },
  beforeDestroy(){
    this.scene.remove(this.obj)
    this.obj = null
  },
  computed:{
    layout:() => layout,
    outline(){
      return this.selected && this.selected.name === this.item.name
    },
    size(){
      let short = Math.min(this.mesh.scale.z, this.mesh.scale.x)
      return [this.mesh.scale.z / short, this.mesh.scale.x / short]
    },
    image(){
      if(!this.url){return;}
      let image = new Image()
      image.src = this.url.replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
      image.onload = ()=>{
        this.imageData = image
      }
      return image;
    },
    width(){
      let sizeAspect = this.size[0] / this.size[1]
      let imageAspect = this.image.width / this.image.height
      return sizeAspect > imageAspect ? this.size[0] / sizeAspect * imageAspect  :this.size[0]
    },
    height(){
      let sizeAspect = this.size[0] / this.size[1]
      let imageAspect = this.image.width / this.image.height
      return sizeAspect > imageAspect ? this.size[1] : this.size[1] / imageAspect * sizeAspect
    },
    style(){
      return {...this.layout[this.item.align || '4'],border: this.outline ? '5px dashed yellow' : 'none', width:this.size[0] * 100+'px', height:this.size[1] * 100+'px'}
    }
  }
}
</script>
<style scoped="three">
.label{
  position: absolute;
  border-radius: 20px;
  background: #0008;
  padding: 5px 10px;
  color: white;
  width: max-content;
  top: -5px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.layer{
  position: relative;
}
</style>

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

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI, Math.PI/2, 'XYZ'))

export default {
  mixins: [THREEComponent],
  props:['url', 'type', 'mesh', 'side', 'transparent', 'color', 'opacity', 'item', 'selected'],
  watch:{
    'item.transform'(next, pre){
      this.setTransform()
    },
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
      pos.applyQuaternion (this.obj.quaternion)
      this.obj.position.add(pos)
      this.obj.scale.set(m[2] * this.mesh.scale.x *0.01,m[3] * this.mesh.scale.y * 0.01, this.mesh.scale.z *0.01)
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
      var size = this.item.name.split('_')
      return [parseInt(size[1]),parseInt(size[2])]
    },
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

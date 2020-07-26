<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'

const material = new THREE.MeshBasicMaterial()
const texloader = new THREE.TextureLoader()
material.map = texloader.load('./static/goto.png')
material.transparent = true
// material.map.repeat = new THREE.Vector2(0.05, 1)
const tex = material.map

var frame = 0

var fix = new THREE.Quaternion()
fix.setFromEuler(new THREE.Euler(Math.PI/2, Math.PI, Math.PI/2, 'XYZ'))
const posfix = new THREE.Vector3(0,0,0.1)

export default {
  mixins: [THREEComponent],
  props: ['mesh','item','visible'],
  data(){return {
    frame: 0
  }},
  watch:{
    // domElement(next, pre){
    //   pre && pre.removeEventListener('update', this.update)
    //   next && next.addEventListener('update', this.update)
    // }
    'item.transform'(next, pre){
      this.setTransform()
    },
    'item.target.dynamic_img'(){
      this.setTransform()
    },
    visible(next){
      this.obj && (this.obj.visible = next)
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
      pos.applyQuaternion (this.obj.quaternion)
      this.obj.position.add(pos)
      this.obj.position.add(this.layout.clone().multiplyScalar(this.mesh.scale.y * 0.01))
      this.obj.position.add(posfix.clone().applyQuaternion (this.obj.quaternion))
      this.obj.scale.set(m[2] * 10 * 0.01,m[3] * 10 * 0.01, 10 * 0.01)
    },
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
    if(this.item.target.spot_url){
      this.material = new THREE.MeshBasicMaterial()
      this.material.transparent = true
      this.material.map = texloader.load(this.item.target.spot_url.replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API), (tex)=>{
        this.tex = tex
        this.tex .repeat = new THREE.Vector2(tex.image.height/tex.image.width, 1)
        requestAnimationFrame(this.updateTexture)
      })
      this.obj = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), this.material);
    }else{
      this.obj = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), material);
    }
    this.setTransform()
    this.obj.visible = this.visible
    this.scene.add(this.obj)
  },
  beforeDestroy(){
    this.material && this.material.map.dispose() && this.material.dispose()
    this.scene.remove(this.obj)
    this.obj.geometry.dispose()
    this.obj = null
  },
  computed:{
    size(){
      return [this.mesh.scale.z / this.mesh.scale.y, this.mesh.scale.x / this.mesh.scale.y]
    },
    width(){
      let sizeAspect = this.size[0] / this.size[1]
      let imageAspect = 1
      return sizeAspect > imageAspect ? this.size[0] / sizeAspect * imageAspect  :this.size[0]
    },
    height(){
      let sizeAspect = this.size[0] / this.size[1]
      let imageAspect = 1
      return sizeAspect > imageAspect ? this.size[1] : this.size[1] / imageAspect * sizeAspect
    },
    layout(){
      let compute = {
        '0': new THREE.Vector3(-50*(this.size[0] - this.width), 50*(this.size[1] - this.height), 0),
        '1': new THREE.Vector3(0, 50*(this.size[1] - this.height), 0),
        '2': new THREE.Vector3(50*(this.size[0] - this.width), 50*(this.size[1] - this.height), 0),
        '3': new THREE.Vector3(-50*(this.size[0] - this.width), 0, 0),
        '4': new THREE.Vector3(0, 0, 0),
        '5': new THREE.Vector3(50*(this.size[0] - this.width), 0, 0),
        '6': new THREE.Vector3(-50*(this.size[0] - this.width), -50*(this.size[1] - this.height), 0),
        '7': new THREE.Vector3(0, -50*(this.size[1] - this.height), 0),
        '8': new THREE.Vector3(50*(this.size[0] - this.width), -50*(this.size[1] - this.height), 0),
      }
      return compute[this.item.align]
    }
  }
}
</script>

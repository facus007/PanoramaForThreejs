<template>
  <div class="animated-panorama">
    <roundpanel v-for="_, index in 6" :key="'round'+index" :pos="sides[index].position" :rot="sides[index].rotation" ref="round" :size="200">
      <MashBasicMaterial ref="roundmat" :transparent="true"/>
    </roundpanel>

    <panel v-for="_, index in 6" :key="'plane'+index" :pos="sides[index].position" :rot="sides[index].rotation" ref="plane" :size="200">
      <MashBasicMaterial ref="planemat"/>
    </panel>
  </div>
</template>

<script>
import * as THREE from 'three'
import { mapState } from 'vuex'
import THREEComponent from '../../base/threecomponent'
import MashBasicMaterial from '../../base/meshbasicmaterial'
import panel from './panel'
import roundpanel from './roundpanel'

const sides = [
  {
    position: [ 0, 0, - 1 ],
    rotation: [ 0, 0, 0 ]
  },
  {
    position: [ 1, 0, 0 ],
    rotation: [ 0, - Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 0, 1 ],
    rotation: [ 0, Math.PI, 0 ]
  },
  {
    position: [ - 1, 0, 0 ],
    rotation: [ 0, Math.PI / 2, 0 ]
  },
  {
    position: [ 0, 1, 0 ],
    rotation: [ Math.PI / 2, 0, Math.PI ]
  },
  {
    position: [ 0, - 1, 0 ],
    rotation: [ - Math.PI / 2, 0, Math.PI ]
  },
];

export default {
  mixins: [THREEComponent],
  components: {panel, roundpanel, MashBasicMaterial},
  props: ['curScene', 'textures'],
  data(){return {}},
  methods:{
    afterloaded(){
      this.$refs.round.forEach((item, i) => {
        item.obj.visible = false
      });
      this.$refs.plane.forEach((item, i) => {
        item.obj.visible = true
      });
    },
    async switchscene(){
      var orirot = []
      this.$refs.round.forEach((item, i) => {
        orirot[i]=item.obj.quaternion.clone()
        item.obj.applyQuaternion(this.camera.quaternion.clone().inverse())
      });

      var aim = (new THREE.Vector3()).setFromSphericalCoords(200, this.curScene.start_rotation[1], this.curScene.start_rotation[0]).multiplyScalar(-1)
      this.camera.lookAt(aim)
      this.camera.fov = this.curScene.fov
      this.camera.updateProjectionMatrix()
      this.$refs.round.forEach((item, i) => {
        item.obj.applyQuaternion(this.camera.quaternion.clone())
      });

      this.$refs.round.forEach((item, i) => {
        item.obj.visible = true
      });
      this.$refs.planemat.forEach((item, i) => {
        item.obj.map = this.textures[this.curScene.scene_id][i].clear
      });
      this.$refs.plane.forEach((item, i) => {
        item.obj.visible = true
      });
      var dist = (new THREE.Vector3(0, 0, 100)).applyQuaternion (this.camera.quaternion)
      return new Promise((resolve, reject) => {
        let a = ()=>{
          if(this.$refs.round[0].obj.material.opacity <= 0){
            this.$refs.round.forEach((item, i) => {
              item.obj.position.set(0,0,0)
              item.obj.material.opacity = 1
              item.obj.visible = false
              item.obj.quaternion = orirot[i]
            });
            resolve()
          }
          else{
            this.$refs.round.forEach((item, i) => {
              item.obj.position.lerp(dist, 0.0125)
              item.obj.material.opacity = THREE.MathUtils.lerp(item.obj.material.opacity, -1, 0.0125)
            });
            requestAnimationFrame(a)
          }
        }
        a()
      });
    }
  },
  computed:{
    sides:()=>sides,
  },
  mounted(){
    this.$refs.roundmat.forEach((item, i) => {
      item.obj.map = this.textures[this.curScene.scene_id][i].clear
    });
    this.$refs.round.forEach((item, i) => {
      item.obj.visible = true
    });
    this.$refs.planemat.forEach((item, i) => {
      item.obj.map = this.textures[this.curScene.scene_id][i].clear
    });
    this.$refs.plane.forEach((item, i) => {
      item.obj.visible = false
    });
  }
}
</script>

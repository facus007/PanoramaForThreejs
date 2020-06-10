<template>
  <div class="home noevent" style="display: flex; align-items: center; padding: 10px;">
    <transform v-if="selected" :selected="selected"/>
    <detail v-if="selected" :selected="selected" style="margin-left: auto;"/>
    <prebuild :template="curedit.template" v-model="group">
      <span v-for="item, index in group && curedit.embeddings[1].hotspots">
        <product-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" :selected="selected" @action="action"/>
      </span>
    </prebuild>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as THREEComponent from '@/components/THREE'
import transform from '../transform'
import detail from '../detail'
import * as THREE from 'three'

export default {
  data(){return {
    group: null,
    selected: null,
  }},
  props:['controls','editor'],
  watch:{
    selected(next){
      if(next){
        let spherical = new THREE.Spherical()
        let pos =  this.group.getObjectByName(next.name) && this.group.getObjectByName(next.name).position.clone() || new THREE.Vector3(next.transform.position[0],next.transform.position[1],next.transform.position[2])
        pos.x *= -1; pos.y *= -1; pos.z *= -1;
        spherical.setFromVector3(pos)
        this.controls.setView(spherical.phi, spherical.theta)
      }
    }
  },
  components:{transform, detail, ...THREEComponent},
  methods:{
    setSelected(selected){
      this.selected = selected
    },
    action(item){
      this.editor.$refs.panel[0].setSelected(this.selected === item ? null : item)
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    ...mapState('editor',{
      curedit(state){ return state.curedit }
    }),
  }
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
.el-button {
  color: #AAA;
}
.el-button :hover{
  color: yellow;
}
.block{
  text-align: center;
  background: rgba(51,51,51,0.8);
  padding: 5px;
  display: grid; grid-gap: 5px;
  grid-template-rows: 16px 1fr;
  width:100%;
}
</style>

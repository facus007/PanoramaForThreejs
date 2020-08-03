<template>
  <div class="absolute centering noevent" style="padding: 10px;">
    <transform v-if="selected" :selected="selected"/>
    <detail v-if="selected" :selected="selected" style="margin-left: auto;"/>
    <prebuild :template="curedit.template" v-model="group">
      <span v-for="item, index in group && curedit.embeddings[0].hotspots">
        <ad-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="item.name" :item="item" :selected="selected" @action="item=>action(item, 'ad')"/>
      </span>
      <span v-for="item, index in group && curedit.embeddings[1].hotspots">
        <product-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="item.name" :item="item" :selected="selected" @action="item=>action(item, 'prod')"/>
      </span>
      <span v-for="item, index in group && curedit.embeddings[2].hotspots">
        <hotspot-mesh :url="item.img_url" :mesh="mesh(item)" :key="item.name" :item="item" :selected="selected" @action="item=>action(item, 'custom')"/>
      </span>
    </prebuild>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as THREEComponent from '@/components/THREE'
import transform from './transform'
import detail from './detail'
import * as THREE from 'three'

export default {
  data(){return {
    group: null,
    selected: null,
  }},
  props:['controls','editor', 'tag'],
  watch:{
    selected(next){
      if(next){
        let spherical = new THREE.Spherical()
        let pos =  this.group.getObjectByName(next.name) && this.group.getObjectByName(next.name).position.clone() || new THREE.Vector3(next.transform.position[0],next.transform.position[1],next.transform.position[2])
        pos.x *= -1; pos.y *= -1; pos.z *= -1;
        spherical.setFromVector3(pos)
        this.controls().setView(spherical.phi, spherical.theta)
      }
    },
  },
  components:{transform, detail, ...THREEComponent},
  methods:{
    setSelected(selected){
      this.selected = selected
    },
    action(item, tag){
      this.tag === tag &&
      this.editor.$refs.panel[0].setSelected(this.selected === item ? null : item)
    },
    mesh(item){return {
      position: (new THREE.Vector3()).fromArray(item.transform.position),
      quaternion: (new THREE.Quaternion()).fromArray(item.transform.rotation),
      scale: (new THREE.Vector3()).fromArray(item.transform.scale),
    }},
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'domElement']),
    ...mapState('editor',{
      curedit(state){ return state.curedit }
    }),
  }
}
</script>

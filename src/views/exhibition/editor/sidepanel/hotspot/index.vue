<template>
  <div class="absolute grid grid-centering grid-vertical" style="grid-template-rows: 1fr 40px; padding: 5px 0;">
    <div class="fill" style="position:relative">
      <list :source="curedit.embeddings[2].hotspots" :label="labels[2]+'（当前热点数：'+curedit.embeddings[2].hotspots.length+'）'" v-model="selected" @del="del" :clearable="true" ref="list"/>
    </div>
    <div style="background: #304156; width: 100%; position:relative;" class="centering">
      <el-button type="primary" style="width:100%" @click="add">添加热点</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import list from '../list'
import * as THREE from 'three'
import { v4 as uuid} from 'uuid'
import {addembed, delembed} from '@/api/server'
// import * as THREE from '@/components/THREE'

const labels = ['广告位热点', '产品位热点', '自定义热点']

export default {
  components:{list},
  data(){return {selected: null}},
  props:['editor'],
  watch:{
    selected(next){
      this.editor.$refs.tools.setSelected(next)
      let aim = next && this.$refs.list.$refs.table.$children[2].$children[this.curedit.embeddings[2].hotspots.indexOf(next)+1]
      aim && aim.$el.scrollIntoView()
    },
  },
  methods:{
    add(){
      var pos = new THREE.Vector3(0,0,-45)
      pos.applyQuaternion(this.camera.quaternion)
      var e = new THREE.Euler( 1.57, 1.57, 0, 'XYZ' );
      var q = (new THREE.Quaternion(0,0,0,1)).setFromEuler(e)
      var rot = this.camera.quaternion.clone().multiply(q)
      var spot = {
        name: uuid(),
        label: '新热点',
        transform: {
          position: [pos.x, pos.y, pos.z],
          rotation: [rot.x, rot.y, rot.z, rot.w],
          scale: [5, 5, 5],
          affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
        },
        type: 0,
        style: 1,
        img_url: null,
        target: {link:''},
        align: '4',
      }
      addembed({
        productId: this.product.product_id,
        sceneId: this.curedit.scene_id,
        group: 3,
        name: spot.name,
        label: spot.label,
        transform:spot.transform,
        type: spot.type,
        style: spot.style,
        img_url: spot.img_url,
        target: JSON.stringify(spot.target),
        align: spot.align,
      }).then((result)=>{
        spot.embed_id = result.embedId
        this.curedit.embeddings[2].hotspots.push(spot)
        this.selected = spot
      })
    },
    del(item){
      delembed({embedIds: item.embed_id})
      let index = this.curedit.embeddings[2].hotspots.indexOf(item)
      this.curedit.embeddings[2].hotspots.splice(index, 1)
      this.selected = null
    },
    setSelected(selected){
      this.selected = selected
    },
  },
  mounted(){},
  beforeDestroy(){},
  computed: {
    labels: () => labels,
    ...mapState('editor', ['curedit','product']),
    ...mapState('THREE', ['camera']),
  }
}
</script>

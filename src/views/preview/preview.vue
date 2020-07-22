<template>
  <span>
    <prebuild :template="curScene.template" v-model="group">
      <span v-for="item, index in group && curScene.embeddings[0].hotspots">
        <ad-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" @action="action" :hidden="!visible"/>
      </span>
    </prebuild>
    <prebuild :template="curScene.template" v-model="group">
      <span v-for="item, index in group && curScene.embeddings[1].hotspots">
        <product-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" @action="action" :hidden="!visible"/>
      </span>
    </prebuild>
    <prebuild :template="curScene.template" v-model="group">
      <span v-for="item, index in group && curScene.embeddings[2].hotspots">
        <hotspot-mesh :mesh="mesh(item)" :url="item.img_url" :key="index" :item="item" @action="action" :hidden="!visible"/>
      </span>
    </prebuild>
    <overlayer v-model="showDialog">
      <video v-if="link" :src="link" style="width:100%;height:100%;border:0;" controls x5-autoplay autoplay playsinline webkit-playsinline x5-playsinline/>
    </overlayer>
    <overlayer v-model="showWebDialog">
      <iframe :src="link" style="width:100%;height:100%;border:0;" frameborder="0" allowfullscreen/>
    </overlayer>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'
import * as three from 'three'
import overlayer from './advanced/overlayer'

function updateQueryStringParameter(uri, key, value) {
	if(!value) {
		return uri;
	}
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}

export default {
  components:{...THREE,overlayer},
  props:['curScene', 'visible'],
  data(){return {
      group: null,
      link: null,
      showDialog: null,
      showWebDialog: null,
  }},
  watch:{
    showDialog(next){
      this.$store.commit('preview/audio/SET_CAN_MUSIC_PLAY',!next)
      !next && (this.link = null)
    },
  },
  methods:{
    action(item){
      if(item.type === 1 && item.target.link){
        if(item.target.inline){
          this.link = updateQueryStringParameter(item.target.link,'openplace','inline')
          this.showWebDialog = true
        }else{
          this.$store.dispatch('preview/setCookies')
          var a = document.createElement('a');
          a.href = item.target.link
          a.click()
        }
      }
      else if (item.type===2 && item.target.scene_id) {
        this.$store.commit('preview/SET_CURSCENE_ID', this.product.scenes[item.target.scene_id].scene_id)
      }
      else if (item.type===3 && item.target.video) {
        this.link = item.target.video
        this.showDialog = true
      }
    },
    mesh(item){
      return {
        position: (new three.Vector3()).fromArray(item.transform.position),
        quaternion: (new three.Quaternion()).fromArray(item.transform.rotation),
        scale: (new three.Vector3()).fromArray(item.transform.scale)
      }
    },
  },
  created(){},
  computed:{
    ...mapState('THREE',['camera','domElement']),
    ...mapState('preview',['product','curSceneId'])
  }
}
</script>
<style scoped="three">
.event :hover{
  cursor: pointer;
  pointer-events: visible;
}
.dialog >>> .el-dialog{
  margin-top: 15vw;
  padding: 0;
  background: #0000;
}
.dialog >>> .el-dialog__header{
  padding: 0;
}
.dialog >>> .el-dialog__body{
  height: 70vw;
  padding: 0;
  overflow: hidden;
}
</style>

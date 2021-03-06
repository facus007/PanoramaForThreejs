<template>
  <span>
    <prebuild :template="curScene.template" v-model="group">
      <span v-for="item, index in group && curScene.embeddings[2].hotspots">
        <hotspot-mesh :mesh="mesh(item)" :url="item.img_url" :key="index" :item="item" @action="action" :hidden="!visible" style="z-index:2"/>
      </span>
      <span v-for="item, index in group && curScene.embeddings[0].hotspots">
        <ad-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" @action="action" :hidden="!visible"/>
      </span>
      <span v-for="item, index in group && curScene.embeddings[1].hotspots">
        <product-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" @action="action" :hidden="!visible"/>
      </span>
    </prebuild>
    <overlayer v-model="showDialog" class='event'>
      <video v-if="link" :src="link" style="width: calc(100% - 40px);height: calc(100% - 70px);  position: absolute; border:0;" controls x5-autoplay autoplay playsinline webkit-playsinline x5-playsinline/>
    </overlayer>
    <overlayer v-model="showWebDialog">
      <iframe :src="link" style="width: calc(100% - 40px);height: calc(100% - 70px);  position: absolute; border:0;" frameborder="0" allowfullscreen/>
    </overlayer>
    <overlayer v-model="showTextDialog" class="textframe">
      <quill-editor v-model="link" :options="{placeholder: '',modules:{toolbar:''}}" style="height: 100%; width: 100%; display: flex; flex-direction: column; background:white; border-radius: 10px; white-space: pre-wrap;" ref="editor" :disabled="true"/>
    </overlayer>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'
import * as three from 'three'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
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
  components:{...THREE,overlayer,quillEditor},
  props:['curScene', 'visible'],
  data(){return {
      group: null,
      link: null,
      showDialog: null,
      showWebDialog: null,
      showTextDialog: false,
  }},
  watch:{
    showDialog(next){
      this.$store.commit('preview/audio/SET_CAN_MUSIC_PLAY',!next)
      !next && (this.link = null)
    },
    showWebDialog(next){
      !next && (this.link = null)
    },
    showTextDialog(next){
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
      else if (item.type===4 && item.target.content) {
        this.link = item.target.content
        this.showTextDialog = true
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
.textframe >>> .ql-container{
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>

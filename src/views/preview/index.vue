<template>
  <div style="position: absolute; width: 100%; height: 100%;">
    <div v-if="product" class="home shadow" style="background: #304156; grid-area: a; position: relative; width:100%; height:100%">
      <THREE class="shadow" style="position: relative;">
        <span v-for="scene in product.scenes">
          <transition name="animate">
            <preview v-if="scene.scene_id===curSceneId" :curScene="scene" v-model="curSceneId" :key="scene.scene_id"/>
          </transition>
        </span>
      </THREE>
    </div>
    <div v-else v-loading='true' style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import preview from './preview'
import {getProduct, listHotspots} from '@/api/openserver'
import * as THREE from '@/components/THREE'

export default {
  components:{...THREE,preview},
  data(){return {
    product: null,
    // sceneIds: [],
    curSceneId: 0,
  }},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  created(){
    if(this.$route.query.product_id){
      getProduct({product_id: this.$route.query.product_id}).then(async result => {
        for (var i = 0; i < result.productInfo.scenes.length; i++) {
          let embeddings = await listHotspots({scene_id: result.productInfo.scenes[i].scene_id})
          result.productInfo.scenes[i].embeddings = embeddings.sceneInfo.embeddings || []
          var rebuild = [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
          result.productInfo.scenes[i].embeddings && result.productInfo.scenes[i].embeddings.forEach((item, i) => {
            item.hotspots && item.hotspots.forEach((item_) => {
              item_.target = item_.target && JSON.parse(item_.target)
              item_.attribute = item_.attribute && JSON.parse(item_.attribute)
            });
            rebuild[item.group-1] = item
          });
          result.productInfo.scenes[i].embeddings = rebuild

          this.curSceneId = result.productInfo.scenes[0].scene_id
          this.product = result.productInfo
          // this.sceneIds = this.product.scenes.map(scene=>scene.scene_id)
        }
      })
    }
  },
  destroyed(){},
  computed:{}
}
</script>

<style scoped>
.animate-enter-active, .animate-leave-active {
  transition: opacity .5s;
}
.animate-enter, .animate-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div style="position: absolute; width: 100%; height: 100%;">
    <preview v-if="curScene" :curScene="curScene"/>
    <div v-else v-loading='true' style="width: 100%; height: 100%;"/>
    <!-- <iframe v-else-if="false" width="100%" height="100%" src="/404"/> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import preview from './preview'
// import {getProduct} from './test'
import {getProduct, listHotspots} from '@/api/server'

export default {
  components: {preview},
  data(){return {curScene:null}},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  created(){
    if(this.$route.query.product_id){
      getProduct({product_id: this.$route.query.product_id}).then(async result => {
        let embeddings = await listHotspots({scene_id: result.productInfo.scenes[0].scene_id})
        result.productInfo.scenes[0].embeddings = embeddings.sceneInfo.embeddings
        result.productInfo.scenes[0].embeddings && result.productInfo.scenes[0].embeddings.forEach((item, i) => {
          item.hotspots && item.hotspots.forEach((item_, i) => {
            item_.target = JSON.parse(item_.target)
          });
        });
        this.curScene = result.productInfo.scenes[0]
      })
    }
  },
  destroyed(){
  }
}
</script>

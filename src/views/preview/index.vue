<template>
  <div style="position: absolute; width: 100%; height: 100%;">
    <div v-if="product" class="home shadow" style="background: #EEEEEE; grid-area: a; position: relative; width:100%; height:100%">
      <THREE class="shadow" style="position: relative;">
        <span v-for="scene in product.scenes">
          <transition name="el-fade-in">
            <preview v-if="scene.scene_id===curSceneId" :curScene="scene" v-model="curSceneId" :key="scene.scene_id"/>
          </transition>
        </span>
      </THREE>
      <backgroundmusic :product="product" style="position: absolute; top: 0; right: 0; padding:10px"/>
    </div>
    <div v-else v-loading='true' style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import preview from './preview'
import backgroundmusic from './backgroundmusic'
import {getProduct} from '@/utils/server'
import * as THREE from '@/components/THREE'

export default {
  components:{...THREE, preview, backgroundmusic},
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
      getProduct(this.$route.query.product_id, true).then(async result => {
        this.curSceneId = result.scenes[0].scene_id
        this.product = result
        document.title = this.product.name
      })
    }
  },
  destroyed(){},
  computed:{}
}
</script>
<style scoped>
</style>

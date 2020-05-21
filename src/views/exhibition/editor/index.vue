<template>
  <grid :grid="grid" v-loading="!sideImgs" style="grid-template-columns: 1fr 360px; grid-template-rows: 1fr 150px;">
    <div class="home" style="grid-area: a; padding: 10px; position: relative;">
      <THREE class="shadow" style="background:black; position: relative;" :isDebug="isDebug" :loadsource="loadsource">
        <CSS3DRenderer id="renderer">
          <stats v-if="isDebug"/>
          <orbit-controls style="z-index: 2"/>
          <panorama v-if="sideImgs" :sideImgs="sideImgs"/>
          <WebGLRenderer id="renderer" style="z-index: 1" :option="{alpha: true, antialias:true}">
            <model/>
          </WebGLRenderer>
          <view-tools style="z-index: 3"/>
        </CSS3DRenderer>
      </THREE>
    </div>
    <div class="shadow" style="background: #304156; grid-area: b;">
      <sidepanel/>
    </div>
    <div class="shadow" style="background: #304156; grid-area: c"/>
  </grid>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import sidepanel from './sidepanel'
import * as THREE from '@/components/THREE'
import store from './store'

import path from 'path'
import preprocessing from '@/utils/preprocessing'
const monoTexPath = path.join(__dirname,'../static/monotex.png')

const datalist = [0,1,2,3,4,5,6,7,8,9]
const grid = "'a b' 'c b'"

const moduleName = "editor"

export default {
  mixins:[mixin],
  components:{...THREE, sidepanel},
  data(){ return {
    isDebug: process.env.NODE_ENV === "development",
    total: 100,
    pageSize: 10,
    currentPage: 1,
    datalist,
    sideImgs: null,
  }},
  computed:{
    grid:() => grid,
    loadsource(){
      preprocessing(monoTexPath).then((result)=>{
        if(this) {
          this.sideImgs = result
        }
      })
    },
  },
  methods:{},
  created(){
    this.$store.registerModule(moduleName, store)
  },
  mounted(){

  },
  beforeDestroy(){

  },
  destroyed(){
    this.$store.unregisterModule(moduleName)
  }
}
</script>

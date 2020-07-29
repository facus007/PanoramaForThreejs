<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
    <main-view :getProduct="getProduct"/>
    <loading/>
    <el-button @click="click" size=small class="back"><span style="position:absolute;left:5px;">&lt;</span>返回</el-button>
  </div>
</template>

<script>
import browser from '@/utils/browser'
import { getProduct } from '@/utils/server'
import { getshareconfig } from '@/api/server'
import wx from 'weixin-js-sdk';
import store from '@/components/Preview/store'
import Loading from '@/components/Preview/loading'

export default {
  components:{MainView: async() => {
    if(browser.versions.weixin){
      var {data} = await getshareconfig({url: location.href.slice(0,location.href.indexOf('#'))})
      wx.config({appId: data.appid,timestamp: data.timestamp,nonceStr: data.nonceStr,signature: data.signature,});
      var ready = new Promise(function(resolve, reject) {
        wx.ready(function(){resolve()});
      });
      await ready
    }
    return await import(/* webpackChunkName: "chunk-preview-main" */ '@/components/Preview/mainview')
  }, Loading},
  created(){this.$store.registerModule('preview', store)},
  destroyed(){this.$store.unregisterModule('preview')},
  computed:{
    getProduct:_=>getProduct,
  },
  methods:{
    click(){
      this.$router.push({path:'/exhibition/editor', query: { product_id: this.$route.query.product_id }})
    }
  }
}

</script>
<style scoped>
.back{
  right: -90px;
  width: 100px;
  top: 5px;
  position:absolute;
  margin: 0px;
  z-index: 30;
  background:#000;
  opacity: .5;
  color: #fff;
  border: 0;
}
.back:hover{
  right: 0px;
}
</style>

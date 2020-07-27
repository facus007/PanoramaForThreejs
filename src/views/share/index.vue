<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
    <main-view :getProduct="getProduct"/>
    <loading/>
  </div>
</template>

<script>
import browser from '@/utils/browser'
import { getProduct } from '@/utils/server'
import { getshareconfig } from '@/api/server'
import wx from 'weixin-js-sdk';
import store from '@/views/preview/store'
import Loading from '@/views/preview/loading'

export default {
  components:{ MainView: async () => {
    if(browser.versions.weixin){
      var {data} = await getshareconfig({url: location.href.slice(0,location.href.indexOf('#'))})
      wx.config({appId: data.appid,timestamp: data.timestamp,nonceStr: data.nonceStr,signature: data.signature,});
      var ready = new Promise(function(resolve, reject) {
        wx.ready(resolve);
      });
      await ready
    }
    return await import(/* webpackChunkName: "chunk-preview-main" */ '@/views/preview/mainview')
  }, Loading},
  created(){this.$store.registerModule('preview', store)},
  destroyed(){
    this.$store.unregisterModule('preview')
  },
  computed:{
    getProduct:_=>getProduct,
  },
}

</script>

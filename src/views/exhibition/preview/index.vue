<template>
  <div class="absolute centering" style="z-index: 5;">
    <main-view :getProduct="getProduct"/>
    <loading/>
    <back/>
  </div>
</template>

<script>
import browser from '@/utils/browser'
import { getProduct } from '@/utils/server'
import { getshareconfig } from '@/api/server'
import wx from 'weixin-js-sdk';
import store from '@/components/Preview/store'
import Loading from '@/components/Preview/loading'

import back from './back'

export default {
  components:{MainView: async() => {
    if(browser.versions.weixin){
      var {data} = await getshareconfig({url: location.href.slice(0,location.href.indexOf('#'))})
      wx.config({appId: data.appid,timestamp: data.timestamp,nonceStr: data.nonceStr,signature: data.signature,});
      var ready = new Promise(function(resolve, reject) {
        wx.ready(resolve);
      });
      await ready
    }
    return await import(/* webpackChunkName: "chunk-preview-main" */ '@/components/Preview/mainview')
  }, Loading, back},
  created(){this.$store.registerModule('preview', store)},
  destroyed(){this.$store.unregisterModule('preview')},
  computed:{
    getProduct:_=>getProduct,
  },
}

</script>

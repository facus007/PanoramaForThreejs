<template>
  <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 5;">
    <main-view v-model="loading"/>
    <loading v-if="loading" loading="loading"/>
  </div>
</template>

<script>
import Loading from './loading'
import Cookies from 'js-cookie'
import browser from '@/utils/browser'
import {getshareconfig} from '@/api/server'

export default {
  components:{MainView: async() => {
    if(browser.versions.weixin){
      var {data} = await getshareconfig({url: location.href.slice(0,location.href.indexOf('#'))})
      var wx = await import('weixin-js-sdk');
      wx.config({appId: data.appid,timestamp: data.timestamp,nonceStr: data.nonceStr,signature: data.signature,});
      var ready = new Promise(function(resolve, reject) {
        wx.ready(function(){resolve()});
      });
      await ready
    }
    return await import('./mainview')
  }, Loading},
  data(){return{
    loading: true,
    // loading: !Cookies.get('vrpreivew' + this.$route.query.product_id)
  }},
  computed:{}
}

</script>

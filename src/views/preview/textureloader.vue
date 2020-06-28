<template>
</template>

<script>
import * as three from 'three'
import multiaction from '@/utils/multiaction'
const texloader = new three.TextureLoader()

export default {
  props:['value'],
  data(){return {
    textures: {},
    loaders: []
  }},
  methods:{
    async load(scene, onloadblur, onloadclear){
      this.textures[scene.scene_id] = []
      for (var i = 1; i <= 6; i++) {
        this.textures[scene.scene_id][i-1] = {}
      }

      // await multiaction(new Array(6), async (item, i) => {
      //   let url = scene['pano_graphic_blur_url'+(i+1)].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
      //   let index = i
      //   this.textures[scene.scene_id][index].clear = await this.loadtex(url)
      // })
      //
      // onloadblur && onloadblur()

      await multiaction(new Array(6), async (item, i) => {
        let url = scene['pano_graphic_url'+(i+1)].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
        let index = i
        this.textures[scene.scene_id][index].clear = await this.loadtex(url)
      })

      onloadclear && onloadclear()
    },
    loadtex(url) {
      return new Promise((resolve, reject) => {
        let loader = () => texloader.load(url, resolve, null, ( err ) => {
          loader()
	      })
        this.loaders.push(loader())
      });
    },
  },
  created(){
    this.$emit('input',this.textures)
  },
  destroyed(){
    this.loaders.forEach((item, i) => {
      item.dispose()
    });
  }
}
</script>

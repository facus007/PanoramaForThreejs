<template>
</template>

<script>
import * as three from 'three'
const texloader = new three.TextureLoader()

export default {
  props: ['product', 'scene', 'value'],
  data(){return {
    loaders: [],
    textures: {}
  }},
  methods:{
    async load(){
      this.product.scenes.forEach((item, i) => {
        this.textures[item.scene_id] = {}
      })

      // load first
      this.textures[this.scene.scene_id].clear = []
      for (var i = 1; i <= 6; i++) {
        let url = this.scene['pano_graphic_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
        let index = i - 1
        !this.dispose && this.loadtex(url).then(tex => {
          this.textures[this.scene.scene_id].clear[index] = tex
          this.loadafter()
        })
      }
    },
    async unload(){
      this.dispose = true
      this.loaders.forEach((item, i) => {
        item.dispose()
      });
    },
    async loadafter(){
      for(var i = 0; i < 6; i++){
        if(!this.textures[this.scene.scene_id].clear[i]){return}
      }

      this.$emit('input', this.textures)
      this.$emit('first_load')

      // load after
      this.product.scenes.forEach(async (item, i) => {
        this.textures[item.scene_id].blur = this.textures[item.scene_id].blur || []
        for (var i = 1; i <= 6; i++) {
          let url = item['pano_graphic_blur_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
          !this.dispose && !this.textures[item.scene_id].blur[i-1] && this.textures[item.scene_id].blur.push(await this.loadtex(url))
        }
      });
      this.product.scenes.forEach(async(item, i) => {
        this.textures[item.scene_id].clear = this.textures[item.scene_id].clear || []
        for (var i = 1; i <= 6; i++) {
          let url = item['pano_graphic_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
          !this.dispose && !this.textures[item.scene_id].clear[i-1] && this.textures[item.scene_id].clear.push(await this.loadtex(url))
        }
      });
    },
    loadtex(url) {
      return new Promise((resolve, reject) => {
        let loader = () => texloader.load(url, resolve, null, ( err ) => {
          loader()
	      })
        this.loaders.push(loader())
      });
    }
  },
  created(){
    this.load()
  },
  destroyed(){
    this.unload()
  }
}
</script>

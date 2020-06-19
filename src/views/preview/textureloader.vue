<template>
</template>

<script>
import * as three from 'three'
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

      let checkResourceblur = ()=>{
        for(var i = 0; i < 6; i++){
          if(!this.textures[scene.scene_id][i].blur){return false}
        }
        return true
      }

      let pblur = new Promise((resolve, reject) => {
        let a = ()=>{
          if(checkResourceblur()){resolve()}
          else{requestAnimationFrame(a)}
        }
        a()
      });

      for (var i = 1; i <= 6; i++) {
        let url = scene['pano_graphic_blur_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
        let index = i - 1
        this.loadtex(url).then(tex => this.textures[scene.scene_id][index].blur = tex)
      }

      await pblur
      onloadblur && onloadblur()

      let checkResourceclear = ()=>{
        for(var i = 0; i < 6; i++){
          if(!this.textures[scene.scene_id][i].clear){return false}
        }
        return true
      }

      let pclear = new Promise((resolve, reject) => {
        let a = ()=>{
          if(checkResourceclear()){resolve()}
          else{requestAnimationFrame(a)}
        }
        a()
      });

      for (var i = 1; i <= 6; i++) {
        let url = scene['pano_graphic_url'+i].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
        let index = i - 1
        this.loadtex(url).then(tex => this.textures[scene.scene_id][index].clear = tex)
      }
      
      await pclear
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

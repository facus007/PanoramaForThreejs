<template>
  <div style="display:flex; padding: 0 20px; align-items: center;width: 100%; height: 100%;" :autosave="autosave">
    <el-checkbox v-model="setting.autosave"><span style="color: white;">自动保存</span></el-checkbox>
    <el-button type="text" icon="el-icon-edit" style="padding: 0; margin-left: auto; color: white; font-size:20px;" @click="save"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import { saveVR } from '@/api/server'

const moduleName = "editor"

export default {
  mixins:[mixin],
  watch:{},
  methods:{
    save(){
      var scenes=[]
      this.product.scenes.forEach((item, i) => {
        var embeddings = []
        item.embeddings && item.embeddings.forEach((item_, i) => {
          embeddings[i] = embeddings[i] || {}
          embeddings[i].group = item_.group
          var hotspots = []
          item_.hotspots && item_.hotspots.forEach((item__, i) => {
            hotspots[i] = hotspots[i] || {}
            hotspots[i].embedId = item__.embed_id
            hotspots[i].name = item__.name
            hotspots[i].transform = {position: item__.transform.position, rotation: item__.transform.rotation, scale: item__.transform.scale, affine_transform: item__.transform.affine_transform}
            hotspots[i].type = item__.type
            hotspots[i].style = item__.style
            hotspots[i].imgUrl = item__.img_url
            hotspots[i].label = item__.label
            hotspots[i].target = JSON.stringify({link: item__.target.link, sceneId: item__.target.scene_id, text: item__.target.text})
          });
          embeddings[i].hotspots = hotspots
        });
        scenes[i] = scenes[i] || {}
        scenes[i].sceneId = item.scene_id
        scenes[i].name = item.name
        scenes[i].cover = item.cover
        scenes[i].fov = item.fov
        scenes[i].startRotation = item.start_rotation
        scenes[i].embeddings = embeddings
      });
      saveVR({
        name: this.product.name,
        productId: this.product.product_id,
        description: this.product.description,
        cover: this.product.cover,
        scenes: scenes,
      }).then((result)=>{
        this.$store.commit(moduleName+'/SET_CURSAVE', JSON.stringify(this.curedit))
        console.log(result)
      })
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting','curedit','cursave']),
    autosave(){
      if(this.setting.autosave && JSON.stringify(this.curedit)!==this.cursave){
        this.save()
      }
      return this.cursave
    },
  },
}
</script>

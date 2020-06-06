<template>
  <div style="display:flex; padding: 0 20px; align-items: center;width: 100%; height: 100%;">
    <el-button type="primary" style="margin: 10px; width: 100%; height: 100%;" @click="fill">
      填充随机热点
    </el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import { saveVR } from '@/api/server'

const moduleName = "editor"

export default {
  mixins:[mixin],
  methods:{
    fill(){
      // var tmps = (await listRandomHotspots({tmp_group_id:this.template.tmp_group_id})).tmps
      // var embeddings = []
      // tmps[i].embeddings && tmps[i].embeddings.forEach((item_, i) => {
      //   embeddings[i] = embeddings[i] || {}
      //   embeddings[i].group = item_.group
      //   var hotspots = []
      //   item_.hotspots && item_.hotspots.forEach((item__, i) => {
      //     hotspots[i] = hotspots[i] || {}
      //     hotspots[i].embedId = item__.embed_id
      //     hotspots[i].name = item__.name
      //     hotspots[i].transform = {position: item__.transform.position, rotation: item__.transform.rotation, scale: item__.transform.scale, affine_transform: item__.transform.affine_transform}
      //     hotspots[i].type = item__.type
      //     hotspots[i].style = item__.style
      //     hotspots[i].imgUrl = item__.img_url
      //     hotspots[i].label = item__.label
      //     hotspots[i].target = item__.target
      //     hotspots[i].attribute = JSON.stringify({})
      //   });
      //   embeddings[i].hotspots = hotspots
      // });
      // scenes.push({...defaultScene, tmpId: item.tmp_id, name: '场景' + (1+i), embeddings: embeddings})
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting', 'curedit', 'cursave']),
  },
}
</script>

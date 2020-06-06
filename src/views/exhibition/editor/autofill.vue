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
import { listRandomHotspots } from '@/api/server'

const moduleName = "editor"

export default {
  mixins:[mixin],
  methods:{
    fill(){
      listRandomHotspots({tmp_group_id:this.product.tmp_group_id}).then(({tmps}) => {
        this.product.scenes.forEach((item, i) => {
          item.embeddings[0].hotspots = tmps[i].embeddings[0].hotspots
          item.embeddings[0].hotspots.forEach((item_, i) => {
            item_.target = JSON.parse(item_.target)
          });
          item.embeddings[1].hotspots = tmps[i].embeddings[1].hotspots
          item.embeddings[1].hotspots.forEach((item_, i) => {
            item_.target = JSON.parse(item_.target)
          });
        });
      })
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting', 'curedit', 'cursave']),
  },
}
</script>

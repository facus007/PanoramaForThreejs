<template>
  <div style="display:flex; padding: 0 20px; align-items: center;width: 100%; height: 100%;">
    <el-button type="primary" style="margin: 10px; width: 100%; height: 100%;" @click="fill" v-loading="loading">
      批量填充热点（所选参展商）
    </el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

const moduleName = "editor"

export default {
  mixins:[mixin],
  data(){return {
    loading: false,
  }},
  methods:{
    fill(){
      this.loading = true
      this.$store.dispatch(moduleName + '/randomHotspots').then(()=>{
        this.loading = false
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

<template>
  <el-button type="primary" style="width: 100%; height: 100%;" @click="showBox" v-loading="loading">
    上传资源
  </el-button>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

const moduleName = "editor"

export default {
  mixins:[mixin],
  data(){return {
    loading: false,
    dialogVisible: false,
  }},
  methods:{
    showBox(){
      this.$emit('openAdvsSouceFrame', true)
      this.dialogVisible = true
    },
    handleClose(done) {
    },
    fill(batchNo){
      if(batchNo){
        this.loading = true
        this.$store.dispatch('editor' + '/setExhibition', {batch_no: batchNo}).then(()=>{
          this.loading = false
        })
      }
    },
    fillAds(batchNo){
      if(batchNo){
        this.loading = true
        this.$store.dispatch('editor' + '/setExhibitionAds', {batch_no: batchNo}).then(()=>{
          this.loading = false
        })
      }
    },
    fillProduct(batchNo){
      if(batchNo){
        this.loading = true
        this.$store.dispatch('editor' + '/setExhibition', {batch_no: batchNo}).then(()=>{
          this.loading = false
        })
      }
    },
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting', 'curedit', 'cursave']),
  },
}
</script>

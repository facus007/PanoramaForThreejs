<template>
  <container v-if="this.$route.query.product_id">
    <editor v-if="$store.state.editor.product && $store.state.editor.curedit"/>
    <div v-else v-loading='true' style="width: 100%; height: 100%;"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import editor from './editor'
import store from './store'

const moduleName = "editor"

export default {
  mixins:[mixin],
  components: {editor},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  created(){
    if(!this.$route.query.product_id){
      this.$router.push('/exhibition/list')
      return
    }
    this.$store.registerModule(moduleName, store)
    this.$store.dispatch(moduleName + '/init', this.$route.query.product_id)

  },
  destroyed(){
    if(this.$store.hasModule(moduleName)){
      this.$store.dispatch(moduleName + '/deinit')
      this.$store.unregisterModule(moduleName)
    }
  }
}
</script>

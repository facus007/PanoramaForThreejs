<template>
  <container>
    <editor v-if="$store.state.editor.product"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import editor from './editor'
import store from './store'

const moduleName = "editor"
const product_id = -1

export default {
  mixins:[mixin],
  components: {editor},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  created(){
    this.$store.registerModule(moduleName, store)
    this.$store.dispatch(moduleName + '/init', product_id)
  },
  destroyed(){
    this.$store.dispatch(moduleName + '/deinit')
    this.$store.unregisterModule(moduleName)
  }
}
</script>

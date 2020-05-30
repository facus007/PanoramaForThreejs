<template>
  <container>
    <preview v-if="curedit" :curedit="curedit"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import preview from './preview'
import {getProduct} from './test'

export default {
  mixins:[mixin],
  components: {preview},
  data(){return {curedit:null}},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  created(){
    getProduct().then(result => this.curedit = result.scenes[0])
  },
  destroyed(){
  }
}
</script>

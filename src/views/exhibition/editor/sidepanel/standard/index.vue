<template>
  <container class="home" style="display: flex; flex-direction: column;">
    <thumbnail :sideImgs="sideImgs"/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/>
    <description/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import thumbnail from './thumbnail'
import description from './description'

export default {
  mixins:[mixin],
  components:{thumbnail,description},
  props:['sideImgs'],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>

<template>
  <container class="home" style="display: flex; flex-direction: column;">
    <thumbnail :sideImgs="sideImgs"/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/>
    <description/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/>
    <animation/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/>
    <!-- <backgroundmusic/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/> -->
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import thumbnail from './thumbnail'
import description from './description'
import animation from './animation'
// import backgroundmusic from './backgroundmusic'

export default {
  mixins:[mixin],
  components:{thumbnail,description,animation},
  props:['sideImgs'],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>

<template>
  <div class="absolute grid grid-vertical grid-centering" style="grid-template-rows: auto 1px auto 10px auto 1px 1fr; padding: 5px 0;">
    <thumbnail :sideImgs="sideImgs"/>
    <div style="background: gray; height: 1px; width: 100%;"/>
    <description/>
    <div/>
    <animation/>
    <div style="background: gray; height: 1px; width: 100%;"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import thumbnail from './thumbnail'
import description from './description'
import animation from './animation'
// import backgroundmusic from './backgroundmusic'

export default {
  components:{thumbnail,description,animation},
  props:['sideImgs'],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>

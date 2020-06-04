<template>
  <container class="home" style="display: flex; flex-direction: column;">
    <!-- <preview/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/> -->
    <fieldofview/>
    <div style="background: gray; height: 1px; width: 100%; margin: 5px 0;"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import preview from './preview'
import fieldofview from './fieldofview'
import * as THREE from '@/components/THREE'

export default {
  mixins:[mixin],
  components:{ ...THREE, preview, fieldofview},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>

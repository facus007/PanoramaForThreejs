<template>
  <div class="absolute grid grid-vertical" style="grid-template-rows: auto 1fr; padding: 5px 0;">
    <fieldofview/>
    <div style="background: gray; height: 1px; width: 100%;"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fieldofview from './fieldofview'
import * as THREE from '@/components/THREE'

export default {
  components:{ ...THREE, fieldofview},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>

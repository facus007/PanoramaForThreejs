<template>
  <span><slot/></span>
</template>
<script>
import * as THREE from 'three'
import { mapState } from 'vuex'

export default {
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
  }
}
</script>

<template>
  <container class="home" style="display: flex; flex-direction: column;">
    <list/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import list from './list'
import * as THREE from '@/components/THREE'

export default {
  mixins:[mixin],
  components:{ ...THREE, list},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
}
</script>

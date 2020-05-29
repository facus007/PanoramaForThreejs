<template>
  <container class="home" style="display: grid; overflow: hidden; grid-gap: 10px;">
    <list :source="curedit.embeddings[0].hotspots" :label="labels[0]"/>
    <list :source="curedit.embeddings[1].hotspots" :label="labels[1]"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import list from './list'
import * as THREE from '@/components/THREE'

const labels = ['广告位热点', '产品位热点', '自定义热点']

export default {
  mixins:[mixin],
  components:{ ...THREE, list},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  computed: {
    labels: () => labels,
    ...mapState('editor', ['curedit']),
  }
}
</script>

<template>
  <container class="home" style="display: grid; overflow: hidden; grid-gap: 10px; grid-template-rows:1fr 1fr">
    <div style="height: 100%; width: 100%; position: relative; overflow: auto;">
      <list :source="curedit.embeddings[1].hotspots" :label="labels[1]" v-model="selected"/>
    </div>
    <div style="height: 100%; width: 100%; position: relative; ">
      <batch :source="curedit.embeddings[1].hotspots"/>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import list from './list'
import batch from './batch'
import * as THREE from '@/components/THREE'

const labels = ['广告位热点', '产品位热点', '自定义热点']

export default {
  mixins:[mixin],
  components:{ ...THREE, list, batch},
  data(){return {selected: null}},
  props:['editor'],
  watch:{
    selected(next){
      this.editor.$refs.tools.setSelected(next)
    }
  },
  methods:{},
  mounted(){},
  beforeDestroy(){},
  computed: {
    labels: () => labels,
    ...mapState('editor', ['curedit']),
  }
}
</script>

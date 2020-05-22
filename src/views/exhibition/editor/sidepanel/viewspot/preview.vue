<template>
  <div class="frame">
    <div style="width: 200px;">当前初始视角</div>
    <img v-if="preview" style="width: 200px; height: 100px; border-radius: 5px; box-shadow: 0 0 4px 0 gray" :src="preview"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'

export default {
  mixins:[mixin],
  components:{ ...THREE},
  watch:{},
  methods:{
  },
  computed:{
    ...mapState('THREE',['scene', 'camera']),
    ...mapState('editor',['preview']),
  },
}
</script>

<style scoped="views">
.frame {
  width: 100%;
  height: 190px;
  display:flex;
  margin: 5px 0;
  justify-content: center;
  padding: 15px 0px;
  flex-flow: wrap;
}
</style>

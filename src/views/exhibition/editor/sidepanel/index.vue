<template>
  <el-tabs class="sidepanel fill" v-model="curFeature" tabPosition="right" lazy style="color: white; padding: 10px; font-size: 14px; font-weight: bold;">
    <slot></slot>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

export { default as standard } from './standard'
export { default as viewspot } from './viewspot'
export { default as adspot } from './adspot'
export { default as hotspot } from './hotspot'
export { default as productspot } from './productspot'
export { default as advanced } from './advanced'

export const sidepanel = {
  mixins:[mixin],
  data(){return {
    curFeature: null,
  }},
  props: ['value'],
  watch:{
    curFeature(next, pre){this.$emit('input', next)},
  },
  methods:{},
  mounted(){},
  beforeDestroy(){}
}

export default sidepanel;
</script>

<style scoped>
.sidepanel >>> .el-tabs__item{
  color: white;
  padding: 0 10px;
  width: 90px;
}
.sidepanel >>> .el-tabs__item.is-active{
  color: #409EFF;
}
.sidepanel >>> .el-tabs__content{
  height: 100%;
  overflow: auto;
}
</style>

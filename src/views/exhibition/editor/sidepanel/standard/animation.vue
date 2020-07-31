<template>
  <div class="fill grid grid-horizontal grid-centering">
    <div style="justify-self: flex-start;">动画设置</div>
    <el-checkbox v-model="product.animation" style="margin-left: auto">小行星动画</el-checkbox>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

export default {
  mixins:[mixin],
  data(){return{}},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('editor',['product'])
  }
}
</script>

<style scoped="views">
.form >>> .el-form-item__label{
  color: white;
}
.frame >>> .el-checkbox__label{
  color: white;
}
</style>

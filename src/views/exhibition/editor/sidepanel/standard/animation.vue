<template>
  <div class="frame">
    <div>动画设置</div>
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
.frame {
  width: 100%;
  display:flex;
  margin: 5px 0;
  justify-content: center;
  padding: 15px 0px;
  flex-flow: wrap;
  align-content: space-between;
}
.form >>> .el-form-item__label{
  color: white;
}
.frame >>> .el-checkbox__label{
  color: white;
}
</style>

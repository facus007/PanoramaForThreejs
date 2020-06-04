<template>
  <div class="frame">
    <el-form class="form" ref="form" :model="product" size="small" style="width: 100%;">
      <el-form-item label="标题" style="margin-bottom:0">
        <el-input v-model="product.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-bottom:0">
        <el-input type="textarea" v-model="product.description"></el-input>
      </el-form-item>
    </el-form>
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
</style>

<template>
  <div class="fill grid grid-centering">
    <el-form class="form" ref="form" :model="product" size="small" style="width: 100%;">
      <el-form-item label="作品标题" style="margin-bottom:0">
        <el-input v-model="product.name" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="作品描述" style="margin-bottom:0">
        <el-input type="textarea" v-model="product.description" :rows="3" style="width: 100%;" show-word-limit :maxlength="50" resize="none"></el-input>
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
.form >>> .el-form-item__label{
  color: white;
}
.form >>> .el-input__count{
  height: 12px;
  line-height: normal;
}
</style>

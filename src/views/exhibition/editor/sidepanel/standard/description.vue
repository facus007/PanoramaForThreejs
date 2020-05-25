<template>
  <div class="frame">
    <el-form class="form" ref="form" :model="form" size="small" style="width: 100%;">
      <el-form-item label="分类" style="margin-bottom:0">
        <el-select v-model="form.region" placeholder="未分类" style="width: 100%;">
          <!-- <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="标题" style="margin-bottom:0">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-bottom:0">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

export default {
  mixins:[mixin],
  data(){return{
    form:{},
  }},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
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

<template>
  <el-dialog title="新功能" :visible.sync="visible" width="50%" :modal="false">
    <el-form v-if="visible" label-position="right" label-width="100px">
      <el-form-item label="功能名称">
        <el-input size="small" v-model="name" style="width: 200px" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="选择图标">
        <el-button class="upload" type="text" @click="onChange" style="width: 200px; height: 100px; border-radius: 5px; border: 1px dashed gray; position:ralative;">
          <el-image v-if="cover" :src="cover" fit="contain" style="position:absolute; width: 200px; height: 100px;left:0;top:0; padding:1px;"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input', false)">取 消</el-button>
      <el-button type="primary" @click="commit">新 建</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){ return {
    name: null,
    cover: null,
    visible: false,
    showDialog: false,
  }},
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){this.visible = next},
  },
  props:['value'],
  methods:{
    onChange(){
      this.showDialog = true
    },
    commit(){
      this.product.features = this.product.features || []
      this.product.features.push({
        name: '新扩展'
      })
      this.$emit('input', false)
    }
  },
  computed:{
    ...mapState('editor',['product']),
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

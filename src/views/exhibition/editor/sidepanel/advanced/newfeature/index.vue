<template>
  <el-dialog title="新功能" :visible.sync="visible" width="50%" :modal="false">
    <el-form v-if="visible" label-position="right" label-width="100px">
      <el-form-item label="功能名称">
        <el-input size="small" v-model="name" style="width: 200px" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="功能类型">
        <el-select size="small" v-model="type">
          <el-option v-for="item in types" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select>
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
import { v4 as uuid} from 'uuid'

const types = [
  {key:'music', label:'音乐'},
  {key:'imagef', label:'图片'},
  {key:'linkf', label:'超链接'},
  {key:'hypertext', label:'富文本'},
]

export default {
  data(){ return {
    name: null,
    cover: null,
    type: null,
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
      console.log(this.type)
      this.product.features.push({
        name: this.name || '新扩展',
        uuid: uuid(),
        type: this.type,
        size: '1 x 1',
        position: {group: 0, x: 0, y: 0}
      })
      this.$emit('input', false)
    }
  },
  computed:{
    ...mapState('editor',['product']),
    types:_=>types,
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

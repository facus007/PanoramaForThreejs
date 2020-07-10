<template>
  <el-dialog title="新功能" :visible.sync="visible" width="50%" :modal="false">
    <el-form v-if="visible" label-position="right" label-width="100px">
      <el-form-item label="功能名称">
        <el-input size="small" v-model="option.name" style="width: 200px" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="功能类型">
        <el-select size="small" v-model="option.type">
          <el-option v-for="item in types" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="background: rgb(48, 65, 86); padding: 20px">
      <component :is="option.type" :item="option"/>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input', false)">取 消</el-button>
      <el-button type="primary" @click="commit">新 建</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { v4 as uuid} from 'uuid'
import hypertext from '../hypertext'
import imagef from '../imagef'
import linkf from '../linkf'
import music from '../backgroundmusic'

const types = [
  {key:'imagef', label:'图片'},
  {key:'music', label:'音乐'},
  {key:'linkf', label:'超链接'},
  {key:'hypertext', label:'富文本'},
]

export default {
  data(){ return {
    option: {type: 'imagef'},
    visible: false,
    showDialog: false,
  }},
  components:{hypertext,imagef,linkf,music},
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
        name: this.option.name || '新扩展',
        uuid: uuid(),
        type: this.option.type,
        url: "https://manager.flycloudinfo.com/websources/image/20200618/6bfd04f4-1a0b-4c61-8c95-0049eab6ba53.jpeg",
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

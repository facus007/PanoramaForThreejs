<template>
  <el-dialog title="新功能" :visible.sync="visible" width="50%" :modal="false">
    <div class="dialog">
    <el-form v-if="visible" label-position="right" label-width="70px">
      <el-form-item label="功能名称">
        <el-input size="small" v-model="option.name" style="width: 200px" show-word-limit :maxlength="20" :minlength="4"></el-input>
      </el-form-item>
      <el-form-item label="功能类型">
        <el-select size="small" v-model="option.type">
          <el-option v-for="item in types" :key="item.key" :label="item.label" :value="item.key" :disabled="(item.key === 'music') && musicExist"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="padding: 20px">
      <component :is="option.type" :item="option"/>
    </div>
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
import scene from '../scene'
import music from '../backgroundmusic'
import info from '../info'

const types = [
  {key:'imagef', label:'图标', name: '新建图标'},
  {key:'music', label:'音乐', name: '新建背景音乐'},
  {key:'linkf', label:'超链接', name: '新建超链接'},
  {key:'hypertext', label:'富文本', name: '新建富文本'},
  {key:'info', label:'简介', name: '新建简介'},
  {key:'scene', label:'场景列表', name: '新建场景列表'}
]

export default {
  data(){ return {
    option: {type: 'imagef'},
    visible: false,
    showDialog: false,
  }},
  components:{hypertext,imagef,linkf,music,scene,info},
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){this.visible = next; this.option = {type: 'imagef'}},
  },
  props:['value'],
  methods:{
    onChange(){
      this.showDialog = true
    },
    commit(){
      this.product.features = this.product.features || []
      let feature = {
        ...this.option,
        uuid: uuid(),
        size: '1 x 1',
        position: {group: 0, x: 0, y: 0},
        name: this.option.name || types.filter(item=>item.key === this.option.type)[0].name,
        url: this.option.url || '',
        link: this.option.link || '',
        content: this.option.content || '',
      }
      this.product.features.push(feature)
      this.product.features = JSON.parse(JSON.stringify(this.product.features))

      this.$emit('input', false)
    }
  },
  computed:{
    ...mapState('editor',['product']),
    types:_=>types,
    musicExist(){
      return this.product.features.filter(item=>item.type === 'music').length > 0
    }
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped>
.dialog{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

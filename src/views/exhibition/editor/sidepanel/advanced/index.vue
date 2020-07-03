<template>
  <container class="home" style="display: grid; overflow: hidden; grid-gap: 10px;">
    <div style="height: 100%; width: 100%; position: relative; overflow: auto;">
      <list :source="product.features || []" label="扩展组件" v-model="selected" @del="del" :clearable="true" ref="list"/>
    </div>
    <div style="height: 100%; width: 100%; position: relative; overflow: auto;">
      <el-button type="primary" style="width:100%" @click="add">添加组件</el-button>
    </div>
    <newfeature v-model="showDialog"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import list from '../list'
import newfeature from './newfeature'

export default {
  mixins:[mixin],
  props:['editor'],
  watch:{
    selected(next){
      this.editor.$refs.tools.setSelected(next)
    },
  },
  data(){return {
    selected: null,
    showDialog: false,
  }},
  components:{list, newfeature},
  mounted(){},
  beforeDestroy(){},
  methods: {
    add(){
      this.showDialog = true
    },
    del(row){
      console.log(row)
      // this.product.features
    },
  },
  computed: {
    ...mapState('editor', ['product']),
  }
}
</script>

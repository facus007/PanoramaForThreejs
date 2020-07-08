<template>
  <container class="home" style="display: grid; overflow: hidden; grid-gap: 10px;">
    <div style="height: 100%; width: 100%; position: relative; overflow: auto;">
      <list :source="product.features || []" label="扩展组件" v-model="selected" @del="del" :clearable="true" ref="list"/>
    </div>
    <sizes :selected="selected"/>
    <component :is="selected && selected.type || 'empty'"/>
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
import music from './backgroundmusic'
import empty from './empty'
import sizes from './sizes'

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
  components:{list, newfeature, music, empty, sizes},
  mounted(){
    this.product.features = this.product.features || []
    if(this.product.music_url && this.product.features.filter(item=>item.type==='music').length === 0){ // 旧版本兼容
      this.product.features.push({
        name: '背景音乐',
        type: 'music',
        url: this.product.music_url,
        loop: this.product.loop,
        size: '1 x 1'
      })
    }
  },
  beforeDestroy(){},
  methods: {
    add(){
      this.showDialog = true
    },
    del(row){
      if(row.type = 'music'){ // 旧版本兼容
        this.product.music_url = undefined
        this.product.loop = undefined
      }
      let index = this.product.features.indexOf(row)
      this.product.features.splice(index, 1)
    },
  },
  computed: {
    ...mapState('editor', ['product']),
  }
}
</script>

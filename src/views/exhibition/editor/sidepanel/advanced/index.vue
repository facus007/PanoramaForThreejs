<template>
  <container class="home" style="display: grid; overflow: hidden; grid-gap: 10px; ">
    <div style="height: 100%; width: 100%; position: relative; overflow: auto;">
      <list :source="product.features || []" label="扩展组件" v-model="selected" @del="del" :clearable="true" ref="list"/>
    </div>
    <sizes :selected="selected"/>
    <component :is="selected && selected.type || 'empty'" :item="selected"/>
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
import linkf from './linkf'
import imagef from './imagef'
import hypertext from './hypertext'
import empty from './empty'
import scene from './scene'
import sizes from './sizes'
import info from './info'
import { v4 as uuid} from 'uuid'

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
  components:{list, newfeature, music, empty, sizes, linkf, imagef, hypertext, scene, info},
  mounted(){
    this.product.features = this.product.features || []
    if(this.product.music_url && this.product.features.filter(item=>item.type==='music').length === 0){ // 旧版本兼容
      this.product.features.push({
        name: '背景音乐',
        uuid: uuid(),
        type: 'music',
        url: this.product.music_url,
        loop: this.product.loop,
        size: '1 x 1',
        position: {group: 2, x: 2, y: 0}
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
        this.product.music_url = null
        this.product.loop = null
      }
      let index = this.product.features.indexOf(row)
      this.product.features.splice(index, 1)
      this.setSelected()
    },
    setSelected(selected){
      this.selected = selected
    },
  },
  computed: {
    ...mapState('editor', ['product']),
  }
}
</script>

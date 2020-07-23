<template>
  <div style="display: flex; flex-direction: column; width: 100%; height:120px; align-items: flex-start;">
    <el-button type="primary" size="small" style="margin:0; width: 100%;" @click="showEditor=true">编 辑</el-button>
    <editor v-model="showEditor" @content="setContent" :item="selected.target"/>
  </div>
</template>
<script>
import editor from './editor'
import {mapState} from 'vuex'
export default{
  props:['selected','getSelecteds'],
  components:{editor},
  data(){return{showEditor:false}},
  methods:{
    setContent(content){
      this.getSelecteds().forEach((item, i) => {
        item.target.content = content
        item.target = JSON.parse(JSON.stringify(item.target))
      });
    },
  },
  computed:{
    ...mapState('editor',['curedit', 'product']),
  }

}
</script>

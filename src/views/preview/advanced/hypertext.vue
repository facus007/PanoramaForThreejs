<template>
  <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:white">
    <img class="image" :src='item && item.url' :style="style" @click="click"/>
    <overlayer class="iframe" v-model="showDialog">
      <quill-editor v-model="item.content" :options="editorOption" style="height: 100%; width: 100%; display: flex; flex-direction: column; background:white; border-radius: 10px; white-space: pre-wrap;" ref="editor" :disabled="true"/>
    </overlayer>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import overlayer from './overlayer'

const sizes = {
  '1 x 1': { width : 1, height: 1},
  '1 x 2': { width : 1, height: 2},
  '1 x 3': { width : 1, height: 3},
  '2 x 1': { width : 2, height: 1},
  '2 x 2': { width : 2, height: 2},
  '2 x 3': { width : 2, height: 3},
  '3 x 1': { width : 3, height: 1},
  '3 x 2': { width : 3, height: 2},
  '3 x 3': { width : 3, height: 3},
}
export default {
  components:{quillEditor,overlayer},
  props:['item'],
  data(){return {
    editorOption: {
      placeholder: '',
      modules:{
        toolbar:''
      }
    },
    showDialog: false,
  }},
  mounted(){},
  watch: {item(){}},
  computed: {
    width(){return sizes[this.item.size].width * 5},
    height(){return sizes[this.item.size].height * 5},
    style(){return this.item && {padding: this.height +'px ' + this.width+'px'}}
  },
  methods:{
    click(){
      this.showDialog=true
    }
  }
}
</script>
<style scoped>
.image{
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 0;
}
img[src=""],img:not([src]){
  opacity:0;
}
.iframe >>> .ql-container{
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>

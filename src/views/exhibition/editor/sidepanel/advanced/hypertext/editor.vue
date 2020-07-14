<template>
  <el-dialog class="dialog" :visible.sync="visible" append-to-body>
    <quill-editor v-if="visible" v-model="content" :options="editorOption" style="height: 100%; display: flex; flex-direction: column;" ref="editor"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="()=>{visible = false; $emit('content',content)}">确 定</el-button>
   </div>
  </el-dialog>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components:{quillEditor},
  props:['value'],
  data(){return {
    content: '',
    visible: false,
    editorOption: {
      placeholder: '',
    },
  }},
  watch:{
    visible(next, pre){this.$emit('input', next);},
    value(next, pre){this.visible = next;},
  },
}
</script>
<style scoped>
.dialog >>> .el-dialog__body{
  height: 60vh;
}
</style>

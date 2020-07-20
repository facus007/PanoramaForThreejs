<template>
  <span>
    <el-dialog class="dialog" :visible.sync="visible" append-to-body>
      <quill-editor v-if="visible" v-model="content" :options="editorOption" ref="editor" class="editor" style="white-space: pre-wrap;"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false; content = item.content">取 消</el-button>
        <el-button type="primary" @click="()=>{visible = false; $emit('content',content)}">确 定</el-button>
      </div>
      <material-selector class="material-selector" v-model="showDialog" @select="select" imgtype="1"/>
    </el-dialog>
  </span>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import MaterialSelector from '@/views/exhibition/materialselector'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]

export default {
  components:{quillEditor, MaterialSelector},
  props:['value', 'item'],
  data(){
    let component = this
    return {
    content: '',
    visible: false,
    showDialog: false,
    editorOption: {
      placeholder: '',
      modules:{
        toolbar:{
          container: toolbarOptions,  // 工具栏
          handlers: {
            'image': function (value) {
              if (value) {
                component.showDialog = true
              } else {
                this.quill.format('image', false);
              }
            }
          }
        }
      }
    },
  }},
  methods:{
    select(material){
      let quill = this.$refs.editor.quill
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image',  material.material_content)
      quill.setSelection(length + 1)
    }
  },
  watch:{
    visible(next, pre){this.$emit('input', next);},
    value(next, pre){this.content = this.item && this.item.content || ''; this.visible = next;},
  },
}
</script>
<style scoped>
.material-selector >>> .el-dialog__body{
  height: auto;
}
.editor{
  display: flex;
  flex-direction: column;
  height:60vh;
}
.editor>>>.ql-toolbar{
  height:10vh;
  /* overflow: auto; */
}
.editor>>>.ql-container{
  height:50vh;
}
</style>

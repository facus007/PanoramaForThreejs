<style scoped="ui">
.el-container {
  /* position: absolute; */
  width: 100%;
  height: 100%;
}

.el-header{
  display: flex;
  align-items: center;
  padding: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}

.el-main{
  display: flex;
  padding: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}

.el-footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}

.text{
  word-break: keep-all;           /* 不换行 */
  white-space: nowrap;          /* 不换行 */
  overflow: hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}

.el-table {
  overflow: auto;
}

.el-table ::-webkit-scrollbar-track-piece {
  background: #d3dce6;
}

.el-table ::-webkit-scrollbar {
  width: 4px;
}

.el-table ::-webkit-scrollbar-thumb {
  background: #99a9bf;
}
</style>

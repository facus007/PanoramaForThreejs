<template>
  <el-dialog class="dialog" :visible.sync="visible" append-to-body :show-close="false">
    <div v-if="visible" style="width: 100%; height: 100%; top: 0; left: 0; position: fixed; align-items: center; visibility: visible;">
      <div class="fill grid grid-centering grid-horizontal" style="background: #000B; grid-template-rows: 1fr 50px;" >
        <div class="centering fill" style="padding:20px 20px 0px 20px;">
            <slot/>
        </div>
        <el-button icon="el-icon-close" type="text" style="width:30px; height:30px; z-index:5; padding: 0;margin:10px; border-radius: 30px; background:#444;" @click="visible=false"/>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['value'],
  data(){ return {
    visible: false,
  }},
  watch:{
    visible(next, pre){this.$emit('input', next);},
    value(next, pre){this.visible = next;},
  },
}
</script>

<style scoped>
.dialog >>> .el-dialog__header{
  padding: 0;
}
.dialog >>> .el-dialog__body{
  padding: 0;
}
</style>

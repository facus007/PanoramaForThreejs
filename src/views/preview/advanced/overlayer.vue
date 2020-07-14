<template>
  <transition name="el-fade-in">
    <div v-if="visible" style="width: 100%; height: 100%; top: 0; left: 0; position: absolute; z-index: 2000; align-items: center; visibility: visible;">
      <div style="width:100%;height:100%; background: #000B; display:grid; justify-items:center; align-items:center; grid-auto-flow:row; grid-template-rows: 1fr 50px;" >
        <div style="width:100%;height:100%;">
          <div style="width:100%;height:100%; position:absolute; padding:20px 20px 50px 20px;">
            <slot/>
          </div>
        </div>
        <el-button icon="el-icon-close" type="text" style="width:30px; height:30px; z-index:5; padding: 0;margin:10px; border-radius: 30px; background:#444;" @click="visible=false"/>
      </div>
    </div>
  </transition>
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
  mounted(){
    document.body.appendChild(this.$el)
  },
  beforeDestroy(){
    document.body.removeChild(this.$el)
  }
}
</script>

<style scoped>
.dialog >>> .el-dialog{
  margin-top: 15vw;
  padding: 0;
  background: #0000;
}
.dialog >>> .el-dialog__header{
  padding: 0;
}
.dialog >>> .el-dialog__body{
  height: 70vw;
  padding: 0;
  overflow: hidden;
}
</style>

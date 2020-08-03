<template>
  <el-button @click="$router.go(-1)" size=small class="back">
    <span style="position:absolute; left:5px;">&lt;</span>
    返回
  </el-button>
</template>

<style scoped lang='scss'>
.back{
  right: -90px;
  width: 100px;
  top: 5px;
  position:absolute;
  margin: 0px;
  z-index: 30;
  background: #121212;
  opacity: .5;
  color: #fff;
  border: 0;

  &:hover{right: 0px;}
}
</style>

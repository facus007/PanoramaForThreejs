<template>
  <el-button @click="click" size=small class="back"><span style="position:absolute; left:5px;">&lt;</span>返回</el-button>
</template>

<script>
export default {
  methods:{
    click(){
      this.$router.push({path:'/exhibition/editor', query: { product_id: this.$route.query.product_id }})
    }
  }
}
</script>

<style scoped>
.back{
  right: -90px;
  width: 100px;
  top: 5px;
  position:absolute;
  margin: 0px;
  z-index: 30;
  background:#000;
  opacity: .5;
  color: #fff;
  border: 0;
}
.back:hover{
  right: 0px;
}
</style>

<template>
  <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:white">
    <img class="image" :src='item && item.url' :style="style" @click="click"/>
    <overlayer class="iframe" v-model="showDialog">
      <iframe :src="item.link" style="width:100%;height:100%;border:0;" frameborder="0" allowfullscreen/>
    </overlayer>
  </div>
</template>

<script>
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
  data(){return {
    showDialog: null,
  }},
  props: ['item'],
  components:{overlayer},
  mounted(){},
  watch: {item(){}},
  computed: {
    width(){return sizes[this.item.size].width * 5},
    height(){return sizes[this.item.size].height * 5},
    style(){return this.item && {padding: this.height +'px ' + this.width+'px'}}
  },
  methods:{
    click(){
      if(this.item.inline){
        this.showDialog = true
      }
      else {
        this.$store.dispatch('preview/setCookies')
        var a = document.createElement('a');
        a.href=this.item.link
        a.click()
      }
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
.frame >>> html,body{
  height: 100%;
  width: 100%;
}
</style>

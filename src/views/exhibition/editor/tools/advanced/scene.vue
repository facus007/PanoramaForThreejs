<template>
  <div class="centering">
    <img class="image fill" :src='item && item.url || "./static/scene.png"' :style="style" @click="$emit('click')"/>
  </div>
</template>

<script>

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
  props:['item'],
  mounted(){},
  watch: {item(){}},
  computed: {
    width(){return sizes[this.item.size].width * 5},
    height(){return sizes[this.item.size].height * 5},
    style(){return this.item && {padding: this.height +'px ' + this.width+'px'}}
  }
}
</script>
<style scoped>
.image{
  position: relative;
  object-fit: contain;
  border: 0;
}
img[src=""],img:not([src]){
  opacity:0;
}
</style>

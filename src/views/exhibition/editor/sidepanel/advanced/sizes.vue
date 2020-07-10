<template>
  <div v-if="selected" style="display: grid; align-items: center; grid-gap: 10px; grid-auto-flow: column;">
    尺寸
    <span><el-select size="small" v-model="selected.size">
      <el-option v-for="item in Object.keys(sizes)" :key="item" :label="item" :value="item"/>
    </el-select></span>
  </div>
</template>

<script>
export const sizes = {
  '1 x 1': { width : 1, height: 1},
  '2 x 1': { width : 2, height: 1},
  '3 x 1': { width : 3, height: 1},
  '1 x 2': { width : 1, height: 2},
  '2 x 2': { width : 2, height: 2},
  '3 x 2': { width : 3, height: 2},
  '1 x 3': { width : 1, height: 3},
  '2 x 3': { width : 2, height: 3},
  '3 x 3': { width : 3, height: 3},
}

export default{
  props:['selected'],
  computed:{
    sizes: _=>sizes,
  }
}
</script>

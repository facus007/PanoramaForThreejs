<template>
  <div class="home">
    <slot/>
  </div>
</template>

<script>
import * as UI from '@/components/UI'
import Container from './container'
import Grid from './grid'

export default {
  components:{ ...UI, Container, Grid },
}
</script>

<style scoped="views">
.home{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
}
.container {
  display: flex;
}
.grid {
  display: grid;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  padding: 5px;
}
.shadow {
  box-shadow: 0 0 10px 0px;
}
</style>

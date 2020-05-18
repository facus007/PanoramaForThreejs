<template>
  <div class="home">
    <slot/>
  </div>
</template>

<script>
import * as UI from '@/components/UI'
import Container from './container'

export default {
  components:{ ...UI, Container },
}
</script>

<style scoped="views">
.home{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

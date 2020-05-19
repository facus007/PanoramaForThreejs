<template>
  <div class="home container grid" :style="{'grid-template-areas': grid}">
    <slot/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props:['grid'],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

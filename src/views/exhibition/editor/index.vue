<template>
  <grid :grid="grid">
    <THREE style="grid-area: a"></THREE>
    <div style="background: gray; grid-area: b"/>
    <div style="background: gray; grid-area: c"/>
  </grid>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'

const datalist = [0,1,2,3,4,5,6,7,8,9]
const grid = "'a a a b' 'a a a b' 'a a a b' 'a a a b' 'c c c b'"

export default {
  mixins:[mixin],
  components:{...THREE},
  data(){ return {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    datalist,
  }},
  computed:{
    grid:() => grid
  },
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

<template>
  <container style="flex-direction: column">
    <div style="position:relative;flex:auto">
      <chart/>
    </div>
    <div style="position:relative;flex:auto">
      <chart/>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

const datalist = [0,1,2,3,4,5,6,7,8,9]

export default {
  mixins:[mixin],
  data(){ return {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    datalist,
  }},
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){}
}
</script>

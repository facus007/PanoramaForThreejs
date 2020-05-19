<template>
  <container>
    <container style="display: grid; grid-template-areas: 'aab' 'aab' 'aab'; grid-row-gap: 5px; grid-column-gap: 5px;">
      <THREE>
      </THREE>
    </container>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import * as THREE from '@/components/THREE'

const datalist = [0,1,2,3,4,5,6,7,8,9]

export default {
  mixins:[mixin],
  components:{...THREE},
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

<template>
  <div class="home"/>
</template>

<script>
import styles from '@/components/UI/base/styles'
import { mapState } from 'vuex'
var echarts = require('echarts');

export default {
  mixins: [styles],
  props:['option'],
  data(){return {
    chart: null,
    observer: null,
  }},
  mounted(){
    (this.chart = echarts.init(this.$el,null,{ width:"auto", height:"auto"})).setOption(this.options)
    this.observer = new ResizeObserver(this.resize)
    this.observer.observe(this.$el, { attributes: true, childList: true, subtree: true })
  },
  beforeDestroy(){
    this.observer.unobserve(this.$el)
    this.observer = null
    this.chart.dispose()
  },
  watch:{
    option(next){
      this.chart && this.chart.setOption(this.options);
    },
  },
  computed:{
    options(){
      return this.option || {xAxis:{},yAxis:{},serials:[{style:'line'}]}
    },
  },
  methods:{
    resize(){
      this.chart && this.chart.resize()
    }
  }
}
</script>

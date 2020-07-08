<template>
  <div style="position: absolute; width: 100%; height: 100%; pointer-events: none;">
    <div class="event" :style="{display: 'grid', width: size*3+'px', height: size*5+'px', 'grid-template-columns': '1fr 1fr 1fr', position: 'absolute', left: '0', top: '0'}">
      <div v-for="i in 15" style="border: 1px dashed white; width:100%; height:100%;"/>
    </div>
    <div class="event" :style="{display: 'grid', width: size*3+'px', height: size*5+'px', 'grid-template-columns': '1fr 1fr 1fr', position: 'absolute', left: '0', bottom: '0'}">
      <div v-for="i in 15" style="border: 1px dashed white; width:100%; height:100%;"/>
    </div>
    <div class="event" :style="{display: 'grid', width: size*3+'px', height: size*5+'px', 'grid-template-columns': '1fr 1fr 1fr', position: 'absolute', right: '0', top: '0'}">
      <div v-for="i in 15" style="border: 1px dashed white; width:100%; height:100%;"/>
    </div>
    <div class="event" :style="{display: 'grid', width: size*3+'px', height: size*5+'px', 'grid-template-columns': '1fr 1fr 1fr', position: 'absolute', right: '0', bottom: '0'}">
      <div v-for="i in 15" style="border: 1px dashed white; width:100%; height:100%;"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){return {}},
  watch:{},
  methods:{},
  computed:{
    size: _=>50,
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<style scoped>
.event{
  pointer-events: auto;
}
</style>

<template>
  <div class="home noevent" style="display: flex; align-items: center; padding: 10px;">
    <transform v-if="selected" :selected="selected"/>
    <detail v-if="selected" :selected="selected" style="margin-left: auto;"/>
    <prebuild :template="curedit.template" v-model="group">
      <span v-for="item, index in group && curedit.embeddings[0].hotspots">
        <builded-mesh v-if="group.getObjectByName(item.name)" :mesh="group.getObjectByName(item.name)" :url="item.img_url" :key="index" :item="item" :selected="selected"/>
      </span>
    </prebuild>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as THREE from '@/components/THREE'
import transform from './transform'
import detail from './detail'

export default {
  data(){return {
    group: null,
    selected: null,
  }},
  components:{...THREE, transform, detail},
  methods:{
    setSelected(selected){
      this.selected = selected
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    ...mapState('editor',{
      curedit(state){ return state.curedit }
    }),
  }
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
.el-button {
  color: #AAA;
}
.el-button :hover{
  color: yellow;
}
.block{
  text-align: center;
  background: rgba(51,51,51,0.8);
  padding: 5px;
  display: grid; grid-gap: 5px;
  grid-template-rows: 16px 1fr;
  width:100%;
}
</style>

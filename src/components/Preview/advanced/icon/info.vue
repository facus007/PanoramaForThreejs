<template>
  <div class="fill centering" style="color:white">
    <div @click="click" >
      <div class="icon icon-music"/>
    </div>
    <overlayer class="iframe" v-model="showDialog">
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>简介</span>
        </div>
        <div style="padding: 14px;">
          <span style="font-weight: bold;">{{product.name}}</span>
          <div class="bottom textarea">
            {{product.description}}
          </div>
        </div>
        <div style="display:flex; justify-content:center;">
          <el-image v-if="product.cover" :src="product.cover" fit="contain" style="width: 100%;"/>
        </div>
      </el-card>
    </overlayer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import overlayer from '../overlayer'
export default{
  props:['item'],
  components:{overlayer},
  data(){return {
    showDialog: false,
  }},
  watch: {},
  methods:{
    click(){
      this.showDialog = true
    }
  },
  computed:{
    ...mapState('preview', ['product']),
  },
  mounted(){}
}
</script>

<style scoped>
.icon {
  width: 25px;
  height: 25px;
  background-image: url(../../../../assets/img/icon_maps.png);
  background-repeat: no-repeat;
  background-size: 155px 125px;
  cursor: pointer;
  pointer-events: auto;
}

.icon-music {
  background-position: -2.5px -97.5px;
}

.box-card {
  min-width: 350px;
  max-width: calc(100% - 40px);
  height: calc(100% - 70px);
  position: absolute;
  overflow: auto;
}

.header{
  display: flex;
  justify-content: center;
  align-items: center;
}

.textarea {
  margin-top: 13px;
  font-size: 13px;
  color: #999;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  flex-direction: column;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>

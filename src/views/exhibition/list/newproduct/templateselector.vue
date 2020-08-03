<template>
  <el-container style="padding:5px; width:100%; overflow:auto; justify-content:flex-start" class="media-center grid grid-horizontal" :v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <el-row v-for="(src, index) in rawData" class="infinite-list-item scene-box scene-box-2x" :key="index" style="overflow:hidden;">
      <el-button type="text" style="padding: 0;" @click="()=>{tmp_group_id=src.tmp_group_id; $emit('input',src)}">
        <img :src="src.tmp_details[0].pano_graphic_url4" class="scene-box scene-box-2x">
          <div v-if="src.tmp_group_id === tmp_group_id" style="display:block;position:absolute;right: -17px;top: -7px;width: 46px;height: 26px;background: #13ce66;text-align: center;transform: rotate(45deg);box-shadow: 0 1px 1px #ccc;">
            <i class="el-icon-check" style="font-size: 12px;margin-top: 12px;transform: rotate(-45deg);color:#fff"/>
          </div>
          <!-- display:grid;grid-auto-flow:column;gap:4px;justify-items: flex-end; -->
          <div style="position:absolute; background: rgba(128,128,128,0.5); padding:5px 10px;bottom: 0;right: 0;color: white; font-size: smaller; width:100%;">
            <span>广告位 / 产品位：{{src.adv_count}} / {{src.prod_count}}</span>
          </div>
        </img>
      </el-button>
    </el-row>
    <p v-if="loading" class="centering" style="width: min-content"><i class="el-icon-loading"></i></p>
    <p v-if="noMore" class="centering" style="font-size: 12px; color: gray;  width: 100px">没有更多了</p>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import { listTmps } from '@/api/server'
// import moment from 'moment'

export default {
  data(){return {
    loading: true,
    states:[],
    page: 1,
    total: null,
    tmp_group_id: null,
    rawData:[],
    pageSize: 5,
  }},
  props:['value'],
  methods:{
    load () {
      if(!this.total || this.rawData.length < this.total){
        this.loading = true
        listTmps({
          type: '1',
          pageNum: this.page++,
          pageSize: this.pageSize,
        }).then((result)=>{
          this.rawData = this.rawData.concat(result.tmps)
          this.total = result.total
          this.loading = false
          this.total === 1 && this.$emit('input', this.rawData[0]) && (this.tmp_group_id=this.rawData[0].tmp_group_id)
        })
      }
    },
    reload(){
      this.page = 1
      this.load()
    },
  },
  computed:{
    count(){
      return this.rawData ? this.rawData.length : 0
    },
    noMore () {
      return !this.loading && this.count >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    },
  },
  mounted(){
    this.page = 1
    this.load()
  },
}
</script>

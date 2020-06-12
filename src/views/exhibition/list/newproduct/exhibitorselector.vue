<template>
  <el-container style="padding:5px;display:grid; grid-gap:5px;grid-auto-flow: column;width:100%; height:70px; overflow:auto; position:relative;" class="media-center" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <el-row v-for="(src, index) in rawData" class="infinite-list-item" :key="index" style="width: 200px; height: 100%; overflow:hidden; border-radius: 5px; box-shadow: 0 0 4px 0 gray; position:relative;">
      <el-button type="text" style="padding:0;width: 100%; height: 100%;" @click="()=>{tmp_group_id=src.userId; $emit('input',src.userId)}">
        <div style="position:relative;width: 100%; height: 100%;">
          <div>{{src.exhibitorName}}</div>
          <div v-if="src.userId === tmp_group_id" style="display:block;position:absolute;right: -17px;top: -30px;width: 46px;height: 26px;background: #13ce66;text-align: center;transform: rotate(45deg);box-shadow: 0 1px 1px #ccc;">
            <i class="el-icon-check" style="font-size: 12px;margin-top: 12px;transform: rotate(-45deg);color:#fff"/>
          </div>
        </div>
      </el-button>
    </el-row>
    <div v-if="loading" style="display: flex; justify-content: center; align-items:center;  width: min-content;height:100%"><i class="el-icon-loading"></i></div>
    <div v-if="noMore" style="display: flex; justify-content: center; align-items:center; font-size: 12px; color: gray;  width: 100px;height:100%">没有更多了</div>
  </el-container>
</template>

<script>
import styles from '@/components/UI/base/styles'
import { mapState } from 'vuex'
import { listexhibitor } from '@/api/server'
import moment from 'moment'

export default {
  mixins: [styles],
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
        listexhibitor({
          endTime: moment(new Date()).format('YYYYMMDDHHmmss'),
          type: '1',
          pageNum: this.page++,
          pageSize: this.pageSize,
        }).then((result)=>{
          this.rawData = this.rawData.concat(result.exhibitors)
          this.total = result.total
          this.loading = false
          this.total === 1 && this.$emit('input', this.rawData[0].userId) && (this.tmp_group_id=this.rawData[0].userId)
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

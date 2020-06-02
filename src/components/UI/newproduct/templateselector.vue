<template>
  <el-container style="padding:5px;display:grid; grid-gap:5px;grid-auto-flow: column;width:400px; overflow:auto;" class="media-center" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <el-row v-for="(src, index) in rawData" class="infinite-list-item" :key="index" style="width: 200px; height: 100px;overflow:hidden;border-radius: 5px; box-shadow: 0 0 4px 0 gray;">
      <el-button type="text" style="padding:0;width: 100%; height: 100%;" @click="tmp_group_id=src.tmp_group_id">
        <img :src="src.tmp_details[0].material_content" style="position:relative;width: 100%; height: 100%;object-fit: cover; ">
          <div v-if="src.tmp_group_id === tmp_group_id" style="display:block;position:absolute;right: -17px;top: -7px;width: 46px;height: 26px;background: #13ce66;text-align: center;transform: rotate(45deg);box-shadow: 0 1px 1px #ccc;">
            <i class="el-icon-check" style="font-size: 12px;margin-top: 12px;transform: rotate(-45deg);color:#fff"/>
          </div>
        </img>
      </el-button>
    </el-row>
    <p v-if="loading" style="display: flex; justify-content: center; align-items:center;  width: min-content"><i class="el-icon-loading"></i></p>
    <p v-if="noMore" style="display: flex; justify-content: center; align-items:center; font-size: 12px; color: gray;  width: 100px">没有更多了</p>
  </el-container>
</template>

<script>
import styles from '@/components/UI/base/styles'
import { mapState } from 'vuex'
import { listTmps } from '@/api/server'

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
  methods:{
    load () {
      if(!this.total || this.rawData.length < this.total){
        this.loading = true
        listTmps({
          endTime: this.$moment(new Date()).format('YYYYMMDDHHmmss'),
          type: '1',
          pageNum: ++this.page,
          pageSize: this.pageSize,
        }).then((result)=>{
          this.rawData = result.tmps
          this.total = result.total
          this.loading = false
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

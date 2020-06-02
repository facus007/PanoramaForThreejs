<template>
  <el-container>
    <el-header style="padding: 0px 20px;">
      <slot name="header"/>
    </el-header>
    <el-main>
      <el-table size="mini" :data="items" @selection-change="val=>$emit('selection-change',val)" tooltip-effect="dark" style="width: 100%;" :height="'100%'"
        :row-style="{height:'80px'}" :header-row-style="{height:'20px'}" :header-cell-style="{padding:'0'}">
        <slot name="columns"/>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination small background hide-on-single-page layout="total, prev, pager, next" :currentPage.sync="currentPage_"  :total="total" :page-size="pageSize"/>
    </el-footer>
  </el-container>
</template>

<script>
import styles from '@/components/UI/base/styles'
import { mapState } from 'vuex'

export default {
  name: 'TableFrame',
  data(){return {
    currentPage_: 0,
  }},
  mixins: [styles],
  props: ['total', 'pageSize', 'loading', 'items', 'currentPage'],
  watch: {
    currentPage_(next){
      this.$emit('update:currentPage', next)
    }
  },
  methods:{
  }
}
</script>

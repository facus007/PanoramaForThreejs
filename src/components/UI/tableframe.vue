<template>
  <el-container>
    <el-main>
      <el-table :data="items" :row-style="{height:'80px'}" :header-row-style="{height:'60px'}" @selection-change="val=>$emit('selection-change',val)" size="small" tooltip-effect="dark" style="width: 100%;" :height="'100%'">
        <template v-slot:default="scope">
          <slot name="columns" :row="scope.row"/>
        </template>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination small background hide-on-single-page layout="total, prev, pager, next" :currentPage.sync="currentPage_"  :total="total" :page-size="pageSize"/>
    </el-footer>
  </el-container>
</template>

<script>
import styles from '@/UI/base/styles'
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
  }
}
</script>

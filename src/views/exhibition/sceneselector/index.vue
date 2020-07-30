<template>
  <el-dialog title="选择场景" :visible.sync="visible" width="50%" :modal="false" append-to-body>
    <table-frame v-if="visible" :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false" style="height: 500px">
      <template v-slot:columns="_">
        <columns @select="row => {$emit('select', row); $emit('input',false);}"/>
      </template>
    </table-frame>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import TableFrame from '@/components/UI/tableframe'
import columns from './columns'

export default {
  components:{TableFrame, columns},
  data(){ return {
    pageSize: 5,
    currentPage: 1,
    visible: false,
  }},
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){this.visible = next},
  },
  props:['value', 'curSceneId'],
  computed:{
    ...mapState('editor',{
      total: state => state.product.scenes.length,
      datalist(state) {return state.product.scenes.filter(item=>item.scene_id!==this.curSceneId)}
    })
  }
}
</script>

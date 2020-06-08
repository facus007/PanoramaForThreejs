<template>
  <el-dialog title="选择场景" :visible.sync="visible" width="50%" :modal="false">
    <container v-if="visible">
      <table-frame :total="total" :page-size="pageSize" :currentPage.sync="currentPage" :items="datalist" :loading="false" style="height:500px">
        <template v-slot:columns="scope">
          <el-table-column label="场景">
            <template v-slot:default="scope">
              <el-button type="text" @click="()=>{$emit('select',scope.row);$emit('input', false)}" style="width: 100%; height: 100%; padding:0;display:flex;">
                <img :src="scope.row.pano_graphic_url4" style="background:#EEE; width:100px; height:50px; border-radius: 10px; object-fit:cover" />
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="场景名称">
            <template v-slot:default="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column label="场景描述">
            <template v-slot:default="scope">
              {{scope.row.description}}
            </template>
          </el-table-column>
        </template>
      </table-frame>
    </container>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import Container from '@/views/mixin/container'
import TableFrame from '@/components/UI/tableframe'

export default {
  components:{Container, TableFrame},
  data(){ return {
    pageSize: 5,
    currentPage: 1,
    visible: false,
    showDialog: false,
  }},
  watch:{
    visible(next, pre){this.$emit('input', next)},
    value(next, pre){
      this.visible = next
    },
  },
  props:['value', 'onSelect'],
  methods:{},
  computed:{
    ...mapState('editor',{
      total: state => state.product.scenes.length,
      datalist: state => state.product.scenes
    })
  },
  mounted(){},
  beforeDestroy(){}
}
</script>

<template>
  <div style="display:flex; padding: 0 20px; align-items: center;width: 100%; height: 100%;">
    <el-checkbox v-model="setting.autosave"><span style="color: white;">自动保存</span></el-checkbox>
    <el-button type="text" icon="el-icon-edit" style="padding: 0; margin-left: auto; color: white; font-size:20px;"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

const moduleName = "editor"

export default {
  mixins:[mixin],
  watch:{},
  methods:{},
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting']),
  },
}
</script>

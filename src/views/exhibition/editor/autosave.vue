<template>
  <div style="display:flex; padding: 0 20px; align-items: center;width: 100%; height: 100%;" :autosave="autosave">
    <el-checkbox v-model="setting.autosave">
      <span style="color: white;">自动保存</span>
      <i v-if="loading" class="el-icon-loading" style="color: white; margin-left: 10px"/>
    </el-checkbox>
    <el-button type="text" icon="el-icon-caret-right" style="padding: 0; margin-left: auto; color: white; font-size:20px;" @click="preview"/>
    <el-button type="text" icon="el-icon-upload" style="padding: 0; margin-left: 10px; color: white; font-size:20px;" @click="save"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'

const moduleName = "editor"

export default {
  mixins:[mixin],
  data(){return{
    loading: false
  }},
  watch:{
    'setting.autosave'(next){
      this.$store.commit(moduleName+'/SET_SETTING',this.setting)
    }
  },
  methods:{
    save(){
      this.loading = true
      this.$store.dispatch(moduleName+'/save').then(()=>this.loading = false)
    },
    preview(){
      this.$router.push({path:'/preview', query: { product_id: this.product.product_id }})
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting','curedit','cursave']),
    autosave(){
      if(this.setting.autosave && JSON.stringify(this.product)!==this.cursave){
        this.save()
      }
      return this.cursave
    },
  },
}
</script>

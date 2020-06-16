<template>
  <div style="display:flex; padding: 0 20px; align-items: center;width: 100%; height: 100%;" :autosave="autosave">
    <el-checkbox v-model="setting.autosave">
      <span style="color: white;">自动保存</span>
      <i v-if="loading" class="el-icon-loading" style="color: white; margin-left: 10px"/>
    </el-checkbox>
    <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
      <el-button type="text" style="padding: 0; margin-left: auto; font-size:20px;" @click="preview"><svg-icon icon-class='video' style=" color: white;"/></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
      <el-button type="text" style="padding: 0; margin-left: 10px; font-size:20px;" @click="save"><svg-icon icon-class='upload' style=" color: white;"/></el-button>
    </el-tooltip>
    <el-popover placement="bottom" trigger="click">
      <canvas id="qrcodeContent" style="width: 100%; height: 150px"/>
      <el-button slot="reference" type="text" style="padding: 0; margin-left: 10px; font-size:20px;" @click="qrcode"><svg-icon icon-class='qr_code_light' style=" color: white;"/></el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import QRCode from 'qrcode'

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
    },
    qrcode(){
      var link = location.href.replace(this.$route.path,'/share');
      QRCode.toCanvas(document.getElementById('qrcodeContent'), link)
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState(moduleName, ['product', 'setting','curedit','cursave']),
    autosave(){
      let product = JSON.parse(JSON.stringify(this.product))
      product.scenes.forEach((item, i) => {
        delete item.fov
      });
      if(this.setting.autosave && JSON.stringify(product)!==this.cursave){
        this.save()
      }
      return this.cursave
    },
  },
}
</script>

<template>
  <div class="absolute grid grid-centering grid-vertical" style="grid-template-rows: 1fr 40px; padding: 5px 0;">
    <div class="fill" style="position:relative">
      <list :source="curedit.embeddings[1].hotspots" :label="labels[1]+'（当前热点数：'+curedit.embeddings[1].hotspots.length+'）'" v-model="selected" @del="del" :clearable="true" ref="list"/>
    </div>
    <div style="background: #304156; width: 100%; position:relative;" class="centering">
      <upload-source @openAdvsSouceFrame="openAdvsSouceFrame" ref="openUploadSouceFrame"/>
      <el-dialog title="" :visible.sync="advsFrameVisible" destroy-on-close>
        <advs v-model="batch_no"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import list from '../list'
import * as THREE from '@/components/THREE'
import {addembed, delembed} from '@/api/server'
import advs from "../../uploadSourceFrame/product";
import UploadSource from "../../uploadSource";

const labels = ['广告位热点', '产品位热点', '自定义热点']

export default {
  components:{ ...THREE, list, advs, UploadSource},
  data(){return {
    selected: null,
    advsFrameVisible: false,
    batch_no: null,
  }},
  props:['editor'],
  watch:{
    selected(next){
      this.editor.$refs.tools.setSelected(next)
      next && this.$refs.list.$refs.table.$children[2].$children[this.curedit.embeddings[1].hotspots.indexOf(next)+1].$el.scrollIntoView()
    },
    batch_no(next){
      if(next){
        this.advsFrameVisible=false
        this.$refs.openUploadSouceFrame.fillProduct(next)
        this.batch_no = null
      }
    }
  },
  methods:{
    async del(item){
      await delembed({embedIds: item.embed_id})
      let index = this.curedit.embeddings[1].hotspots.indexOf(item)
      this.curedit.embeddings[1].hotspots.splice(index, 1)
      this.setSelected()
    },
    setSelected(selected){
      this.selected = selected
    },
    openAdvsSouceFrame(val){
      this.advsFrameVisible = true
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed: {
    labels: () => labels,
    ...mapState('editor', ['curedit']),
  }
}
</script>

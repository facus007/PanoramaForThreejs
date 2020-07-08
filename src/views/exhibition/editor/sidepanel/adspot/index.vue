<template>
  <container class="home" style="display: grid; overflow: hidden; grid-gap: 10px;">
    <list :source="curedit.embeddings[0].hotspots" :label="labels[0]" v-model="selected" @del="del" :clearable="true" ref="list"/>
    <div style="background: #304156; width: 100%; height: 50px; position:relative;display:flex;align-items:center">
      <upload-source @openAdvsSouceFrame="openAdvsSouceFrame" ref="openUploadSouceFrame" style="height:40px;"/>
      <el-dialog title="" :visible.sync="advsFrameVisible" destroy-on-close>
        <advs v-model="batch_no"/>
      </el-dialog>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
import list from '../list'
import * as THREE from '@/components/THREE'
import {addembed, delembed} from '@/api/server'
import advs from "../../uploadSourceFrame/advs";
import UploadSource from "../../uploadSource";

const labels = ['广告位热点', '产品位热点', '自定义热点']

export default {
  mixins:[mixin],
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
      this.$refs.list.$refs.table.$children[2].$children[this.curedit.embeddings[0].hotspots.indexOf(next)+1].$el.scrollIntoView()
    },
    batch_no(next){
      if(next){
        this.advsFrameVisible=false
        this.$refs.openUploadSouceFrame.fillAds(next)
        this.batch_no = null
      }
    }
  },
  methods:{
    del(item){
      delembed({embedIds: item.embed_id})
      let index = this.curedit.embeddings[0].hotspots.indexOf(item)
      this.curedit.embeddings[0].hotspots.splice(index, 1)
      this.selected = null
    },
    setSelected(selected){
      this.selected = selected
    },
    openAdvsSouceFrame(val){
      this.advsFrameVisible = val
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

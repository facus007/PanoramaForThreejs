<template>
  <container class="home" style="position: relative; display: flex; flex-direction: column;">
    <div style="color: white; font-size: 14px; font-weight: bold; height: 100%; width: 100%; display: grid; grid-gap: 2px; grid-template-rows: 26px 40px 3fr 40px 1fr;" class="event">
      <div class="block" style="display:flex;align-items:center;">
        属性 <el-button size="mini" type="primary" style="margin-left:auto;" @click="batch">一键批处理</el-button>
      </div>
      <div class="block" style="display:flex;align-items:center">
        <span style="width:60px">标签:</span><el-input class="select" size="mini" v-model="label" style=""></el-input>
      </div>
      <div class="block" style="display:flex; flex-direction:column; align-items: flex-start;">
        <div>选择影像</div>
        <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 100%; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
          <el-image v-if="img_url && imgtype === 1" :src="img_url" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
          <video v-if="img_url && imgtype === 2" :src="img_url" autoplay playsinline style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-button>
        <div style="margin-top:5px">当前区域推荐长宽比：{{1}}:{{1}}</div>
      </div>
      <div class="block">
        <el-select class="select" size="mini" v-model="option" style="width:100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"/>
        </el-select>
      </div>
      <div class="block" style="display:flex; justify-content:center; align-items:center; width: 100%;">
        <div v-if="option === '0'" style="display: flex; flex-direction: column; width: 100%; align-items: flex-start;">
          <span>
            请输入超链接
            <el-tooltip class="item" effect="dark" content="超链接需附上 http:// 或 https:// " placement="right-end">
              <el-button type="text" class="el-icon-info" style="margin: 0;padding:0"/>
            </el-tooltip>
          </span>
          <el-input class="input" size="mini" v-model="target.link" style="margin-top:5px"/>
        </div>
        <div v-if="option === '1'" style="width:100%">
          <div v-if="target.scene_id" style="width:100%">

          </div>
          <div v-else  style="width:100%">
            <el-button type="primary" style="width:100%">选择显示图片</el-button>
          </div>
        </div>
        <div v-if="option === '2'"  style="width:100%">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="target.text" style="width:100"/>
        </div>
        <div class="scene" v-if="option === '3'" style="width:100%">
          <div v-if="target.scene_id"  style="width:100%">

          </div>
          <div v-else  style="width:100%">
            <el-button type="primary" style="width:100%">选择跳转场景</el-button>
          </div>
        </div>
      </div>
    </div>
    <material-selector v-model="showDialog" @select="select" imgtype="1"/>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/views/mixin'
const options = [
  { value: '0', label: '超链接'},
  { value: '1', label: '图片展示'},
  { value: '2', label: '文本展示'},
  { value: '3', label: '场景跳转'},
]
export default {
  mixins:[mixin],
  data(){return {
    group: null,
    options,
    label: null,
    type: '0',
    target: {},
    showDialog: false,
    imgtype: null,
    img_url: null,
  }},
  props:['source'],
  methods:{
    onChange(){
      this.showDialog = true
    },
    batch(){
      this.source.forEach((item, i) => {
        item.label = this.label
        item.type = this.type
        item.target = this.target
      });
    },
    select(material){
      console.log(material)
      this.img_url=material.material_content
      this.imgtype = parseInt(material.material_type)
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    ...mapState('editor',['curedit']),
    option:{
      get(){return this.type.toString()},
      set(value){this.type=parseInt(value)}
    }
  }
}
</script>

<style scoped="views">
</style>

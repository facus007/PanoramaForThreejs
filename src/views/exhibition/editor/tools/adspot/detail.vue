<template>
  <div style="color: white; font-size: 14px; font-weight: bold; height: 70%; width: 200px; display: grid; grid-gap: 2px; grid-template-rows: 26px 3fr 40px 1fr;" class="event">
  <div class="block">属性</div>
  <div class="block" style="display:flex; flex-direction:column; align-items: flex-start;">
    <div>当前影像</div>
    <el-button class="upload" type="text" @click="onChange" style="width: 100%; height: 100%; margin-top: 5px; padding: 0; position: relative; border-radius: 5px; border: 1px dashed white;">
      <el-image v-if="selected.img_url && selected.style === 1" :src="selected.img_url" fit="contain" style="position:absolute; width:100%; height: 100%;left:0;top:0;"/>
      <video v-if="selected.img_url && selected.style === 2" :src="selected.img_url" autoplay playsinline style="position:absolute; width:100%; height: 100%;left:0;top:0;" muted />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-button>
    <div style="margin-top:5px">当前区域推荐长宽比：{{selected.name.split('_')[1]}}:{{selected.name.split('_')[2]}}</div>
  </div>
  <div class="block">
    <el-select class="select" size="mini" v-model="option" style="">
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
      <el-input class="input" size="mini" v-model="selected.target.link" style="margin-top:5px"/>
    </div>
    <div v-if="option === '1'">
      <div v-if="selected.target.scene_id">

      </div>
      <div v-else>
        <el-button type="primary">选择显示图片</el-button>
      </div>
    </div>
    <div class="scene" v-if="option === '2'">
      <div v-if="selected.target.scene_id">

      </div>
      <div v-else>
        <el-button type="primary">选择跳转场景</el-button>
      </div>
    </div>
  </div>
  <material-selector v-model="showDialog" @select="select" imgtype="1,2"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import MaterialSelector from '@/views/exhibition/materialselector'

const options = [
  { value: '0', label: '超链接'},
  { value: '1', label: '图片展示'},
  { value: '2', label: '场景跳转'},
]
export default {
  components:{MaterialSelector},
  data(){return {
    group: null,
    options,
    showDialog:false,
  }},
  props:['selected'],
  methods:{
    onChange(){
      this.showDialog=true
    },
    select(material){
      this.selected.style = parseInt(material.material_type)
      this.selected.img_url = material.material_content
    }
  },
  mounted(){},
  beforeDestroy(){},
  computed:{
    ...mapState('THREE',['scene', 'camera', 'needsUpdate', 'domElement']),
    ...mapState('editor',['curedit']),
    option:{
       get(){return this.selected.type.toString()},
       set(value){this.selected.type=parseInt(value)}
     }
  }
}
</script>

<style scoped="three">
.noevent {
  pointer-events: none;
}
.event {
  pointer-events: visiblePainted;
}
</style>

<style scoped="three-editor">
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame {
  display: flex;
  width: 70%;
  height: 70%;
  border: 2px dashed white;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}
.block{
  text-align: center;
  background: rgba(51,51,51,0.8);
  padding: 5px;
  display: grid; grid-gap: 5px;
  width:100%;
}
.select >>> input{
  background-color: #0000;
  border-color: #0000;
  color: white;
}
.upload >>> .el-upload--picture-card{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #0000;
}
.radio >>> .el-radio{
  color: white;
}
.input >>> input {
  width:100%;
}
</style>

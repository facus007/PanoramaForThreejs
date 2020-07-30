<template>
  <el-table-column label="素材预览">
    <template v-slot:default="scope">
      <el-button type="text" @click="$emit('select',scope.row)" style="width: 100%; height: 100%; padding:0;">
        <span class="grid grid-vertical grid-centering">
          <img v-if="scope.row.material_type === '1' || scope.row.material_type === '10'" :src="scope.row.material_content" class="image-box"/>
          <video v-else-if="scope.row.material_type === '2'" :src="scope.row.material_content" class="image-box" autoplay playsinline muted/>
          <audio v-else-if="scope.row.material_type === '5'" :src="scope.row.material_content" class="image-box" style="width: 350px;" playsinline controls/>
          <div v-else class="image-box"/>
          <div class="text">{{scope.row.remark}}</div>
        </span>
      </el-button>
    </template>
  </el-table-column>
</template>

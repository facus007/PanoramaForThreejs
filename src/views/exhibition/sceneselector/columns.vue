<template>
  <span>
    <el-table-column label="场景描述">
      <template v-slot:default="scope">
        <span class="text">{{scope.row.description}}</span>
      </template>
    </el-table-column>
    <el-table-column label="场景">
      <template v-slot:default="scope">
        <el-button class="centering" type="text" @click="$emit('select',scope.row)" style="width: 100%; height: 100%; padding:0;">
          <img :src="scope.row.pano_graphic_url4" class="scene-box"/>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="场景名称">
      <template v-slot:default="scope">
        <span class="text">{{scope.row.name}}</span>
      </template>
    </el-table-column>
  </span>
</template>

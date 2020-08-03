<template>
  <div>
    <el-table-column label="操作">
      <template v-slot:default="scope">
        <div class="grid grid-vertical grid-centering" style="grid-template-columns: 1fr 1fr; justify-items: flex-start;">
          <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="del(scope.row)">删除</el-button>
          <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="preview(scope.row)">预览</el-button>
          <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="link(scope.row)">复制链接</el-button>
          <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="copy(scope.row)">复制作品</el-button>
          <el-button style="padding:0;margin:0; width:min-content;" type="text" @click="download(scope.row)">下载配置</el-button>
          <el-popover placement="left" trigger="click">
            <div style="text-align:center;">
              <canvas :id="'qrcodeContent'+scope.$index" style="width: 100%; height: 150px"/>
              <el-button style="padding:5px;margin:auto; width:min-content;position: absolute;bottom: 3px;left: 30%;" type="text" @click="downloadqrcode(scope.$index, scope.row.name)">
                下载二维码
              </el-button>
              <a style="display:none;" href="" :download="scope.row.name" :id="'download'+scope.$index"></a>
            </div>
            <el-button slot="reference" style="padding:0; margin:auto; width:min-content;" @click="qrcode(scope.row, scope)" type="text">显示二维码</el-button>
          </el-popover>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="作品封面">
      <template v-slot:default="scope">
        <img :src="scope.row.cover" class="scene-box"/>
      </template>
    </el-table-column>
    <el-table-column label="作品名称">
      <template v-slot:default="scope">
        <span class="text">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="作品ID">
      <template v-slot:default="scope">
        <span class="text">{{scope.row.product_id}}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建日期">
      <template v-slot:default="scope">
        <span class="text">{{scope.row.create_time}}</span>
      </template>
    </el-table-column>
    <el-table-column label="修改日期">
      <template v-slot:default="scope">
        <span class="text">{{scope.row.update_time}}</span>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { listProducts, delProduct } from "@/api/server";
import { getProduct, saveVR } from "@/utils/server";

export default{
  props:["refresh"],
  methods:{
    edit(row) {
      this.$router.push({
        path: "/exhibition/editor",
        query: { product_id: row.product_id }
      });
    },
    preview(row) {
      this.$router.push({
        path: "/exhibition/preview",
        query: { product_id: row.product_id }
      });
    },
    link(row) {
      var input = document.createElement("input");
      document.body.appendChild(input);
      input.value = location.href.replace(this.$route.path,"/share?product_id=" + row.product_id);
      input.focus();
      input.select();
      var result = document.execCommand("copy");
      input.remove();
      if (result === "unsuccessful") {
        this.$message.error("复制至剪贴板失败");
      } else {
        this.$message("已复制至剪贴板");
      }
    },
    qrcode(row, scope) {
      var link = location.href.replace(this.$route.path, "/share?product_id=" + row.product_id);
      QRCode.toCanvas(document.getElementById("qrcodeContent" + scope.$index),link);
    },
    downloadqrcode(index, name) {
      var a = document.createElement("a");
      let canvas = document.getElementById("qrcodeContent" + index);
      let dataURL = canvas.toDataURL("image/png");
      a.setAttribute("href", dataURL);
      a.download = name;
      a.click();
    },
    async copy(row) {
      this.$emit('loading', true)
      let result = await getProduct(row.product_id);
      result.product_id = undefined;
      result.name += "-复制";
      await saveVR(result);
      this.refresh();
      this.$emit('loading', false)
    },
    async download(row) {
      this.$emit('loading', true)
      let result = await getProduct(row.product_id);
      var urlObject = window.URL || window.webkitURL || window;
      var a = document.createElement("a");
      a.href = urlObject.createObjectURL(new Blob([JSON.stringify(result)]));
      a.download = "data.json";
      a.click();
      this.$emit('loading', false)
    },
    async del(row) {
      await this.$confirm("一旦点击删除，作品将无法恢复，您确定是否继续操作？", "提示",{
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
      try {
        this.$emit('loading', true)
        await delProduct({ productId: row.product_id });
        this.refresh();
        this.$message({type: "success", message: "删除成功!"});
      } catch (e) {
      } finally {
        this.$emit('loading', false)
      }
    }
  }
}
</script>

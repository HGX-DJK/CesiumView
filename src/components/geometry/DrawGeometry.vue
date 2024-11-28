<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="drawTool.activate('Point')">点</button>
      <button class="common-btn" @click="drawTool.activate('Polyline')">线</button>
      <button class="common-btn" @click="drawTool.activate('Polygon')">面</button>
      <button class="common-btn" @click="drawTool.clearAll()">清除</button>
    </div>
  </div>
</template>
<script setup>
import { onUnmounted, ref } from "vue";
import { ViewerStore } from "@/store";
import DrawTool from "@/utils/cesiumCtrl/geometry/drawGraphic";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
const drawTool = new DrawTool(viewer);

onUnmounted(() => {
  drawTool.clearAll();
});
</script>

<style scoped lang="scss"></style>

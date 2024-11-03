<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="onLineMeasure">空间距离</button>
      <button class="common-btn" @click="onAreaMeasure">空间面积</button>
      <button class="common-btn" @click="onTrianglesMeasure">三角量测</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, onBeforeMount } from "vue";
import MeasureTool from "@/utils/cesiumCtrl/measure/measure.js";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});
const measure = new MeasureTool(viewer);

const onLineMeasure = () => {
  measure.drawLineMeasureGraphics({
    clampToGround: true,
    callback: (e) => {
      console.log("----", e);
    },
  });
};
const onAreaMeasure = () => {
  measure.drawAreaMeasureGraphics({
    clampToGround: true,
    callback: () => {},
  });
};
const onTrianglesMeasure = () => {
  measure.drawTrianglesMeasureGraphics({
    callback: () => {},
  });
};
const onClear = () => {
  measure._drawLayer.entities.removeAll();
};

onUnmounted(() => {
  onClear();
  // viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
  //   url: "http://data.marsgis.cn/terrain",
  // });
});


onBeforeMount(() => {
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
});
</script>

<style scoped lang="scss"></style>

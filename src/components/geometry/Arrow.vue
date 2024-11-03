<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="drawStraightArrow">直线箭头</button>
      <button class="common-btn" @click="drawAttackArrow">攻击箭头</button>
      <button class="common-btn" @click="drawPincerArrow">钳击箭头</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import { ViewerStore } from "@/store";
import Arrow from "@/utils/cesiumCtrl/drawArrow/drawPlot";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer

const drawStraightArrow = () => {
  Arrow.draw("straightArrow");
};
const drawAttackArrow = () => {
  Arrow.draw("attackArrow");
};
const drawPincerArrow = () => {
  Arrow.draw("pincerArrow");
};
const onClear = () => {
  Arrow.clearAll();
};
onUnmounted(() => {
  onClear();
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
});

onMounted(() => {
  // viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
  //   url: "http://data.marsgis.cn/terrain",
  // });

  Arrow.disable();
  Arrow.init(viewer);
});

</script>

<style lang="scss" scoped></style>

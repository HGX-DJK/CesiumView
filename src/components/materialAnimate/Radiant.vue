<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="start">渲染</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import { ViewerStore } from "@/store";
import Radiant from "@/utils/cesiumCtrl/materialAnimate/radiant.js";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

//常量参数
const COORDINATE =  [120.36, 36.09];

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(...COORDINATE, 10000),
});

// 水波纹扩散
let circleWave = new Radiant(viewer, "cirCleWave1");
const start = () => {
    onClear();
    circleWave.add([...COORDINATE, 10], "red", 1000, 3000);
};

const onClear = () => {
  circleWave.del("cirCleWave1");
};
onUnmounted(() => {
  onClear();
});
</script>

<style scoped lang="scss"></style>

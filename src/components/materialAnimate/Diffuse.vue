<!--圆扩散-->
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
import CircleDiffusion from "@/utils/cesiumCtrl/materialAnimate/diffuse.js";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
//常量参数
const COORDINATE = [120.36, 36.09];

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(...COORDINATE, 10000),
});

//新建圆扩散对象
const circleDiffusion = new CircleDiffusion(viewer, "circle");
const start = () => {
    circleDiffusion.add([...COORDINATE, 10], "#F7EB08", 2000, 5000);
};

const onClear = () => {
  circleDiffusion.clear();
};

onUnmounted(() => {
  onClear();
});
</script>

<style scoped lang="scss"></style>

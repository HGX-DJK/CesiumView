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
import { ViewerStore } from "@/store";
import MeasureTool from "@/utils/cesiumCtrl/measure/measure.js";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer

viewer.camera.setView({
   // 从以度为单位的经度和纬度值返回笛卡尔3位置。
   destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

//测量工具
const measure = new MeasureTool(viewer);
//空间距离测量
const onLineMeasure = () => {
  measure.drawLineMeasureGraphics({
    clampToGround: true,
    callback: (e) => {
      console.log("----", e);
    },
  });
};

//空间面积测量
const onAreaMeasure = () => {
  measure.drawAreaMeasureGraphics({
    clampToGround: true,
    callback: () => {},
  });
};

//空间三角测量
const onTrianglesMeasure = () => {
  measure.drawTrianglesMeasureGraphics({
    callback: () => {},
  });
};

//清除测量的结果
const onClear = () => {
  measure._drawLayer.entities.removeAll();
};

//添加地形
const  addMapTerrain = ()=>{
    // 使用 Quantized Mesh 地形服务
    const terrainProvider = new Cesium.CesiumTerrainProvider({
        url: 'https://assets.cesium.com/1/',  // Ion 提供的量化网格地形服务
        requestVertexNormals: true,  // 启用法线数据，增强渲染效果
    });
    // 应用量化网格地形
    viewer.terrainProvider = terrainProvider;
}

onMounted(()=>{
    // addMapTerrain();
})

onUnmounted(() => {
  onClear();
});


onBeforeMount(() => {
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
});
</script>

<style scoped lang="scss"></style>

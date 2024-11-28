
<template>
  <div class="container">
      <div class="button-group">
       <button class="common-btn"  @click="onTrianglesMeasure">三角量测</button>
      <button  class="common-btn"  @click="onClear">清除</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import MeasureTool from "@/utils/cesiumCtrl/measure/measure.js";
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer
const measure = new MeasureTool(viewer);

const onTrianglesMeasure = () => {
    measure.drawTrianglesMeasureGraphics({
      callback: () => {},
    });
};

const onClear = () => {
  measure._drawLayer.entities.removeAll();
};

async function  set3Dtitle3 () {
  const url = "http://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json";
  let tilesetJson = viewerStore.get3DtilesParam()
  const tileset = await  Cesium.Cesium3DTileset.fromUrl(url,tilesetJson);
  // 非异步加载
  viewer.scene.primitives.add(tileset);
  viewer.flyTo(tileset, {
      offset: {
        heading: Cesium.Math.toRadians(120.0),//方向
        pitch: Cesium.Math.toRadians(-10),//倾斜角度
        range: 450
      }
  });
};

onMounted(()=>{
  set3Dtitle3();
})

onUnmounted(() => {
  onClear();
});
</script>

<style lang="scss" scoped></style>

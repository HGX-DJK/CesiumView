<template>
  <div></div>
</template>
<script setup>
import { onUnmounted } from "vue";
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

const imageryProvider = new Cesium.UrlTemplateImageryProvider({
  url: new Cesium.Resource({
    // url: "http://114.215.136.187:8080/spatio/resource-service/0dc36e39755246baa761228651c03fc1/334/{z}/{x}/{y}.png",
    // headers: {
    //   Authorization:
    //     "",
    // },
    url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=9ee992ae625e842c9f53d41257df0832",
    isCrossOriginUrl: true,
  }),
});
// viewer.scene3DOnly = true;
const imageLayer = viewer.imageryLayers.addImageryProvider(imageryProvider);

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

onUnmounted(() => {
  const layers = viewer.imageryLayers;
  const index = layers.indexOf(imageLayer);
  if (index > -1) {
    const res = layers.remove(layers.get(index));
    console.log("--删除图层--", res);
  }
});

</script>

<style lang="scss" scoped></style>

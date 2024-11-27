<template>
  <div class="container">
      <div class="button-group">
          <button class="common-btn" @click="getData">开始</button>
          <button class="common-btn" @click="onClear">清除</button>
      </div>
  </div>
</template>
<script setup>

import { onUnmounted }   from "vue";
import { ViewerStore }   from "@/store";
import { getGeojson }    from "@/api/api.js";
import { CesiumHeatmap } from "@/utils/cesiumCtrl/analysis/cesiumHeatMap.js";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

//开始获取数据，渲染热力图
let cesiumHeatMap = null;
const getData = async () => {
    const { res } = await getGeojson("/data/json/heatMap.json");
    const { features } = res;
    let heatData = [];
    if (features?.length) {
        heatData = features.map((item) => {
            return {
              x: item.properties.lng - 0.05,
              y: item.properties.lat - 0.04,
              value: item.properties.num,
            };
        });
    };
    cesiumHeatMap = new CesiumHeatmap(viewer, {
        zoomToLayer: true,
        points: heatData,
        heatmapDataOptions: { max: 1, min: 0 },
        heatmapOptions: {
            maxOpacity: 1,
            minOpacity: 0,
        },
    });
};

//清除渲染的热力图
const onClear = () => {
  cesiumHeatMap && cesiumHeatMap.remove();
};
onUnmounted(() => {
    onClear();
});
</script>


<style scoped lang='scss'>
</style>


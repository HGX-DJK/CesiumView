<!--道路闪烁-->
<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="onStart">开始</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, onBeforeMount, onMounted } from "vue";
import { ViewerStore } from "@/store";
import { getGeojson }  from "@/api/api.js";
import LineFlickerMaterialProperty from "@/utils/cesiumCtrl/materialAnimate/lineMaterial.js";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

//json数据链接
const jsonUrl = "/data/json/qdRoad_less.geojson";
let _dataSource = null;

//设置相机的视角
viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.188, 36.67, 200000),
});


//开始操作按钮
const onStart = () => {
    _dataSource = new Cesium.GeoJsonDataSource();
    _dataSource.load(jsonUrl).then(function (dataSource) {
      const entities = dataSource.entities.values;
      // 聚焦
      // viewer.zoomTo(entities);
      for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          entity.polyline.width = 3.0;
          //设置道路线条实体的材质
          entity.polyline.material = new LineFlickerMaterialProperty({
              color: Cesium.Color.YELLOW,
              // 设置随机变化速度
              speed: 20 * Math.random(),
          });
      };
    });
    viewer.dataSources.add(_dataSource);
};

const onClear = () => {
  viewer.dataSources.remove(_dataSource);
};

onMounted(() => {
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
});

onUnmounted(() => {
  onClear();
  // viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
  //   url: "http://data.marsgis.cn/terrain",
  // });
});

</script>

<style scoped lang="scss">
</style>

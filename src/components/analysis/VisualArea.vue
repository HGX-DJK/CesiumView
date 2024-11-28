<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="addVisualAnalysis">添加可视域</button>
      <button class="common-btn" @click="removeVisualLayer">删除可视域</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

let viewshedValue = "";
//开始可视分析
function addVisualAnalysis(){
  var viewsheds = [];
  var options = {
      qdOffset: 2,
      zdOffset: 2
  };
  viewshedValue = new viewshed(viewer, options);
  viewsheds.push(viewshed);
}

//移除可视化分析
function removeVisualLayer(){
  if(viewshedValue){
     viewshedValue.clear();
  };
  viewer.scene.primitives.removeAll();
}

//添加三位模型
async function set3Dtitle() {
  let translation = Cesium.Cartesian3.fromArray([0, 0, 0]);
  let m = Cesium.Matrix4.fromTranslation(translation);
  const url = 'http://data.marsgis.cn/3dtiles/qx-shequ/tileset.json';
  let tilesetJson = viewerStore.get3DtilesParam();
  const tileset = await Cesium.Cesium3DTileset.fromUrl(url, tilesetJson);
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


onMounted(() => {
  viewer.scene.globe.depthTestAgainstTerrain = true;
  set3Dtitle();
});

onUnmounted(() => {
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
  removeVisualLayer();
});

</script>

<style scoped lang="scss">

</style>

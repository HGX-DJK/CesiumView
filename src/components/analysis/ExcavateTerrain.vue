<template>

</template>

<script setup>
import { onMounted, onUnmounted  } from "vue";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
const baseUrl  = window._config.VITE_BASE_URL ;

//异步加载地形数据
const addWorldTerrainAsync = async () => {
  try {
    const terrainProvider = await Cesium.createWorldTerrainAsync({
      requestWaterMask: true,
      requestVertexNormals: true,
    });  
    viewer.terrainProvider = terrainProvider;
  } catch (error) {
    console.log(`Failed to add world imagery: ${error}`);
  };
};

//地形开挖
function startExcavate(){
      // 开启帧率
      viewer.scene.debugShowFramesPerSecond = true;
      // 深度监测
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.camera.setView({
          destination: new Cesium.Cartesian3(-2409813.389689466, 4694859.279606352, 3570137.7191554685)
      });
      var mr = [{
          x: -2409728.6420393116,
          y: 4694838.793290997,
          z: 3570221.295666795
      },
      {
          x: -2409788.2788523836,
          y: 4694808.716559992,
          z: 3570220.598452356
      },
      {
          x: -2409813.389689466,
          y: 4694859.279606352,
          z: 3570137.7191554685
      },
      {
          x: -2409755.7791936737,
          y: 4694886.737790491,
          z: 3570140.4776008143
      }
      ];
      new excavateTerrain(viewer, {
          positions: mr,
          height: 30,
          bottom: baseUrl + "images/excavate/excavationregion_side.jpg",
          side: baseUrl + "images/excavate/excavationregion_top.jpg",
      })
}


onMounted(() => {
    // 加载默认地形
    addWorldTerrainAsync();
    startExcavate();
});

onUnmounted(() => {

});

</script>

<style scoped lang="scss">

</style>

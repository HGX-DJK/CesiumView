<template>
  <div class="container">
      <div class="button-group">
          <button class="common-btn" @click="openSkylineAnay">打开天际线</button>
          <button class="common-btn" @click="closeSkylineAnay">关闭天际线</button>
      </div>
  </div>
</template>
<script setup>
import { onUnmounted, onMounted } from "vue";
import { ViewerStore } from "@/store";
import SkyLineAnalysis from "@/utils/cesiumCtrl/analysis/skyLineAnalysis.js";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
let skyLineIns;

//开启天际线分析
const openSkylineAnay = async () => {
    skyLineIns = new SkyLineAnalysis(viewer);
    // await sleep(3000);
    skyLineIns.open();
};

//关闭天际线分析
const closeSkylineAnay = () => {
   skyLineIns && skyLineIns.close();
};

//设置场景中相机的视角
const setCameraViewer = ()=>{
    viewer.camera.flyTo({
      // 从以度为单位的经度和纬度值返回笛卡尔3位置。
      destination: Cesium.Cartesian3.fromDegrees(
        120.58193064609729,
        36.125460378632766,
        200
      ),
      orientation: {
          // heading：默认方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角。
          // pitch：默认角度为-90，即朝向地面，正角度在平面之上，负角度为平面下，即上下旋转，也叫俯仰角。
          // roll：默认旋转角度为0，左右旋转，正角度向右，负角度向左，也叫翻滚角
          heading: Cesium.Math.toRadians(0.0), // 正东，默认北
          pitch: Cesium.Math.toRadians(0),
          roll: 0.0, // 左右
      },
      duration: 3, // 飞行时间（s）
    });
}

onMounted(async () => {
  setCameraViewer();
});

onUnmounted(() => {
  closeSkylineAnay();
});

</script>

<style scoped lang="scss"></style>

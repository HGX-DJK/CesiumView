<template>
  <div class="container">
    <div class="button-group">
      <button @click="onInit" class="common-btn">渲染火焰</button>
      <button @click="onClear" class="common-btn">清除</button>
    </div>
  </div>
</template>
<script setup>
import { onUnmounted } from 'vue';
import FireEffect from "@/utils/cesiumCtrl/particle/fire.js";
import { ViewerStore } from "@/store";
import { sleep } from "@/utils";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
let fire = "";
const onInit = async () => {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(120.361, 36.0885, 80),  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
        orientation: {
            direction: new Cesium.Cartesian3(0.7458181136018, -0.4270255968894706, 0.5112773034515067),
            up: new Cesium.Cartesian3(-0.19274344830978868, 0.5963500021825172, 0.7792410654159365)
        },
        duration: 3, // 飞行时间（s）
    });
    await sleep(3000);
    fire = new FireEffect(viewer) ;
};

const onClear = () => {
  fire && fire.remove() ;
}
onUnmounted(() => {
    fire && fire.remove();
})

</script>

<style lang='less' scoped>
</style>
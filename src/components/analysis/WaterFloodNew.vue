<template>
  <div class="container">
    <div class="params-set">
      <span>起始高度</span>
      <input v-model="water.startHeight" type="text">
      <span>目标高度</span>
      <input v-model="water.endHeight" type="text">
      <span>速度（米/秒）</span>
      <input v-model="water.speed" type="text">
      <span>当前高度</span>
      <input v-model="water.currentHeight" type="text">
    </div>
    <div>
      <button class="common-btn" @click="fly()">飞行到淹没区域</button>
      <button class="common-btn" @click="start()">开始淹没</button>
      <button class="common-btn" @click="clear()">清除</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
let waterFlood = "";
const water = reactive({
     startHeight:1000,
     endHeight:2500,
     speed:200,
     currentHeight:0
})
function fly() {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(98.71707797694049, 27.677299704639537, 50000.0)
  });
};
//开始淹没分析
function start() {
  waterFlood = new SubmergenceAnalysis({
    viewer: viewer,
    targetHeight: water.endHeight,
    startHeight: water.startHeight,
    adapCoordi: [
      98.676842346815, 27.571578111198868,
      98.86252156624968, 27.77444519911974,
      98.76756234288729, 27.800244194152533,
      98.57088699052892, 27.72492584876768,
      98.676842346815, 27.571578111198868,
    ],
    speed: water.speed,
    changetype: "up",
    speedCallback: function (h) {
      water.currentHeight = h;
    }
  });
  waterFlood.start()
}
//清除
function clear() {
  waterFlood && waterFlood.clear()
};

//添加地形
async function addTerrain(){
    // 开启帧率
    viewer.scene.debugShowFramesPerSecond = true;
    try {
      const terrainProvider = await Cesium.createWorldTerrainAsync({
        requestWaterMask: true,
        requestVertexNormals: true,
      });  
      viewer.terrainProvider = terrainProvider;
    } catch (error) {
      console.log(`Failed to add world imagery: ${error}`);
    };
    // 深度监测
    viewer.scene.globe.depthTestAgainstTerrain = true;
}

onMounted(()=>{
  addTerrain()
})

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>

.params-set{
  display: flex;
  align-items: center;
  margin: 2rem 0;
  span{
    background-color: #e5e5e5;
    opacity: 0.8;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin:0 2.5rem;
  }
  input{
     width: 10rem;
     color:#000;
  }
}
.common-btn{
  width: 17rem;
}
</style>

<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="onStart">开始模拟</button>
      <button class="common-btn" @click="onDel">删除</button>
    </div>
  </div>
</template>
<script setup>
import { onUnmounted, ref } from "vue";
import { ViewerStore } from "@/store";
import MeasureTool from "@/utils/cesiumCtrl/measure/measure.js";


const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
const measure = new MeasureTool(viewer);

const onClear = () => {
  measure._drawLayer.entities.removeAll();
};

async function set3Dtitle3 (){
  let translation = Cesium.Cartesian3.fromArray([0, 0, 0]);
  let matrixValue = Cesium.Matrix4.fromTranslation(translation);
  const url = "http://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json";
  let tilesetJson = viewerStore.get3DtilesParam();
  const tileset =  await Cesium.Cesium3DTileset.fromUrl(url,tilesetJson);
  // 非异步加载
  viewer.scene.primitives.add(tileset);
  //相机定位到3DTiles模型
  viewer.flyTo(tileset);
  //模型的监听事件
  tileset.allTilesLoaded.addEventListener(function () {
      console.log("模型已经全部加载完成");
  });
};
set3Dtitle3();


//开始水淹分析
let waterEntity = null;
let waterTimer = null;
const onStart = () => {
  //水淹范围
  const waterCoord = [
    121.48033090358801, 29.790483294870796, 0, 121.4778771950879,
    29.79083578574342, 0, 121.47877939338282, 29.79193540741442, 0,
    121.4804061804202, 29.791480141327728, 0,
  ];
  //水淹开始的高度
  let startHeight = 10;
  //水淹的目标高度
  const targetHeight = 20;
  //动态高度、特定颜色和不规则形状的水体多边形实体
  waterEntity = viewer.entities.add({
      polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(waterCoord),
          material: Cesium.Color.fromBytes(64, 157, 253, 200),
          //指定多边形的每个顶点都可以有不同的高度，允许更复杂的地形表现。
          perPositionHeight: true,
          //startHeight变化时，extrudeHeight就自动更新
          extrudedHeight: new Cesium.CallbackProperty(() => {
              return startHeight;
          }, false),
      },
  });
  //定时器
  waterTimer = setInterval(() => {
      if (startHeight < targetHeight) {
          startHeight += 0.1;
          if (startHeight >= targetHeight) {
              startHeight = targetHeight;
              clearInterval(waterTimer);
          };
          // 使用该方式会闪烁，改用 Cesium.CallbackProperty 平滑
          // this.waterEntity.polygon.extrudedHeight.setValue(startHeight)
      };
  }, 50);
};

const onDel = () => {
  if (waterTimer) {
    clearInterval(waterTimer);
  };
  viewer.entities.remove(waterEntity);
};

onUnmounted(() => {
  onDel();
  viewer.scene.primitives.removeAll();
});
</script>

<style lang="scss" scoped></style>

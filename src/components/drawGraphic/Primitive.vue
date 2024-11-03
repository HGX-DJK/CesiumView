<template>
    <div class="container">
        <div class="button-group">
            <button class="common-btn" @click="getJson">撒点</button>
            <button class="common-btn" @click="onClear">清除撒点</button>
        </div>
    </div>
</template>


<script setup>
import { ViewerStore } from "@/store";
import { getGeojson } from "@/api/api.js";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
// 先把广告牌实例化，然后再添加到场景中
const billboardsCollection = viewer.scene.primitives.add(
    new Cesium.BillboardCollection()
);
// 点位特性信息集合
let pointFeatures = [];
// 先获取点位的json信息
const getJson = () => {
    getGeojson("/data/json/chuzhong.geojson").then(({ res }) => {
        console.log(res);
        const { features } = res;
        pointFeatures = features;
        formatData(features);
    });
};
const formatData = (features) => {
    for (let i = 0; i < features.length; i++) {
        const feature = features[i];
        // 每个点位的坐标
        const coordinates = feature.geometry.coordinates;
        // 将坐标处理成3D笛卡尔点
        const position = Cesium.Cartesian3.fromDegrees(
            coordinates[0],
            coordinates[1],
            1000
        );
        const name = feature.properties.name;
        // 画普通的点
        // pointCollection.add({
        //   position,
        //   color: Cesium.Color.CYAN,
        //   pixelSize: 36,
        // })
        // 带图片的点
        billboardsCollection._id = `mark`;
        // add的是Billboard，将一个个Billboard添加到集合当中
        billboardsCollection.add({
            image: "/images/mark-icon.png",
            width: 32,
            height: 32,
            position,
        });
        // TODO:如果text是动态的，有性能问题；
        // labelCollection.add({
        //   position,
        //   blendOption: Cesium.BlendOption.TRANSLUCENT, // 半透明，提高性能2倍
        //   text: name,
        //   font: "bold 15px Microsoft YaHei",
        //   // 竖直对齐方式
        //   verticalOrigin: Cesium.VerticalOrigin.CENTER,
        //   // 水平对齐方式
        //   horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        //   // 偏移量
        //   pixelOffset: new Cesium.Cartesian2(15, 0),
        // })
    }
};

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

const onClear = () => {
  billboardsCollection?.removeAll();
};

onUnmounted(() => {
  onClear();
});

</script>


<style lang='less' scoped>
</style>
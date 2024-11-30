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
import { getGeojson }  from "@/api/api.js";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
// 点位特性信息集合
let pointFeatures = [];
// 先获取点位的json信息
const getJson = () => {
    getGeojson("/data/json/chuzhong.geojson").then(({ res }) => {
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
            2
        );
        viewer.entities.add({
            position: position,
            billboard: {
                // 图像地址，URI或Canvas的属性
                image: "/images/mark-icon.png",
                // 设置颜色和透明度
                // color: Cesium.Color.RED.withAlpha(0.8),
                // 高度（以像素为单位）
                height: 50,
                // 宽度（以像素为单位）
                width: 50,
                // 大小是否以米为单位
                sizeInMeters: false,
                // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
                scale: 1.0,
                // 是否显示
                show: true,
                //禁用深度检测,防止深度检测造成遮挡
                disableDepthTestDistance: Number.POSITIVE_INFINITY,  
                // 逆时针旋转
                // rotation: 20,

                // 相对于坐标的垂直位置
                // verticalOrigin: Cesium.VerticalOrigin.CENTER,

                // 相对于坐标的水平位置
                // horizontalOrigin: Cesium.HorizontalOrigin.LEFT,

                // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                // pixelOffset: new Cesium.Cartesian2(10, 0),

                // 显示在距相机的距离处的属性，多少区间内是可以显示的
                // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1500),
    
                // 点的大小（像素）
                // pixelSize: 5,
                // // 点位颜色，fromCssColorString 可以直接使用CSS颜色
                // color: Cesium.Color.fromCssColorString('#ee0000'),
                // // 边框颜色
                // outlineColor: Cesium.Color.fromCssColorString('#fff'),
                // // 边框宽度(像素)
                // outlineWidth: 2,
            }
        });
    }
};

viewer.camera.setView({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

const onClear = () => {
    viewer.entities.removeAll();
};

onUnmounted(() => {
    onClear();
});

</script>


<style lang='less' scoped></style>
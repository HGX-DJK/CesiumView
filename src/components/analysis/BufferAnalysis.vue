<template>
    <div class="container">
        <div class="button-group">
            <button class="common-btn" @click="addBufferGeometry()">开始</button>
            <button class="common-btn" @click="onClear">清除</button>
        </div>
    </div>
</template>
<script setup>

import { onMounted, onUnmounted } from "vue";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
//清除
function onClear() {
    viewer.entities.removeAll();
};
//飞入
function flyTo() {
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(98.71707797694049, 27.677299704639537, 60000.0)
    });
};
//添加点缓冲
function addPointBuffer() {
    var point = turf.point([98.71707797694049, 27.677299704639537]);
    var buffered = turf.buffer(point, 2, { units: 'kilometers' });
    var pointBufferJson = buffered.geometry.coordinates[0];
    viewer.entities.add({
        name: "点缓冲",
        polygon: {                                    // lodash把二维数组压成一维数组
            hierarchy: Cesium.Cartesian3.fromDegreesArray(_.flatten(pointBufferJson)),
            material: Cesium.Color.RED.withAlpha(0.5),
        },
    });
};
//添加基础线
function addBaseLine() {
    viewer.entities.add({
        name: '基础线',
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([98.676842346815, 27.571578111198868,
                98.86252156624968, 27.77444519911974,
                98.76756234288729, 27.800244194152533]),
            width: 3,
            material: Cesium.Color.RED,
            clampToGround: true,//贴地画线
        }
    });
};
//添加线缓冲
function addLineBuffer1(line) {
    var buffered = turf.buffer(line, 0.5, { units: 'kilometers' });
    var pointBufferJson = buffered.geometry.coordinates[0];
    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(_.flatten(pointBufferJson)),
            material: Cesium.Color.BLUE.withAlpha(0.5),
        },
    });
};
//添加线缓冲
function addLineBuffer2(line) {
    var buffered2 = turf.buffer(line, 0.7, { units: 'kilometers' });
    var pointBufferJson = buffered2.geometry.coordinates[0];
    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(_.flatten(pointBufferJson)),
            material: Cesium.Color.YELLOW.withAlpha(0.5),
        },
    });
};
//添加缓冲区集合图形
function addBufferGeometry() {
    flyTo();
    addPointBuffer();
    addBaseLine();
    var line = turf.lineString([[98.676842346815, 27.571578111198868], [98.86252156624968, 27.77444519911974], 
    [98.76756234288729, 27.800244194152533]]);
    addLineBuffer1(line);
    addLineBuffer2(line);
};

onMounted(() => {
    // 开启帧率
    viewer.scene.debugShowFramesPerSecond = true;
    // 深度监测
    viewer.scene.globe.depthTestAgainstTerrain = true;
});

onUnmounted(() => {
    onClear();
})
</script>


<style scoped lang='scss'></style>
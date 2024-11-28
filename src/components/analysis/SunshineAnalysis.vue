<template>
    <div class="container">
        <input id="meeting" type="date" value="2020-10-20" />
        开始时间
        <select id="ks">
            <option value="6">6</option>
            <option selected value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
        </select>
        结束时间
        <select id="js">
            <option value="14">14</option>
            <option value="16">16</option>
            <option selected value="18">18</option>
            <option value="20">20</option>
        </select>
        <button class="common-btn" @click="setvisible('play')">播放</button>
        <button class="common-btn" @click="setvisible('stop')">暂停</button>
    </div>
</template>
<script setup>

import { onMounted, onUnmounted } from "vue";
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
//加载3DTiles
async function add3Dtiles(){
    let  url = window._config.VITE_BASE_URL  + "data/tiles/tileset.json";
    let tilesetJson = viewerStore.get3DtilesParam()
    const tileset = await  Cesium.Cesium3DTileset.fromUrl(url,tilesetJson);
    viewer.scene.primitives.add(tileset);
    viewer.flyTo(tileset, {
        offset: {
            heading: Cesium.Math.toRadians(120.0),//方向
            pitch: Cesium.Math.toRadians(-10),//倾斜角度
            range: 450
        }
    });
    // tileset.readyPromise
    //     .then(function (tileset) {
    //         viewer.zoomTo(tileset)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
};

function setvisible(p) {
    if (p == "play") {
        new sunlight(viewer, {
            play: true,
            multiplier: 500,
            day: document.getElementById("meeting").value,
            startTime: document.getElementById("ks").value,
            stopTime: document.getElementById("js").value,
            clockRange: Cesium.ClockRange.LOOP_STOP,
            clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
        })
    } else {
        new sunlight(viewer, {
            play: false,
        })
    }
}


function onClear(){
    viewer.scene.primitives.removeAll();
}

onMounted(() => {
    // 开启帧率
    viewer.scene.debugShowFramesPerSecond = true;
    // 深度监测
    viewer.scene.globe.depthTestAgainstTerrain = true;

    add3Dtiles();
});

onUnmounted(() => {
    onClear();
})
</script>


<style scoped lang='scss'>
.container{
    position: absolute;
    top: 2.5rem;
    left: 20rem;
    padding: 10px;
    background: #72a8eafa;
    border-radius: 3px;
    border: 1px solid rgba(128, 128, 128, 0.5);
    color: #ffffff;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 3px 14px rgba(128, 128, 128, 0.5);
    z-index: 9999;
}
</style>
<template>
    <div class="map-container">
        <div id="map"></div>
        <div class="button-group">
            <button class="common-btn" @click="addTiles('light')">白色地图</button>
            <button class="common-btn" @click="addTiles('dark')">暗色地图</button>
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
let map = null ;
//请求地址
let resUrl = "http://127.0.0.1:8086/"
//初始化地图
function initMap() {
    map = new maptalks.Map("map", {
        center: [121.4361977, 31.228067],
        zoom: 14,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: true,
    });
}
//加载地图瓦片
function addTiles(type) {
    let tileUrl = `${resUrl}raster/{z}/{x}/{y}`;
    if (type == "dark") {
        tileUrl = `${resUrl}raster/raster_dark/{z}/{x}/{y}`
    }
    //使用TileLayer加载栅格瓦片数据
    let baseLayer = new maptalks.TileLayer("baseRater", {
        opacity: 1,
        urlTemplate: tileUrl
    });
    map.setBaseLayer(baseLayer);
};

onMounted(() => {
    initMap();
    addTiles("light")
})
</script>



<style scoped lang="scss">
.map-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70%;
    height: 70%;
    background-color: rgba(178,206,254,1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
    border-radius: 12px;
    padding:0.5rem;
    z-index: 99;
}

#map {
    width: 100%;
    height: 100%;
}

.button-group {
    position: absolute;
    left: 10rem;
    top: 1rem;

    button {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }

}
</style>
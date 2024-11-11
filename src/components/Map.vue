<template>
    <div id="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore()
//注册Cesium Ion令牌
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YjA2MDlkOC02YjU2LTRhM2QtYmI3Zi1lMDI3ZmQ0MTFiNWQiLCJpZCI6Mzk0OTMsImlhdCI6MTcyNjMwMDUxOX0.H9gvu2kRlbbfWS27EMXG1daljQfhOMSNQU__OoWVigk";
//初始化地图
function initMap() {
    const viewer = new Cesium.Viewer("map-container", {
        geocoder: true,              //控制地图是否显示一个地理编码（geocoding）控件，允许用户搜索地点并定位到特定位置。
        homeButton: true,            //控制是否显示一个回到初始视图的按钮，允许用户快速返回到地图的初始状态
        animation: true,             //控制是否显示动画控件，允许用户播放、暂停或者改变时间。
        fullscreenButton: true,      //控制是否显示全屏按钮，允许用户切换地图进入或退出全屏模式。
        sceneModePicker: true,       //控制是否显示场景模式选择器，允许用户在 2D、3D 和 CV（Columbus View）模式之间切换
        timeline: true,              //控制是否显示时间轴控件，允许用户在时间上浏览数据。
        navigationHelpButton: true,  //控制是否显示导航帮助按钮，提供关于如何使用地图导航控件的帮助信息
        baseLayerPicker: true,       //控制是否显示基础图层选择器，允许用户选择不同的基础图层（如卫星影像、地图等）。
        infoBox: true,               //控制是否显示信息框，当用户点击地图上的对象时，会显示与该对象相关的信息。
        scene3DOnly: true,           //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        selectionIndicator: true,    //控制是否显示选择指示器，用于指示当前选择的地图对象。
        baselLayerPicker: true,      //控制是否显示基础图层选择器，允许用户选择不同的基础图层。
        //添加ArcGis瓦片底图图层
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        }),
        // terrain: Cesium.Terrain.fromWorldTerrain(), // 地形数据
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   url: "",
        // }),
        // terrain: Cesium.Terrain.fromWorldTerrain({
        //   requestVertexNormals: true, //Needed to visualize slope
        // }),
        // 指定上下文
        // contextOptions: {
        //   requestWebgl1: true,
        // },
    });
    // 去除logo
    viewer.cesiumWidget.creditContainer.style.display = "none";
    // 显示帧率
    viewer.scene.debugShowFramesPerSecond = true;
    //开启或者关闭深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;

    // 外天空盒
    viewer.scene.skyBox = new Cesium.SkyBox({
        sources: {
            positiveX: "/images/Standard-Cube-Map/px1.png",
            negativeX: "/images/Standard-Cube-Map/nx1.png",
            positiveY: "/images/Standard-Cube-Map/pz.png",
            negativeY: "/images/Standard-Cube-Map/nz1.png",
            positiveZ: "/images/Standard-Cube-Map/py.png",
            negativeZ: "/images/Standard-Cube-Map/ny1.png",
        },
    });
    //初始化Viewer
    viewerStore.initViewer(viewer);
    setViewDestination();

}


//设置地图视角
function setViewDestination(){
    //获取三维场景相机
    var camera = viewerStore.viewer.camera;
    //相机设置视角及高度
    camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(121.47,31.23, 1000),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: Cesium.Math.toRadians(0)
        }
    });
}

onMounted(() => {
    initMap();
})
</script>


<style scoped lang="scss">

</style>
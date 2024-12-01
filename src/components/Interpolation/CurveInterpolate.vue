<template>
</template>

<script setup>
import { ViewerStore } from "@/store";
import { onMounted, onUnmounted } from "vue";
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
viewer.scene.debugShowFramesPerSecond = true;
var controls = [
    Cesium.Cartesian3.fromDegrees(110, 10),
    Cesium.Cartesian3.fromDegrees(111, 11),
    Cesium.Cartesian3.fromDegrees(112, 9),
    Cesium.Cartesian3.fromDegrees(114, 10),
    Cesium.Cartesian3.fromDegrees(113, 8),
];
//添加点位
function addPoint(){
    for (var i = 0; i < controls.length; i++) {
      viewer.entities.add({
        position: controls[i],
        point: {
          color: Cesium.Color.RED,
          pixelSize: 10,
        },
      });
    };
}
//添加直线插值
function addLine(){
    var spline = new Cesium.LinearSpline({
      times: [0.0, 0.25, 0.5, 0.75, 1],
      points: controls,
    });
    var positions = [];
    for (var i = 0; i <= 100; i++) {
      var cartesian3 = spline.evaluate(i / 100);
      positions.push(cartesian3);
      viewer.entities.add({
        position: cartesian3,
        point: {
          color: Cesium.Color.YELLOW,
          pixelSize: 6,
        },
      });
    }
    viewer.entities.add({
      name: "LinearSpline",
      polyline: {
        positions: positions,
        width: 3,
        material: Cesium.Color.GREEN,
      },
    });
}

//添加曲线
function addCurveLine(){
    var spline = new Cesium.CatmullRomSpline({
      points: controls,
      times: [0.0, 0.25, 0.5, 0.75, 1],
    });
    // 插值100个点
    var positions = [];
    for (var i = 0; i <= 100; i++) {
      var cartesian3 = spline.evaluate(i / 100);
      positions.push(cartesian3);
      viewer.entities.add({
        position: cartesian3,
        point: {
          color: Cesium.Color.BLUE,
          pixelSize: 6,
        },
      });
    };
    // 将插值所有的点绘制成线
    viewer.entities.add({
      name: "CatmullRomSpline",
      polyline: {
        positions: positions,
        width: 3,
        material: Cesium.Color.WHITE,
      },
    });
}

//飞入到对应的视角
function flyTo(){
    viewer.camera.flyTo({
      // 从以度为单位的经度和纬度值返回笛卡尔3位置。
      destination: Cesium.Cartesian3.fromDegrees(110,10,900000),
      duration: 3, // 飞行时间（s）
    });
}

onMounted(()=>{
    viewer.scene.globe.depthTestAgainstTerrain = false;
    flyTo();
    addPoint();
    addLine();
    addCurveLine();
});
onUnmounted(()=>{
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.entities.removeAll();
})
</script>


<style scoped lang="scss"></style>

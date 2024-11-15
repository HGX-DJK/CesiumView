<!--矩形雷达扫描-->
<template>
  <canvas id="canvas-a" class="canvas" width="300" height="300"></canvas>
</template>

<script setup>
import { getCurrentInstance, onMounted, onUnmounted } from "vue";
import { ViewerStore } from "@/store";

const { proxy } = getCurrentInstance();
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

//设置初始位置
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(121.37, 31.23, 70000)
});
//旋转角度
let rotation = Cesium.Math.toRadians(30);
//开启雷达扫描
function startRadar() {
    viewer.entities.add({
        name: '矩形雷达扫描',
        rectangle: {  
            coordinates: new Cesium.CallbackProperty(function () { 
              return Cesium.Rectangle.fromDegrees(121.27, 31.03, 121.57, 31.33) 
            }, false),
            material: new Cesium.ImageMaterialProperty({
                image: new Cesium.CallbackProperty(drawCanvas, false),
                transparent: true
            }),
            rotation:   new Cesium.CallbackProperty(getRotationValue, false),
            stRotation: new Cesium.CallbackProperty(getRotationValue, false)
        }
    });
    console.log(viewer.entities);
    viewer.zoomTo(viewer.entities);
};

//获取旋转角度
function getRotationValue() {
    rotation -= 0.02;
    return rotation;
};
//获取绘制的canvas画布
function drawCanvas() {
    let canvas = document.getElementById("canvas-a");
    let context = canvas.getContext('2d');
    let grd = context.createLinearGradient(175, 100, canvas.width, 150);
    grd.addColorStop(0, "rgba(0,255,0,0)");
    grd.addColorStop(1, "rgba(0,255,0,1)");
    context.fillStyle = grd;
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 140, -90 / 180 * Math.PI, 0 / 180 * Math.PI);//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    context.fill();
    return canvas;
};

//清除雷达扫描
const onClear = () => { };

onMounted(() => {
    //开启深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;
    proxy.$nextTick(()=>{
        startRadar();
    });
})

onUnmounted(() => {
   onClear();
});

</script>

<style scoped lang="scss">

#canvas-a {
  position: relative;
  top: 10px;
  display: none;
}

</style>

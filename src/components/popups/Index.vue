<template>
</template>


<script setup>
import { getCurrentInstance, onMounted }   from "vue";
import { ViewerStore } from "@/store";
const { proxy }  = getCurrentInstance();
const viewerStore = ViewerStore();
const viewer = viewerStore.viewer

let currentEntity = null
//添加气泡弹窗
function addEntityPopup(){
    currentEntity = viewer.entities.add({
        name: '贴地',
        position: Cesium.Cartesian3.fromDegrees(121.47,31.23),
        point: {
            pixelSize: 15,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        // 添加自定义属性
        data: {
            name: '乐沙坡公园'
        }
    });

    addDomModel();

     //不具有标题头和关闭按钮的弹窗
     var popup2 = new Popup({
            viewer: viewer,
            className: "bx-popup-ctn2",
            html: function (header, content) {
                return `
                <div class="divpoint-wrap">
                    <div class="divpoint-center">
                        <div class="bx-popup-content-ctn" >
                            <div class="bx-popup-content" >
                            ${content}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="directional"></div>
            `;}
        });
        popup2.add({
            geometry: Cesium.Cartesian3.fromDegrees(121.47,30.23),
            content: {
                content: `
                    <div><span>监控名称：</span><span>中国银行(银河三路店)</span></div>
                    <div><span>监控编号：</span><span>${parseInt(Math.random() * 100)}</span></div>
                    <div><span>监控类型：</span><span>固定枪机</span></div>
                    <div><span>监控状态：</span><span>在线</span></div>
                  `
            },
            isclose: false
        });
};

function addDomModel(coordinate = [121.47,31.23]){
     //弹窗
     var popup = new Popup({
        viewer: viewer,
        className: "bx-popup-ctn2"
    });
    popup.add({
        geometry: Cesium.Cartesian3.fromDegrees(coordinate[0],coordinate[1]),
        content: {
            header: "数据点",
            content: `
            <div><span>监控名称：</span><span>中国银行(银河三路店)</span></div>
            <div><span>监控编号：</span><span>${parseInt(Math.random() * 100)}</span></div>
            <div><span>监控类型：</span><span>固定枪机</span></div>
            <div><span>监控状态：</span><span>在线</span></div>
                `
        },
        isclose: true
    });
}

//相机视角改变
function flyTo(){
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(121.47,29.23, 500000), // 高度设置为 5000 米
        orientation: {
            heading: Cesium.Math.toRadians(0.0), // 水平视角方向
            pitch: Cesium.Math.toRadians(-70.0), // 俯仰角
            roll: 0.0, // 滚转角
        },
        duration: 3, // 飞行时间，单位：秒
    });
};

//添加点击事件
function addClickEvent(){
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (clickEvent) {
            // 获取被点击的实体
            // var ray1 = viewer.camera.getPickRay(clickEvent.position);
            // var cartesian = viewer.scene.globe.pick(ray1, viewer.scene);
            var pickEd = viewer.scene.pick(clickEvent.position);
            if (pickEd) {
                console.log(pickEd)
            };
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
onMounted(()=>{
    // 开启帧率
    viewer.scene.debugShowFramesPerSecond = true;
    proxy.$nextTick(()=>{
        addEntityPopup();
        flyTo();
        addClickEvent()
    })
})

</script>




<style scoped lang="scss">
    
</style>
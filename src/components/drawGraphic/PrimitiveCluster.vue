<template>
    <div class="container">
        <div class="button-group">
            <button class="common-btn" @click="onCluster">primitive撒点聚合</button>
            <button class="common-btn" @click="onClear">清除撒点</button>
        </div>
    </div>
</template>


<script setup>
import { ViewerStore } from "@/store";
import { getGeojson } from "@/api/api.js";
import PrimitiveCluster from "@/utils/cesiumCtrl/drawGraphic/primitiveCluster";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

viewer.camera.setView({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});


const onCluster = () => {
    getGeojson("/data/json/schools.geojson").then(({ res }) => {
        console.log(res);
        const { features } = res;
        formatClusterPoint(features);
    });
};

let primitivesCollection = null;
let primitives = null;
let billboardsCollectionCombine = new Cesium.BillboardCollection();

//重新组织聚合点位数据
const formatClusterPoint = (features) => {
    primitivesCollection = new Cesium.PrimitiveCollection();
    billboardsCollectionCombine = new Cesium.BillboardCollection();
    var scene = viewer.scene;
    let primitivecluster = new PrimitiveCluster();

    //与entitycluster相同设置其是否聚合 以及最大最小值
    primitivecluster.enabled = true;
    primitivecluster.pixelRange = 60;
    primitivecluster.minimumClusterSize = 2;
    // primitivecluster._pointCollection = pointCollection;
    // primitivecluster._labelCollection = labelCollection;

    //后面设置聚合的距离及聚合后的图标颜色显示与官方案例一样
    for (let i = 0; i < features.length; i++) {
        const feature = features[i];
        const coordinates = feature.geometry.coordinates;
        const position = Cesium.Cartesian3.fromDegrees(
            coordinates[0],
            coordinates[1],
            2000
        );

        // 带图片的点
        billboardsCollectionCombine.add({
            image: "/images/mark-icon.png",
            width: 32,
            height: 32,
            position,
        });
    }
    primitivecluster._billboardCollection = billboardsCollectionCombine;

    // 同时在赋值时调用_initialize方法
    primitivecluster._initialize(scene);

    primitivesCollection.add(primitivecluster);

    //将图元信息加入到场景中
    primitives = viewer.scene.primitives.add(primitivesCollection);

    //图元聚类事件监听
    primitivecluster.clusterEvent.addEventListener(
        (clusteredEntities, cluster) => {
            // console.log("clusteredEntities", clusteredEntities);
            // console.log("cluster", cluster);
            // 关闭自带的显示聚合数量的标签
            cluster.label.show = false;
            cluster.billboard.show = true;
            cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;

            // 根据聚合数量的多少设置不同层级的图片以及大小
            cluster.billboard.image = combineIconAndLabel(
                "/images/school-icon.png",
                clusteredEntities.length,
                64
            );
            // cluster.billboard.image = "/images/school-icon.png";
            cluster.billboard._imageHeight = 60;
            cluster.billboard._imageWidth = 60;
            cluster.billboard._dirty = false;
            cluster.billboard.width = 40;
            cluster.billboard.height = 40;
        }
    );
    return primitivecluster;
};


/**
 * @description: 将图片和文字合成新图标使用（参考Cesium源码）
 * @param {*} url：图片地址
 * @param {*} label：文字
 * @param {*} size：画布大小
 * @return {*} 返回canvas
 */
function combineIconAndLabel(url, label, size) {
    // 创建画布对象
    let canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    let ctx = canvas.getContext("2d");

    let promise = new Cesium.Resource.fetchImage(url).then((image) => {
        // 异常判断
        try {
            ctx.drawImage(image, 0, 0);
        } catch (e) {
            console.log(e);
        };
        // 渲染字体
        // font属性设置顺序：font-style, font-variant, font-weight, font-size, line-height, font-family
        ctx.fillStyle = Cesium.Color.BLACK.toCssColorString();
        ctx.font = "bold 20px Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, size / 2, size / 2);

        return canvas;
    });
    return promise;
}


const onClear = () => {
  primitives?.removeAll();
  primitivesCollection = null;
  billboardsCollectionCombine = null;
};

onUnmounted(() => {
  onClear();
});

</script>


<style lang='less' scoped></style>
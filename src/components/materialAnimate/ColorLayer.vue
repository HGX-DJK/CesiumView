<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="getJson">开始</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { getGeojson }  from "@/api/api.js";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

//获取数据
const getJson = async () => {
  const { res } = await getGeojson("data/json/qingdaoArea.geojson");
  const { res: pointRes } = await getGeojson("data/json/areaPoint.geojson");
  addDataToGlobe(res.features, pointRes);
};
//标签集合
const labelCollection = viewer.scene.primitives.add(
  new Cesium.LabelCollection()
);
//颜色数组
const colorArrs = [
  "AQUAMARINE",
  "BEIGE",
  "CORNFLOWERBLUE",
  "DARKORANGE",
  "GOLD",
  "GREENYELLOW",
  "LIGHTPINK",
  "ORANGERED",
  "YELLOWGREEN",
  "TOMATO",
];
const areaPointCenter = [];
const addDataToGlobe = (features, pointRes) => {
  let instances = [];
  for (let i = 0; i < features.length; i++) {
    const curFeatures = features[i];
    for (let j = 0; j < curFeatures.geometry.coordinates.length; j++) {
      //或数组中某一项逗号分隔，并将其转换成number类型的
      const polygonArray = curFeatures.geometry.coordinates[j]
        .toString()
        .split(",")
        .map(Number);

      //创建几何面
      const polygon = new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(polygonArray)
          ),
          vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
          // 设置面的拉伸高度
          extrudedHeight: 100,
          // height: 100, // 多边形和椭球表面之间的距离（以米为单位）。
      });

      /**
        * 多边形的定义（例如坐标点、属性）仅是数据本身，不包含任何与图形相关的渲染信息（如法线、纹理坐标等）。
        * createGeometry 方法会计算出所有需要的顶点、法线等，用于渲染引擎生成最终的三维形状。
      */
      // const polygonPositions = polygon.polygonHierarchy.getValue
      const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

      /**
       * Cesium.GeometryInstance 的作用：
       * 关联几何与外观：它将几何体和外观属性（例如颜色）以及空间位置（通过 modelMatrix）绑定在一起，便于 Cesium 引擎进行渲染。
       * 性能优化：GeometryInstance 允许多个几何体共享相同的几何定义，但每个实例可以有不同的位置和外观。这种方式可以大大提高场景渲染的性能。
       * 用于批量渲染：通常会将多个 GeometryInstance 传递给 Primitive，以便在场景中高效地绘制多个几何体。
       */
      instances.push(
        new Cesium.GeometryInstance({
          id: `polygon-${i}`,
          geometry: geometry,
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.fromAlpha(Cesium.Color[colorArrs[i]], 0.6)
            ),
            show: new Cesium.ShowGeometryInstanceAttribute(true),
            // color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.7 })),
          },
        })
      );
    }
    // 寻找中心点位，添加标签
    const p = pointRes.features.find(
      (item) => item.properties["ID"] == curFeatures["properties"]["id"]
    );
    const carter3Position = Cesium.Cartesian3.fromDegrees(
      ...p["geometry"]["coordinates"],
      1500
    );
    areaPointCenter.push(p["geometry"]["coordinates"]);
    labelCollection.add({
      text: curFeatures["properties"]["name"],
      font: "bold 15px Microsoft YaHei",
      blendOption: Cesium.BlendOption.TRANSLUCENT, // 半透明，提高性能2倍
      position: carter3Position,
      // 竖直对齐方式
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      // 水平对齐方式
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    });
  }

  // 合并单个geometry,提高渲染效率
  const primitive = new Cesium.Primitive({
      //表示几何体实例将保留在内存中
      releaseGeometryInstances: false,
      //几何体实例或多个几何体实例
      geometryInstances: instances,
      //决定几何体的渲染外观
      appearance: new Cesium.PerInstanceColorAppearance({
        translucent: true, // 当 true 时，几何体应该是半透明的，因此 PerInstanceColorAppearance#renderState 启用了 alpha 混合。
        closed: false, // 当 true 时，几何体应该是关闭的，因此 PerInstanceColorAppearance#renderState 启用了背面剔除。
      }),
      //决定几何体是否应异步构建
      asynchronous: false,
  });
  viewer.scene.primitives.add(primitive);
};

//色块图层的点击事件
const scene = viewer.scene;
const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction((e) => {
    // 获取实体
    const pick = scene.pick(e.position);
    if (Cesium.defined(pick) && pick.id.indexOf("polygon") > -1) {
        const id = pick.id.replace(/polygon-/g, "");
        // 单击变色(TODO:遇到多个相同id的instance会失效)
        // const attributes = pick.primitive.getGeometryInstanceAttributes(pick.id)
        // console.log("----attributes---", attributes)
        // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.WHITE);
        viewer.camera.flyTo({
          // 从以度为单位的经度和纬度值返回笛卡尔3位置。
          destination: Cesium.Cartesian3.fromDegrees(...areaPointCenter[id], 40000),
          orientation: {
            // heading：默认方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角。
            // pitch：默认角度为-90，即朝向地面，正角度在平面之上，负角度为平面下，即上下旋转，也叫俯仰角。
            // roll：默认旋转角度为0，左右旋转，正角度向右，负角度向左，也叫翻滚角
            heading: Cesium.Math.toRadians(0.0), // 正东，默认北
            pitch: Cesium.Math.toRadians(-90), // 向正下方看
            roll: 0.0, // 左右
          },
          duration: 2, // 飞行时间（s）
        });
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


const onClear = () => {
  viewer.scene.primitives.removeAll();
};

onMounted(() => {
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
})

onUnmounted(() => {
  onClear();
  // viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
  //   url: "http://data.marsgis.cn/terrain",
  // });
});

</script>

<style scoped lang="scss"></style>

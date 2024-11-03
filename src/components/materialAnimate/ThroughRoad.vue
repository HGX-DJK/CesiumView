<!--道路穿梭-->
<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="onStartEntity">开始(entity渲染)</button>
      <button class="common-btn" @click="onStartPimitive">开始(primitive渲染)</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { ViewerStore } from "@/store";
import { getGeojson }  from "@/api/api.js";
import { modifyMap ,removeAddMap } from "@/utils/cesiumCtrl/materialAnimate/modifyMap.js";
import RoadThroughLine from "@/utils/cesiumCtrl/materialAnimate/roadThrough.js";


const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

const jsonUrl = "/data/json/qingdaoRoad.geojson";

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.188, 36.67, 200000),
});

let _dataSource = null;
const material = new RoadThroughLine(1000, "/images/spriteline.png");

//开始entity渲染
const onStartEntity = () => {
    // 道路闪烁线
    _dataSource = new Cesium.GeoJsonDataSource();
    _dataSource.load(jsonUrl).then(function (dataSource) {
        const entities = dataSource.entities.values;
        // 聚焦
        // viewer.zoomTo(entities);
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          entity.polyline.width = 1.7;
          entity.polyline.material = material;
        }
    });
    viewer.dataSources.add(_dataSource);
};

//开始pimitive渲染
let primitives = null;
const onStartPimitive = async () => {
  const { res } = await getGeojson(jsonUrl);
  const { features } = res;
  const instance = [];
  if (features?.length) {
      features.forEach((item) => {
        const arr = item.geometry.coordinates;
        arr.forEach((el) => {
          let arr1 = [];
          el.forEach((_el) => {
            arr1 = arr1.concat(_el);
          });
          const polyline = new Cesium.PolylineGeometry({
              positions: Cesium.Cartesian3.fromDegreesArray(arr1),
              width: 1.7,
              vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
          });
          const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
          instance.push(
            new Cesium.GeometryInstance({
              geometry,
              // attributes: {
              //   color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED),
              // },
            })
          );
        });
      });
      console.log("-----instance-----", Cesium.Material.Spriteline1Source);
      let source = getRenderSource();
      const material = new Cesium.Material({
          fabric: {
            uniforms: {
              color: Cesium.Color.fromCssColorString("#7ffeff"),
              image: "/images/spriteline.png",
              speed: 10,
            },
            source,
          },
          translucent: function () {
            return true;
          },
      });
      const appearance = new Cesium.PolylineMaterialAppearance();
      appearance.material = material;
      const primitive = new Cesium.Primitive({
          geometryInstances: instance,
          appearance,
          asynchronous: false,
      });
      primitives = viewer.scene.primitives.add(primitive);
  }
};

//获取render渲染器
const getRenderSource = ()=>{
  let source = `czm_material czm_getMaterial(czm_materialInput materialInput)
          {
              czm_material material = czm_getDefaultMaterial(materialInput);
              vec2 st = materialInput.st;
              vec4 colorImage = texture(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
              material.alpha = colorImage.a * color.a;
              material.diffuse = colorImage.rgb * 1.5 ;
              return material;
          }`;
  return source ;
}

//清除上图的
const onClear = () => {
    // 此处注意不要使用removeAll，将实例都删除的话，再次添加会报错
    _dataSource && viewer.dataSources.remove(_dataSource, false);
    primitives && viewer.scene.primitives.remove(primitives);
};

onMounted(() => {
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
  modifyMap({ viewer });
});

onUnmounted(() => {
  onClear();
  // removeAddMap(viewer);
  // viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
  //   url: "http://data.marsgis.cn/terrain",
  // });
});
</script>

<style scoped lang="scss"></style>

<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="create">开始</button>
      <button class="common-btn" @click="onClear">清除</button>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, onMounted } from "vue";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

// 流动水面效果
const create = () => {
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(120.388, 36.071, 120.449, 36.118 ),
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            height: 100,
          }),
      }),
      appearance: new Cesium.EllipsoidSurfaceAppearance({
          material: new Cesium.Material({
              fabric: {
                type: "Water",
                uniforms: {
                  baseWaterColor: new Cesium.Color( 64 / 255.0, 157 / 255.0,253 / 255.0, 0.6 ),
                  normalMap: "/images/waterNormals.jpg",
                  frequency: 1000.0,
                  animationSpeed: 0.1,
                  amplitude: 10,
                  specularIntensity: 8,
                },
              },
          }),
      }),
    })
  );
};

const onClear = () => {
  viewer.scene.primitives.removeAll();
};


onUnmounted(() => {
  onClear();
});

</script>

<style scoped lang="scss"></style>

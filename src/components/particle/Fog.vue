<template>
  <div class="container">
    <div class="button-group">
      <button @click="start" class="common-btn">开始</button>
      <button @click="hide" class="common-btn">停止</button>
    </div>
  </div>
</template>
<script setup>
import { onUnmounted } from "vue"
import FogEffect from "@/utils/cesiumCtrl/particle/fog.js"
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore();
const instance = new FogEffect(viewerStore.viewer, {
    visibility: 0.2,
    color: new Cesium.Color(0.8, 0.8, 0.8, 0.3)
})

const hide = () => {
  instance.show(false)
}
const start = () => {
  instance.show(true)
}
onUnmounted(() => {
  instance.destroy()
})
</script>


<style lang="scss" scoped></style>
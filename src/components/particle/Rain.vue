<template>
  <div class="container">
    <div class="button-group">
      <button @click="start" class="common-btn">开始</button>
      <button @click="hide" class="common-btn">停止</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import RainEffect from "@/utils/cesiumCtrl/particle/rain.js";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const instance = new RainEffect(viewerStore.viewer, {
    tiltAngle: -0.2, //倾斜角度
    rainSize: 1.0, // 雨大小
    rainSpeed: 120.0 // 雨速
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
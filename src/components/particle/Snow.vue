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
import SnowEffect from "@/utils/cesiumCtrl/particle/snow.js"
import { ViewerStore } from "@/store";
const viewerStore = ViewerStore();
const snow = new SnowEffect(viewerStore.viewer, {
    snowSize: 0.02, // 雪花大小
    snowSpeed: 60.0, // 雪速
});
const hide = () => {
   snow.show(false) ;
}
const start = () => {
   snow.show(true);
}

onUnmounted(() => {
  snow.destroy()
})

</script>


<style lang="scss" scoped></style>
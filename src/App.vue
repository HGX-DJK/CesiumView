<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <sl-app-provider>
        <!--左侧菜单栏-->
        <sl-left-content class="left"></sl-left-content>
        <!--地图展示-->
        <sl-map class="map"></sl-map>
        <router-view class="router-content"></router-view>
    </sl-app-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { zhCN, dateZhCN } from 'naive-ui';
import { useRouter } from "vue-router";
import slAppProvider from "@/components/common/AppProvider.vue";
import slLeftContent from "@/views/LeftContent.vue";  //左侧数据
import slMap from "@/components/Map.vue";  //地图展示

let router = useRouter();
onMounted(() => {
    router.push("/");
});

</script>

<style scoped lang="scss">
.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 15rem;
  height: 100%;
  background-color: rgba(84, 92, 100, 1);
  color: $white;
}

.map {
  position: absolute;
  left: 15rem;
  top: 0;
  height: 100%;
  width: calc(100% - 15rem);
}

.router-content {
  position: absolute;
  left: 20rem;
  top: 2rem;
}

</style>

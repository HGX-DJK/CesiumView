<script setup>

import { ViewerStore } from "@/store";
import SkyBoxOnGround from "@/utils/cesiumCtrl/materialAnimate/skyBoxOnGround.js"

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;

// 内天空盒 
const groundSkyBox = new SkyBoxOnGround({
  sources: {
    positiveX: '/images/Standard-Cube-Map/px1.png',
    negativeX: '/images/Standard-Cube-Map/nx1.png',
    positiveY: '/images/Standard-Cube-Map/pz.png',
    negativeY: '/images/Standard-Cube-Map/nz1.png',
    positiveZ: '/images/Standard-Cube-Map/py.png',
    negativeZ: '/images/Standard-Cube-Map/ny1.png'
  }
})
groundSkyBox.setSkyBox(viewer);

</script>

<style scoped lang='scss'></style>
<template>
  <div class="container">
    <div class="button-group">
      <button class="common-btn" @click="setvisible('add')">添加可视域</button>
      <button class="common-btn" @click="setvisible('remove')">删除可视域</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ViewerStore } from "@/store";

const viewerStore = ViewerStore();
const viewer = viewerStore.viewer;
// 开关
function setvisible(value) {
    switch (value) {
      case 'add':
        addViewField();
        break;
      case 'remove':
        clearAllViewField();
        break;
    }
}
var arrViewField = [];
var viewModel = { verticalAngle: 90, horizontalAngle: 120, distance: 10 };
function addViewField() {
    var e = new Cesium.ViewShed3D(viewer, {
      horizontalAngle: Number(viewModel.horizontalAngle),
      verticalAngle: Number(viewModel.verticalAngle),
      distance: Number(viewModel.distance),
      calback: function () {
        viewModel.distance = e.distance
      }
    });
    arrViewField.push(e);
};

function clearAllViewField() {
  for (var e = 0, i = arrViewField.length; e < i; e++){
    arrViewField[e].destroy();
  };
  arrViewField = [];
};

//添加三位模型
async function set3Dtitle() {
  let translation = Cesium.Cartesian3.fromArray([0, 0, 0]);
  let m = Cesium.Matrix4.fromTranslation(translation);
  const url = 'http://data.marsgis.cn/3dtiles/qx-shequ/tileset.json';
  let tilesetJson = {
    modelMatrix: m,
    show: true,                     // 是否显示图块集(默认true)
    skipLevelOfDetail: true,        // --- 优化选项。确定是否应在遍历期间应用详细级别跳过(默认false)
    baseScreenSpaceError: 1024,     // --- When skipLevelOfDetailis true，在跳过详细级别之前必须达到的屏幕空间错误(默认1024)
    maximumScreenSpaceError: 32,    // 数值加大，能让最终成像变模糊---用于驱动细节细化级别的最大屏幕空间误差(默认16)原128
    skipScreenSpaceErrorFactor: 16, // --- 何时skipLevelOfDetail是true，定义要跳过的最小屏幕空间错误的乘数。与 一起使用skipLevels来确定要加载哪些图块(默认16)
    skipLevels: 1,                   // --- WhenskipLevelOfDetail是true一个常量，定义了加载图块时要跳过的最小级别数。为 0 时，不跳过任何级别。与 一起使用skipScreenSpaceErrorFactor来确定要加载哪些图块。(默认1)
    immediatelyLoadDesiredLevelOfDetail: false, // --- 当skipLevelOfDetail是时true，只会下载满足最大屏幕空间错误的图块。忽略跳过因素，只加载所需的图块(默认false)
    loadSiblings: false,            // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋 --- 何时确定在遍历期间skipLevelOfDetail是否true始终下载可见瓦片的兄弟姐妹(默认false)
    cullWithChildrenBounds: false,  // ---优化选项。是否使用子边界体积的并集来剔除瓦片（默认true）
    cullRequestsWhileMoving: false, // ---优化选项。不要请求由于相机移动而在返回时可能未使用的图块。这种优化只适用于静止的瓦片集(默认true)
    cullRequestsWhileMovingMultiplier: 10, // 值越小能够更快的剔除 ---优化选项。移动时用于剔除请求的乘数。较大的是更积极的剔除，较小的较不积极的剔除(默认60)原10
    preloadWhenHidden: true,                    // ---tileset.show时 预加载瓷砖false。加载图块，就好像图块集可见但不渲染它们(默认false)
    preloadFlightDestinations: true,            // ---优化选项。在相机飞行时在相机的飞行目的地预加载图块(默认true)
    preferLeaves: true,                         // ---优化选项。最好先装载叶子(默认false)
    maximumMemoryUsage: 2048,                   // 内存分配变小有利于倾斜摄影数据回收，提升性能体验---瓦片集可以使用的最大内存量（以 MB 为单位）(默认512)原512 4096
    progressiveResolutionHeightFraction: 0.5,   // 数值偏于0能够让初始加载变得模糊 --- 这有助于在继续加载全分辨率图块的同时快速放下图块层(默认0.3)
    dynamicScreenSpaceErrorDensity: 10,         // 数值加大，能让周边加载变快 --- 用于调整动态屏幕空间误差的密度，类似于雾密度(默认0.00278)
    dynamicScreenSpaceErrorFactor: 1,           // 不知道起了什么作用没，反正放着吧先 --- 用于增加计算的动态屏幕空间误差的因素(默认4.0)
    dynamicScreenSpaceErrorHeightFalloff: 0.25, // --- 密度开始下降的瓦片集高度的比率(默认0.25)
    foveatedScreenSpaceError: true,             // --- 优化选项。通过暂时提高屏幕边缘周围图块的屏幕空间错误，优先加载屏幕中心的图块。一旦Cesium3DTileset#foveatedConeSize加载确定的屏幕中心的所有图块，屏幕空间错误就会恢复正常。(默认true)
    foveatedConeSize: 0.1,                      // --- 优化选项。当Cesium3DTileset#foveatedScreenSpaceError为 true 时使用来控制决定延迟哪些图块的锥体大小。立即加载此圆锥内的瓷砖。圆锥外的瓷砖可能会根据它们在圆锥外的距离及其屏幕空间误差而延迟。这是由Cesium3DTileset#foveatedInterpolationCallback和控制的Cesium3DTileset#foveatedMinimumScreenSpaceErrorRelaxation。将此设置为 0.0 意味着圆锥将是由相机位置及其视图方向形成的线。将此设置为 1.0 意味着锥体包含相机的整个视野,禁用效果(默认0.1)
    foveatedMinimumScreenSpaceErrorRelaxation: 0.0, // --- 优化选项。当Cesium3DTileset#foveatedScreenSpaceError为 true 时使用以控制中央凹锥之外的图块的起始屏幕空间误差松弛。屏幕空间错误将从 tileset 值开始Cesium3DTileset#maximumScreenSpaceError根据提供的Cesium3DTileset#foveatedInterpolationCallback.(默认0.0)
    // foveatedTimeDelay: 0.2,              // ---优化选项。使用 whenCesium3DTileset#foveatedScreenSpaceError为 true 来控制在相机停止移动后延迟瓷砖开始加载之前等待的时间（以秒为单位）。此时间延迟可防止在相机移动时请求屏幕边缘周围的瓷砖。将此设置为 0.0 将立即请求任何给定视图中的所有图块。(默认0.2)
    luminanceAtZenith: 0.2,                 // --- 用于此模型的程序环境贴图的天顶处的太阳亮度（以千坎德拉每平方米为单位）(默认0.2)
    backFaceCulling: true,                  // --- 是否剔除背面几何体。当为 true 时，背面剔除由 glTF 材质的 doubleSided 属性确定；如果为 false，则禁用背面剔除(默认true)
    debugFreezeFrame: false,                // --- 仅用于调试。确定是否应仅使用最后一帧的图块进行渲染(默认false)
    debugColorizeTiles: false,              // --- 仅用于调试。如果为 true，则为每个图块分配随机颜色(默认false)
    debugWireframe: false,                  // --- 仅用于调试。如果为 true，则将每个图块的内容渲染为线框(默认false)
    debugShowBoundingVolume: false,         // --- 仅用于调试。如果为 true，则为每个图块渲染边界体积(默认false)
    debugShowContentBoundingVolume: false,  // --- 仅用于调试。如果为 true，则为每个图块的内容渲染边界体积(默认false)
    debugShowViewerRequestVolume: false,    // --- 仅用于调试。如果为 true，则呈现每个图块的查看器请求量(默认false)
    debugShowGeometricError: false,         // --- 仅用于调试。如果为 true，则绘制标签以指示每个图块的几何误差(默认false)
    debugShowRenderingStatistics: false,    // --- 仅用于调试。如果为 true，则绘制标签以指示每个图块的命令、点、三角形和特征的数量(默认false)
    debugShowMemoryUsage: false,            // --- 仅用于调试。如果为 true，则绘制标签以指示每个图块使用的纹理和几何内存（以兆字节为单位）(默认false)
    debugShowUrl: false,                    // --- 仅用于调试。如果为 true，则绘制标签以指示每个图块的 url(默认false)
    dynamicScreenSpaceError: true,          // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋 --- 优化选项。减少距离相机较远的图块的屏幕空间错误(默认false)
  };
  const tileset = await Cesium.Cesium3DTileset.fromUrl(url, tilesetJson);
  // 非异步加载
  viewer.scene.primitives.add(tileset);
  viewer.flyTo(tileset, {
    offset: {
      heading: Cesium.Math.toRadians(120.0),//方向
      pitch: Cesium.Math.toRadians(-10),//倾斜角度
      range: 450
    }
  });
};

const createScriptDom = () => {
  // 创建 <script> 元素
  const script = document.createElement("script");
  script.id = "fragment-shader";
  script.type = "notjs";
  script.text = `
      uniform float czzj;
      uniform float dis;
      uniform float spzj;
      uniform vec3 visibleColor;
      uniform vec3 disVisibleColor;
      uniform float mixNum;
      uniform sampler2D colorTexture;
      uniform sampler2D stcshadow; 
      uniform sampler2D depthTexture;
      uniform mat4 shadowMap_matrix; 
      uniform vec4 shadowMap_lightPositionEC; 
      uniform vec4 shadowMap_lightDirectionEC;
      uniform vec3 shadowMap_lightUp;
      uniform vec3 shadowMap_lightDir;
      uniform vec3 shadowMap_lightRight;
      uniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; 
      uniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; 
      in vec2 v_textureCoordinates;  // 使用in替换varying

      out vec4 fragColor; // 使用out替换gl_FragColor

      // 将toEye函数的返回值更改为vec4，保持正确的类型
      vec4 toEye(in vec2 uv, in float depth){
          vec2 xy = vec2((uv.x * 2.0 - 1.0), (uv.y * 2.0 - 1.0));
          vec4 posInCamera = czm_inverseProjection * vec4(xy, depth, 1.0);
          posInCamera /= posInCamera.w;
          return posInCamera;
      }

      float getDepth(in vec4 depth){
          float z_window = czm_unpackDepth(depth);
          return czm_reverseLogDepth(z_window);
      }

      float sampleShadowMap(sampler2D shadowMap, vec2 uv){
          return texture(shadowMap, uv).r;  // 使用texture替代texture2D
      }

      float shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth){
          return step(depth, sampleShadowMap(shadowMap, uv));
      }

      float shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters){
          float depthBias = shadowParameters.depthBias;
          float depth = shadowParameters.depth;
          float nDotL = shadowParameters.nDotL;
          float normalShadingSmooth = shadowParameters.normalShadingSmooth;
          float darkness = shadowParameters.darkness;
          vec2 uv = shadowParameters.texCoords;
          depth -= depthBias;
          vec2 texelStepSize = shadowParameters.texelStepSize;
          float radius = 1.0;

          float visibility = 
              (shadowDepthCompare(shadowMap, uv, depth) +
              shadowDepthCompare(shadowMap, uv + vec2(-texelStepSize.x, -texelStepSize.y), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(0.0, -texelStepSize.y), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(texelStepSize.x, -texelStepSize.y), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(-texelStepSize.x, 0.0), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(texelStepSize.x, 0.0), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(-texelStepSize.x, texelStepSize.y), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(0.0, texelStepSize.y), depth) +
              shadowDepthCompare(shadowMap, uv + vec2(texelStepSize.x, texelStepSize.y), depth)) * (1.0 / 9.0);

          return visibility;
      }

      vec3 projectPointOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){
          vec3 v01 = point - planeOrigin;
          float d = dot(planeNormal, v01);
          return (point - planeNormal * d);
      }

      float calculateDistance(vec3 pt){
          return sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z);
      }

      void main() { 
          const float PI = 3.141592653589793;
          vec4 color = texture(colorTexture, v_textureCoordinates);
          vec4 currDepth = texture(depthTexture, v_textureCoordinates);

          if(currDepth.r >= 1.0){
              fragColor = color;  // 使用fragColor替换gl_FragColor
              return;
          }
          
          float depth = getDepth(currDepth);
          vec4 positionEC = toEye(v_textureCoordinates, depth);
          vec3 normalEC = vec3(1.0);

          czm_shadowParameters shadowParameters; 
          shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy; 
          shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z; 
          shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w; 
          shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w; 
          shadowParameters.depthBias *= max(depth * 0.01, 1.0); 

          vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz); 
          float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); 

          vec4 shadowPosition = shadowMap_matrix * positionEC; 
          shadowPosition /= shadowPosition.w; 

          if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) { 
              fragColor = color;
              return;
          };
            
          vec4 lw = czm_inverseView * vec4(shadowMap_lightPositionEC.xyz, 1.0);
          vec4 vw = czm_inverseView * vec4(positionEC.xyz, 1.0);

          if(distance(lw.xyz, vw.xyz) > dis){
              fragColor = color;
              return;
          }

          vec3 ptOnSP = projectPointOnPlane(shadowMap_lightUp, lw.xyz, vw.xyz);
          directionEC = ptOnSP - lw.xyz;
          float degJJ = acos(dot(directionEC, shadowMap_lightDir) / (calculateDistance(directionEC) * calculateDistance(shadowMap_lightDir))) * (180.0 / PI);

          if(abs(degJJ) > spzj / 2.0){
              fragColor = color;
              return;
          }

          vec3 ptOnCZ = projectPointOnPlane(shadowMap_lightRight, lw.xyz, vw.xyz);
          vec3 dirOnCZ = ptOnCZ - lw.xyz;
          float degJJCZ = acos(dot(dirOnCZ, shadowMap_lightDir) / (calculateDistance(dirOnCZ) * calculateDistance(shadowMap_lightDir))) * (180.0 / PI);

          if(abs(degJJCZ) > czzj / 2.0){
              fragColor = color;
              return;
          }

          shadowParameters.texCoords = shadowPosition.xy; 
          shadowParameters.depth = shadowPosition.z; 
          shadowParameters.nDotL = nDotL; 
          float visibility = shadowVisibility(stcshadow, shadowParameters); 

          if(visibility == 1.0){
              fragColor = mix(color, vec4(visibleColor, 1.0), mixNum);
          } else {
              if(abs(shadowPosition.z - 0.0) < 0.01){
                  return;
              }
              fragColor = mix(color, vec4(disVisibleColor, 1.0), mixNum);
          }
      }
    `;
  // 将 <script> 标签添加到 DOM（可以是 document.body 或其他适当的父容器）
  document.body.appendChild(script);
}

onMounted(() => {
  viewer.scene.globe.depthTestAgainstTerrain = true;
  set3Dtitle();
  createScriptDom()
});

onUnmounted(() => {
  clearMaterial();
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
});

</script>

<style scoped lang="scss">
input {
  margin-left: 2rem;
  text-align: left;
}

input:focus {
  outline: none;
}

.input-check {
  position: relative;
  left: -7rem;
}
</style>

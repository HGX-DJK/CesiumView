import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { createRouterGuards } from "./router-guards"
const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/index",
  },

  {
    path: '/index',
    name: "Index",
    component: () => import("@/views/Index.vue")
  },
  //几何相关
  {
    path: '/entitiesFeature',
    name: "EntitiesFeature",
    component: () => import("@/components/geometry/EntitiesFeature.vue")
  },
  {
    path: '/drawGeometry',
    name: "DrawGeometry",
    component: () => import("@/components/geometry/DrawGeometry.vue")
  },
  {
    path: '/geometryMeaure',
    name: "GeometryMeaure",
    component: () => import("@/components/geometry/GeometryMeaure.vue")
  },
  {
    path: '/arrow',
    name: "Arrow",
    component: () => import("@/components/geometry/Arrow.vue")
  },
  //图形绘制
  {
    path: '/entity',
    name: "Entity",
    component: () => import("@/components/drawGraphic/Entity.vue")
  },
  {
    path: '/primitive',
    name: "Primitive",
    component: () => import("@/components/drawGraphic/Primitive.vue")
  },
  {
    path: '/primitiveCluster',
    name: "PrimitiveCluster",
    component: () => import("@/components/drawGraphic/PrimitiveCluster.vue")
  },
  {
    path: '/dataSource',
    name: "DataSource",
    component: () => import("@/components/drawGraphic/DataSource.vue")
  },
  //材质动画
  {
    path: '/highlightRoad',
    name: "HighlightRoad",
    component: () => import("@/components/materialAnimate/HighlightRoad.vue")
  },
  {
    path: '/throughRoad',
    name: "ThroughRoad",
    component: () => import("@/components/materialAnimate/ThroughRoad.vue")
  },
  {
    path: '/radiant',
    name: "Radiant",
    component: () => import("@/components/materialAnimate/Radiant.vue")
  },
  {
    path: '/diffuse',
    name: "Diffuse",
    component: () => import("@/components/materialAnimate/Diffuse.vue")
  },
  {
    path: '/radar',
    name: "Radar",
    component: () => import("@/components/materialAnimate/RadarScan.vue")
  },
  {
    path: '/colorLayer',
    name: "ColorLayer",
    component: () => import("@/components/materialAnimate/ColorLayer.vue")
  },
  {
    path: '/water',
    name: "Water",
    component: () => import("@/components/materialAnimate/Water.vue")
  },
  {
    path: '/skybox',
    name: "Skybox",
    component: () => import("@/components/materialAnimate/Skybox.vue")
  },
  //例子效果
  {
    path: '/rain',
    name: "Rain",
    component: () => import("@/components/particle/Rain.vue")
  },
  {
    path: '/snow',
    name: "Snow",
    component: () => import("@/components/particle/Snow.vue")
  },
  {
    path: '/fog',
    name: "Fog",
    component: () => import("@/components/particle/Fog.vue")
  },
  {
    path: '/fire',
    name: "Fire",
    component: () => import("@/components/particle/Fire.vue")
  },
  //服务加载
  {
    path: '/xyzRender',
    name: "XyzRender",
    component: () => import("@/components/renderService/xyz.vue")
  },
  {
    path: '/3dtilesRender',
    name: "3dtilesRender",
    component: () => import("@/components/renderService/3dtiles.vue")
  },
  //空间分析
  {
    path: '/waterFlood',
    name: "WaterFlood",
    component: () => import("@/components/analysis/WaterFlood.vue")
  },
  {
    path: '/skyline',
    name: "Skyline",
    component: () => import("@/components/analysis/SkyLine.vue")
  },
  {
    path: '/elevation',
    name: "Elevation",
    component: () => import("@/components/analysis/Elevation.vue")
  },
  {
    path: '/heatmap',
    name: "Heatmap",
    component: () => import("@/components/analysis/HeatMap.vue")
  },
  {
    path: '/visualArea',
    name: "visualArea",
    component: () => import("@/components/analysis/VisualArea.vue")
  },
  
  //其他地图
  {
    path: '/maptalks',
    name: "maptalks",
    component: () => import("@/components/otherMap/Maptalks.vue")
  },
  

]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: RootRoute,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router)
}
export default router

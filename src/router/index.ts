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
  /**
   * @description 几何相关
   */
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
  /**
   * @description 图形绘制
   */
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
  /**
   * @description 材质动画
   */
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
  /**
   * @description 粒子效果
   */
  {
    path: '/rain',
    name: "Rain",
    component: () => import("@/components/particle/Rain.vue")
  },
  {
    path: '/lightning',
    name: "Lightning",
    component: () => import("@/components/particle/Lightning.vue")
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
  /**
   * @description 服务加载
   */
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
  /**
   * @description 空间分析
   */
  {
    path: '/sunshineAnalysis',
    name: "SunshineAnalysis",
    component: () => import("@/components/analysis/SunshineAnalysis.vue")
  },
  {
    path: '/waterFlood',
    name: "WaterFlood",
    component: () => import("@/components/analysis/WaterFlood.vue")
  },
  {
    path: '/waterFlood1',
    name: "WaterFlood1",
    component: () => import("@/components/analysis/WaterFloodNew.vue")
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
  {
    path: '/excavateTerrain',
    name: "ExcavateTerrain",
    component: () => import("@/components/analysis/ExcavateTerrain.vue")
  },
  {
    path: '/bufferAnalysis',
    name: "BufferAnalysis",
    component: () => import("@/components/analysis/BufferAnalysis.vue")
  },

  /**
 * @description 多视图管理
 */
  {
    path: '/screenUnion',
    name: "ScreenUnion",
    component: () => import("@/components/multiViewManage/ScreenUnion.vue")
  },
   /**
   * @description 空间插值
   */
  {
    path: '/curveInterpolate',
    name: "CurveInterpolate",
    component: () => import("@/components/Interpolation/CurveInterpolate.vue")
   },

   /**
   * @description 气泡弹窗
   */
  {
    path: '/popup',
    name: "Popup",
    component: () => import("@/components/popups/Index.vue")
   },
  /**
   * @description 其他地图
   */
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

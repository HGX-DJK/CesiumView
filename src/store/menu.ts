import { defineStore } from "pinia";

/**
 * @desscription 菜单列表
 */
export const MenuStore = defineStore("menu", {
    state: () => {
        return {
            menuList: [
                {
                    name: "几何",
                    show: false,
                    children: [
                        {
                            name: "基本要素",
                            path: "entitiesFeature"
                        },
                        {
                            name: "绘制",
                            path: "/drawGeometry"
                        },
                        {
                            name: "量测",
                            path: "/geometryMeaure"
                        },
                        {
                            name: "态势图",
                            path: "/arrow",
                            newFlag:true
                        },
                    ]
                },
                {
                    name: "图形绘制",
                    show: false,
                    children: [
                        {
                            name: "实体",
                            path: "/entity"
                        },
                        {
                            name: "图元",
                            path: "/primitive"
                        },
                        {
                            name: "图元聚合",
                            path: "/primitiveCluster",
                            newFlag:true
                        },
                        {
                            name: "数据源",
                            path: "/dataSource"
                        }
                    ]
                },
                {
                    name: "材质动画",
                    show: false,
                    children: [
                        {
                            name: "道路闪烁",
                            path: "/highlightRoad",
                        },
                        {
                            name: "道路穿梭",
                            path: "/throughRoad",
                        },
                        {
                            name: "辐射圈",
                            path: "/radiant",
                        },
                        {
                            name: "圆扩散",
                            path: "/diffuse",
                        },
                        {
                            name: "雷达扫描",
                            path: "/radar",
                            newFlag:true
                        },
                        {
                            name: "四色图",
                            path: "/colorLayer",
                            newFlag:true
                        },
                        {
                            name: "流动水面",
                            path: "/water",
                        },
                        {
                            name: "天空盒",
                            path: "/skybox",
                        }
                    ]
                },
                {
                    name: "粒子效果",
                    show: false,
                    children: [
                        {
                            name: "下雨",
                            path: "/rain",
                        },
                        {
                            name: "闪电",
                            path: "/lightning",
                            newFlag:true
                        },
                        {
                            name: "下雪",
                            path: "/snow",
                        },
                        {
                            name: "大雾",
                            path: "/fog",
                        },
                        {
                            name: "火焰",
                            path: "/fire",
                        }
                    ]
                },
                {
                    name: "服务加载",
                    show: false,
                    children: [
                        {
                            name: "xyz瓦片",
                            path: "xyzRender"
                        },
                        {
                            name: "3DTiles",
                            path: "3dtilesRender"
                        }
                    ]
                },
             
                {
                    name: "空间分析",
                    show: false,
                    children: [
                        {
                            name: "日照分析",
                            path:"sunshineAnalysis",
                            newFlag:true
                        },
                        {
                            name: "淹没分析",
                            path:"waterFlood"
                        },
                        {
                            name: "淹没设置",
                            path:"waterFlood1",
                            newFlag:true
                        },
                        {
                            name: "天际线分析",
                             path:"skyline"
                        },
                        // {
                        //     name: "限高分析",
                        //     path:"elevation"
                        // }, 
                        {
                            name: "热力分析",
                            path:"heatmap"
                        },
                        {
                            name: "可视域分析",
                            path:"visualArea",
                            newFlag:true
                        },
                        {
                            name: "地形开挖",
                            path:"excavateTerrain"
                        },
                        {
                            name: "缓冲分析",
                            path:"bufferAnalysis"
                        }
                    ]
                },
                {
                    name: "多视图管理",
                    show: false,
                    children: [
                     
                        {
                            name: "双屏联动",
                            path:"screenUnion"
                        }
                    ]
                },
                {
                    name: "空间插值",
                    show: false,
                    children: [
                     
                        {
                            name: "曲线插值",
                            path:"curveInterpolate"
                        }
                    ]
                },
                {
                    name: "气泡弹窗",
                    show: false,
                    children: [
                     
                        {
                            name: "点位弹窗",
                            path:"popup"
                        }
                    ]
                },
                {
                    name: "其他地图",
                    show: false,
                    children: [
                     
                        {
                            name: "maptalks地图",
                            path:"maptalks"
                        }
                    ]
                },
            ]
        }
    },
    actions: {

    }
})


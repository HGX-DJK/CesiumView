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
                            name: "绘制",
                            path: "drawGeometry"
                        },
                        {
                            name: "量测",
                            path: "geometryMeaure"
                        },
                        {
                            name: "态势图",
                            path: "arrow"
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
                            path: "/primitiveCluster"
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
                            name: "四色图",
                            path: "/colorLayer",
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
                            name: "淹没分析",
                            path:"waterFlood"
                        },
                        {
                            name: "天际线分析",
                             path:"skyline"
                        },
                        {
                            name: "限高分析",
                            path:"elevation"
                        }, 
                        {
                            name: "热力图",
                            path:"heatmap"
                        },
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


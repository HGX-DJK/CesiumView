# CesiumDOM 相关的使用

## viewer.cesiumWidget.container

**viewer 的 cesiumWidget 属性是 Cesium 的地图和场景渲染的核心组件。它的 container 属性是一个 DOM 元素，用于包含 Cesium 渲染的内容** 

> 优点：通过 appendChild()，可以在 Cesium 的 3D 场景或地图界面中显示 Vue 组件的内容，便于在 Cesium 地图界面上放置 Vue 的动态 UI，如自定义弹窗、信息面板、图层控件等

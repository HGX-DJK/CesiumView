# CustomDataSource、Entity 和 Primitive 区别

在 Cesium 中，CustomDataSource、Entity 和 Primitive 是用于管理和渲染不同类型数据的三种机制，各自具有不同的功能和用途。它们的主要区别如下：

## 1. CustomDataSource

- **简介**：CustomDataSource 是一种数据源，可以包含多个 Entity 实例。主要用于动态加载和管理自定义数据，以便将其添加到 Cesium 的 DataSourceCollection 中。
- **用途**：用于批量管理和组织多个 Entity 对象。
- **特点**：
    - 可以批量管理 Entity，比如添加、删除、更新。
    - 通常用于需要动态更新的场景。
    - 可以轻松启用或禁用数据集群、更新显示模式等。

**示例：**

```javascript
const dataSource = new Cesium.CustomDataSource('myDataSource');
viewer.dataSources.add(dataSource);

const entity = dataSource.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  point: { pixelSize: 10, color: Cesium.Color.RED }
});

```

## 2. Entity

- **简介**：Entity 是一种高级的抽象类，用于封装和表示实际要显示的图形对象（如点、线、面等）。它为多种可视化对象提供了统一的接口。
- **用途**：用于描述单个数据对象（如一个建筑、一条线路）。
- **特点**：
   - 可以设置为动态的，比如路径、视锥体等。
   - 支持属性的动态绑定，适用于时间动态数据。
   - 提供高级接口，不需要处理底层渲染细节。
   - Entity 会在 EntityCollection 中进行管理，可以绑定到 CustomDataSource 中使用。

**示例：**

```javascript
const entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  point: { pixelSize: 10, color: Cesium.Color.BLUE }
});
```

## 3. Primitive

- **简介**：Primitive 是 Cesium 中的底层图形渲染机制，直接与 WebGL 对接，因此具有更高的性能和渲染控制。
- **用途**：用于精细控制渲染效果，特别是需要手动控制、优化渲染性能的情况下。
- **特点**：
  - 不支持动态更新（需手动移除再添加）。
  - 高性能，适合大量渲染或高性能需求的场景。
  - 由于其底层特性，使用较复杂且灵活性低。
  - 不能直接使用 Entity 提供的时间动态特性。

**示例：**

```javascript
const primitive = viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances: new Cesium.GeometryInstance({
    geometry: new Cesium.BoxGeometry({
      dimensions: new Cesium.Cartesian3(100000.0, 100000.0, 100000.0)
    }),
    modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)
    ),
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
    }
  }),
  appearance: new Cesium.PerInstanceColorAppearance()
}));

```

## 总结

|特性|CustomDataSource|Entity|Primitive|
|:------|:------:|:-------:|:------:|
|渲染性能|一般|中|高|
|数据管理|批量管理多个|Entity|单独描述一个对象|直接对底层对象操作|
|动态更新|支持|支持|不支持|
|场景适用|动态管理多个对象|单个对象需要多样显示效果|高性能需求、手动渲染控制|
|复杂度|较低|中|较高|

- CustomDataSource 用于批量管理 Entity，适合动态应用场景。
- Entity 是面向用户的高层次对象，适合描述单个动态图形。
- Primitive 用于高性能渲染需求，但缺少动态和易用性。
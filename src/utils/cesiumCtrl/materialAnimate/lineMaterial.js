
export default class LineFlickerMaterialProperty {
  constructor(options) {
      this._definitionChanged = new Cesium.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
  };

  get isConstant() {
      return false;
  }

  get definitionChanged() {
      return this._definitionChanged;
  }

  getType(time) {
      return Cesium.Material.LineFlickerMaterialType;
  }

  getValue(time, result) {
      if (!Cesium.defined(result)) {
          result = {};
      };
      //确保 result.color 始终具有一个有效的颜色值。它首先尝试根据时间动态获取颜色，如果无法获取，则退回到一个默认的红色
      result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
      result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 5.0, result.speed);
      return result
  }

  equals(other) {
      return (this === other || (other instanceof LineFlickerMaterialProperty &&
            Cesium.Property.equals(this._color, other._color) && Cesium.Property.equals(this._speed, other._speed))
      )
  }
};

//用于定义对象属性的方法
Object.defineProperties(LineFlickerMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed'),
});
//闪烁材质属性
Cesium.Material.LineFlickerMaterialProperty = 'LineFlickerMaterialProperty';
//闪烁材质类型
Cesium.Material.LineFlickerMaterialType = 'LineFlickerMaterialType';
//闪烁材质数据源
Cesium.Material.LineFlickerMaterialSource =
  `
    uniform vec4 color;
    uniform float speed;
    czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        float time = fract( czm_frameNumber  *  speed / 1000.0);
        vec2 st = materialInput.st;
        float scalar = smoothstep(0.0,1.0,time);
        material.diffuse = color.rgb * scalar;
        material.alpha = color.a * scalar ;
        return material;
    }
`
Cesium.Material._materialCache.addMaterial(Cesium.Material.LineFlickerMaterialType, {
    fabric: {
        type: Cesium.Material.LineFlickerMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 5.0,
        },
        source: Cesium.Material.LineFlickerMaterialSource
    },
    translucent: function(material) {
        return true;
    }
});

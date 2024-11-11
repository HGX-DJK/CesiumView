import { createApp, h } from "vue";
import Popup from "@/components/Dialog/Popup.vue";

export default class Dialog {
  constructor(opts) {
    const { viewer, position, ...rest } = opts;
    this.viewer = viewer;
    // 点位的空间位置信息
    this.position = position._value;
    const { vmInstance } = createDialog({
        ...rest, // 主要是弹窗内容
        closeEvent: this.windowClose.bind(this),
    });
    if (this.vmInstance) {
       this.windowClose.bind(this);
    } else {
       this.vmInstance = vmInstance;
    };
    // 将弹窗元素添加到渲染cesium的容器中
    viewer.cesiumWidget.container.appendChild(vmInstance.$el);
    this.addPostRender();
  };
  //添加场景事件
  addPostRender() {
    this.viewer.scene.postRender.addEventListener(this.postRender, this);
  };
  postRender() {
    if (!this.vmInstance.$el || !this.vmInstance.$el.style) return;
    // 画布高度
    const canvasHeight = this.viewer.scene.canvas.height;
    // 实例化屏幕坐标
    const windowPosition = new Cesium.Cartesian2();
    // 将WGS84 经纬度坐标转换成屏幕坐标，这通常用于将 HTML 元素放置在与场景中的对象相同的屏幕位置。
    Cesium.SceneTransforms.wgs84ToWindowCoordinates(
      this.viewer.scene,
      this.position,
      windowPosition
    );
    // 调整弹窗的位置
    this.vmInstance.$el.style.bottom = canvasHeight - windowPosition.y + 210 + "px";
    const elWidth = this.vmInstance.$el.offsetWidth;
    this.vmInstance.$el.style.left = windowPosition.x - elWidth / 2 + 150 + "px";

    const camerPosition = this.viewer.camera.position;
    let height = this.viewer.scene.globe.ellipsoid.cartesianToCartographic( camerPosition ).height;
    height += this.viewer.scene.globe.ellipsoid.maximumRadius;
    if (!(Cesium.Cartesian3.distance(camerPosition, this.position) > height) && 
    this.viewer.camera.positionCartographic.height < 50000000) {
      this.vmInstance.$el.style.display = "block";
    } else {
      this.vmInstance.$el.style.display = "none";
    }
  };


  //关闭弹窗
  windowClose() {
    if (this.vmInstance) {
      this.vmInstance.$el.remove();
    }
    this.viewer.scene.postRender.removeEventListener(this.postRender, this); //移除事件监听
  }
}

let parentNode = null;
/**
 * @description: 渲染弹窗组件并插入div中
 * @param {*} opts 弹窗内容
 * @return {*}
 */
const createDialog = (opts) => {
    if (parentNode) {
        document.body.removeChild(parentNode);
        parentNode = null;
    };
    /**
     * createApp 是 Vue 3 中用来创建应用实例的函数，
     * 通常用于启动一个新的 Vue 应用
    */
    /**
     * h 是一个辅助函数（也叫做虚拟节点创建器），用于描述要渲染的组件或元素。
     * 这里将 Popup 作为第一个参数，表示渲染 Popup 组件。
     * { ...opts } 作为第二个参数，传递 Popup 组件的属性。这些属性通过解构的形式传递，
     * 表示将 opts 对象中的所有属性都应用到 Popup 组件上。
    */
    const app = createApp({
        render() {
          return h(
            Popup, {  ...opts, },
            {
              title: () => opts.slotTitle,
              content: () => opts.slotContent,
            }
          );
        },
    });
    parentNode = document.createElement("div");
    // 将Popup组件挂载到父级div中，生成弹窗实例
    const instance = app.mount(parentNode);
    document.body.appendChild(parentNode);
    return {
        vmInstance: instance,
    };
};

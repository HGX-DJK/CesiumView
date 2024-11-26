
/**
 * @description 将请求参数拼接在请求地址上
 * @param url 请求字符串
 * @param data 请求参数
 * @returns 
 */
export function addParams(url: string, data: any): string {
    url += "?"
    for (var key in data) {
      // 当参数无值时，跳过
      if (data[key] || data[key] === 0 || data[key] === false) {
        url += `${key}=${data[key]}&`;
      }
    };
    return url.slice(0, -1);
};

/**
 * @description: 延迟函数
 * @param {*} time 单位：ms
 * @return {*}
 */
export const sleep = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

/**
 * @description: 获取相机位置
 * @param {*} viewer
 * @return {*}
 */
export const getCameraView = (viewer: any) => {
    viewer = viewer || window.viewer;
    if (!viewer) {
      console.error('缺少viewer对象');
      return;
    };
    var camera = viewer.camera;
    var position = camera.position;
    var heading = camera.heading;
    var pitch = camera.pitch;
    var roll = camera.roll;
    var lnglat = Cesium.Cartographic.fromCartesian(position);
    var cameraV = {
      "x": Cesium.Math.toDegrees(lnglat.longitude),
      "y": Cesium.Math.toDegrees(lnglat.latitude),
      "z": lnglat.height,
      "heading": Cesium.Math.toDegrees(heading),
      "pitch": Cesium.Math.toDegrees(pitch),
      "roll": Cesium.Math.toDegrees(roll)
    };
    return cameraV;
}




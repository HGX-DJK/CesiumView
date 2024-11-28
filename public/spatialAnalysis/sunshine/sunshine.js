class sunlight {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = config;
        this.analysis();
    }

    analysis() {
        var stopTime = null;
        var viewer = this.viewer;
        var config = this.config;

        var e = config.day;
        var t = new Date(e)
        var i = config.startTime;
        var a = config.stopTime;
        var r = new Date(new Date(t).setHours(Number(i)))
        var o = new Date(new Date(t).setHours(Number(a)));
        if (!config.play) {
            stopTime = viewer.clock.currentTime
            viewer.clock.shouldAnimate = false
        } else {
            viewer.scene.globe.enableLighting = true
            viewer.shadows = true
            viewer.clock.startTime = Cesium.JulianDate.fromDate(r)
            viewer.clock.stopTime = Cesium.JulianDate.fromDate(o)
            viewer.clock.clockRange = config.clockRange
            viewer.clock.clockStep = config.clockStep
            viewer.clock.multiplier = config.multiplier
            if (viewer.clock.shouldAnimate = true, stopTime) {
                viewer.clock.currentTime = stopTime;
            } else {
                viewer.clock.currentTime = Cesium.JulianDate.fromDate(r)
            }
        }
    }

}
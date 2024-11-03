
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupStore } from "@/store";
import { setupRouter } from "@/router";
import {setupNaive} from "@/utils";
/**loading提示效果 */
import slLoading   from "@/components/common/CustomLoading.vue";
import slDialog    from "@/components/common/Dialog.vue";
// 初始化app
function initApp(){
    let app = createApp(App);
    app.component("slLoading", slLoading);
    app.component("slDialog", slDialog);
    // 状态挂载
    setupStore(app);
    
    // 路由挂载
    setupRouter(app);
    
    // 挂载到 window
    window['$vue'] = app;
    
    // 注册naive-ui组件
    setupNaive(app);
    

    app.mount('#app', true);
}

// 调用app挂载
initApp();

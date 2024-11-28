import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 如果需要在测试中自动启动 Vite 服务器，可以在这里添加代码来启动它
      // 注意：你需要确保 Vite 服务器在运行时监听并准备好处理请求
    },
    baseUrl: "http://localhost:8088", // Vite 开发服务器的地址
    supportFile :false,
    defaultCommandTimeout: 10000, // 将默认超时时间设置为 10 秒
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});

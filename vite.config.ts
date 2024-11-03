import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import AutoImport from "unplugin-auto-import/vite";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  base: './',
  // 路径重定向
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
    ],
    dedupe: ['vue']
  },
  // 全局 css 注册
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/index.scss";`
      }
    }
  },
  plugins: [
    vue(),
    // 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    AutoImport({
      imports:[
        'vue',
        'vue-router',
        'pinia'
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
    }),
  ],
  build: {
    target: 'es2015',
    outDir: "build",
    minify: 'terser', // 如果需要用terser混淆，可打开这两行
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 2000
  },
  server: {
    port: 8088,
    open: false,
    cors: true,
    hmr:true,
    host:'0.0.0.0'
  },
  
})

/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import BuildTools from '@devtools/vite-plugin-buildtools'

const envDir = 'env'
// const { NODE_ENV } = process.env

// https://vite.dev/config/
export default ({ mode }) => {
  const { VITE_PORT, VITE_PROXY_DOMAIN } = loadEnv(mode, resolve(process.cwd(), envDir))
  process.env.BUILD_TOOLS_PROXY_TARGET = VITE_PROXY_DOMAIN
  return defineConfig({
    envDir,
    base: '/ai',
    // plugins: [vue(), vueDevTools()],
    plugins: [vue(), vueDevTools(), BuildTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: '/yzj-layout/home/',
      // open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      // proxy: VITE_PROXY_DOMAIN,
      proxy: {
        '/linkcenter': {
          target: VITE_PROXY_DOMAIN,
          changeOrigin: true,
        },
      },
    },
  })
}

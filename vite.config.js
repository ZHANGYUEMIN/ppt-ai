import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// dev：固定用根路径，避免本机误设 VITE_BASE_URL 导致地址难记、资源路径异常
// build：GitHub Actions 会设 VITE_BASE_URL；本地 build 未设时仍为 ./
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'serve' ? '/' : process.env.VITE_BASE_URL ?? './',
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
}))

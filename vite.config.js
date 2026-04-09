import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 本地 / 离线：不设环境变量时为 ./ 便于 file:// 打开
// GitHub Actions 会设置 VITE_BASE_URL（见 .github/workflows/deploy-pages.yml）
const base = process.env.VITE_BASE_URL ?? './'

export default defineConfig({
  plugins: [vue()],
  base,
})

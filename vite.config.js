import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/tt1/',
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.4.56.124:8081',
        // "target": `${import.meta.env.VITE_BACK_URL}`,
        // "pathRewrite": { '^/api': '' },
        changeOrigin: true,
        secure: false
      }
    },
    port: 80
  }
})


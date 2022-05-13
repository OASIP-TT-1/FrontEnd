import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/tt1/',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.4.56.124:8080',
  //       // "target": `${import.meta.env.VITE_BACK_URL}`,
  //       // "pathRewrite": { '^/api': '' },
  //       changeOrigin: true,
  //       // secure: false,
  //       rewrite: (path) => {
  //         console.log(path);
  //         return path.replace('/^\/api/', '')
  //       }
  //       // rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   },
  //   // port: 80
  // }
})


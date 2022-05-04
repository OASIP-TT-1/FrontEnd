import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  "server": {
    "proxy": {
        "/api": {
            "target": 'http://10.4.56.124:8081',
            // "target": 'http://localhost:8080',
            // "pathRewrite": { '^/api': '' },
            "changeOrigin": true,
            "secure": false
        },
        
    },
    port: 80,
}
})

// module.exports = {
//   "devServer": {
//       "proxy": {
//           "/api": {
//               "target": 'http://10.4.56.124:8081',
//               // "target": 'http://localhost:8080',
//               // "pathRewrite": { '^/api': '' },
//               "changeOrigin": true,
//               "secure": false
//           },
          
//       },
//       port: 80,
//   }
// };

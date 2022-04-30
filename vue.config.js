const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = {
    "devServer": {
        "proxy": {
            
            "/api": {
                "target": 'http://10.4.56.124:8081',
                // "pathRewrite": { '^/api': '' },
                "changeOrigin": true,
                "secure": false
            },
        },
        port: 80,
    }
};
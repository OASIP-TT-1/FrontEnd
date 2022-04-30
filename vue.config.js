const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = {
    "devServer": {
        "proxy": {
            "/api": {
                "target": 'http://172.17.0.3:8080',
                // "pathRewrite": { '^/api': '' },
                "changeOrigin": true,
                "secure": false
            },
        },
        port: 80,
    }
};
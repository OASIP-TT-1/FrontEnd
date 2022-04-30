import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
});

createApp(App).use(router).mount('#app')

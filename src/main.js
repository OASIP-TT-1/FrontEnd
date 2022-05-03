import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import ListallComponent from './components/listall_component.vue'

const app = createApp(App)
app.component('ListallComponent', ListallComponent)

app.use(router).mount('#app')

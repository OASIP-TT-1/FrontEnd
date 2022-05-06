import { createRouter, createWebHistory } from 'vue-router'
import ListAllEvent from '../views/ListAllEvent.vue'
import EventDetail from '../views/EventDetail.vue'
import AddEvent from '../views/AddEvent.vue'

const history = createWebHistory('/tt1/')
const routes = [
    { path: '/', name: 'ListAll', component: ListAllEvent },
    { path: '/events/:id', name: 'EventDetail', component: EventDetail },
    { path: '/events/add', name: 'AddEvent', component: AddEvent }
    // { path: '/important', name: 'Important', component: ImportantList },
    // { 
    //     path: '/:category', 
    //     name: 'EachCategory', 
    //     component: EachCategory
    // }
]

const router = createRouter({ history, routes })
export default router
import { createRouter, createWebHistory } from 'vue-router'
import ListAllEvent from '../views/ListAllEvent.vue'
import EventDetail from '../views/EventDetail.vue'
import AddEvent from '../views/AddEvent.vue'
import ListCategory from '../views/ListCategory.vue'
import ListByCategory from '../views/ListByCategory.vue'
import Home from '../views/Home.vue'
import Page from '../views/Paging.vue'

const history = createWebHistory('/tt1/')
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/events', name: 'ListAll', component: ListAllEvent },
    { path: '/events/:id', name: 'EventDetail', component: EventDetail },
    { path: '/events/add', name: 'AddEvent', component: AddEvent },
    { path: '/categories', name: 'Category', component: ListCategory },
    { path: '/categories/:id', name: 'ListByCategory', component: ListByCategory },
    { path: '/events/page/:page', name: 'Page', component: Page }
    // { path: '/important', name: 'Important', component: ImportantList },
    // { 
    //     path: '/:category', 
    //     name: 'EachCategory', 
    //     component: EachCategory
    // }
]

const router = createRouter({ history, routes })
export default router
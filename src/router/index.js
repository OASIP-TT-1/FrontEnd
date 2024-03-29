import { createRouter, createWebHistory } from 'vue-router'
import ListAllEvent from '../views/ListAllEvent.vue'
import EventDetail from '../views/EventDetail.vue'
import AddEvent from '../views/AddEvent.vue'
import ListCategory from '../views/ListCategory.vue'
import ListByCategory from '../views/ListByCategory.vue'
import Home from '../views/Home.vue'
import Page from '../views/Paging.vue'
import ListByDate from '../views/ListByDate.vue'
import AddSuccess from '../views/AddSuccess.vue'
import AboutUs from '../views/AboutUs.vue'

const history = createWebHistory('/tt1/')
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/events', name: 'ListAll', component: ListAllEvent },
    { path: '/events/:id', name: 'EventDetail', component: EventDetail },
    { path: '/events/add', name: 'AddEvent', component: AddEvent },
    { path: '/events/add/success', name: 'AddSuccess', component: AddSuccess },
    { path: '/categories', name: 'Category', component: ListCategory },
    { path: '/categories/:id', name: 'ListByCategory', component: ListByCategory },
    { path: '/date', name: 'ListByDate', component: ListByDate },
    { path: '/events/page/:page', name: 'Page', component: Page },
    { path: '/about-us', name: 'AboutUs', component: AboutUs }
    // { path: '/important', name: 'Important', component: ImportantList },
    // { 
    //     path: '/:category', 
    //     name: 'EachCategory', 
    //     component: EachCategory
    // }
]

const router = createRouter({ history, routes })
export default router
import {createRouter,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Appointment from '../views/Events/Appointment.vue'
import ShowEvent from '../views/Events/ShowEvent.vue'
import ShowCategory from '../views/Categories/ShowCategory.vue'
import AboutUs from '../views/AboutUs.vue'
import ShowUsers from '../views/Users/ShowUsers.vue'
import Register from '../views/Users/Register.vue'
import Login from '../views/Users/Login.vue'

const history=createWebHistory(import.meta.env.BASE_URL)
const routes = [{ 
        path : '/',
        name : 'Home',
        component: Home
    },
    {
        path : '/event/appointment',
        name : 'Appointment',
        component: Appointment
    },
    {
        path : '/events/:time',
        name : 'ShowEvent',
        component: ShowEvent
    },
    {
        path : '/category',
        name : 'ShowCategory',
        component: ShowCategory
    },
    {
        path : '/about-us',
        name : 'AboutUs',
        component: AboutUs
    },
    {
        path : '/users/:roles',
        name : 'ShowUsers',
        component : ShowUsers 
    },
    {
        path : '/users/register',
        name : 'SignUp',
        component : Register
    },
    {
        path : '/users/login',
        name : 'Login',
        component : Login
    }
]

const router = createRouter({history,routes})
export default router
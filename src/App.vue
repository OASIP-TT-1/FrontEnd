<script setup>
import { ref, onMounted, computed } from "vue";
import { getCategories } from './Fetch/fetch_category';

console.clear;
const isOpen = ref(false);
const isOpenRoles = ref(false);

const reloadPage = () => {
  window.location.reload();
};

const categories = ref([]);
// GET Category
onMounted(async () => {
  categories.value = await getCategories()
})

let eventSelect = ref(false)
const openSelectEvent = () => {
  eventSelect.value = !eventSelect.value
}

let mobileMenuOpen = ref(false)
const openMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const logout = () => {
  Swal.fire({
    title: 'Do you want to Logout',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Done'
  }).then(res => {
    if(res.isConfirmed){
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userDetail')
      reloadPage()
    }
  })
}

const isLogin = computed(() => {
  return localStorage.getItem('accessToken') !== null
})

const isAdmin = computed(() => {
  if(localStorage.getItem('accessToken') !== null){
    return JSON.parse(localStorage.getItem('userDetail')).role == 'admin'
  }
})

const isLecturer = computed(() =>{
  if(localStorage.getItem('accessToken') !== null){
    return JSON.parse(localStorage.getItem('userDetail')).role == 'lecturer'
  }
})

</script>

<template>
  <div>
  <nav class="px-2 mx-10 my-5 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="#" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
        <router-link :to="{ name: 'Home' }"><span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">OSAIP</span></router-link>
      </a>
      <button @click="openMobileMenu" data-collapse-toggle="mobile-menu" type="button"
        class="inline-flex items-center justify-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
        aria-controls="mobile-menu-2" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div :class="mobileMenuOpen ? '' : 'hidden'" class="w-full md:block md:w-auto" id="mobile-menu">
        <ul
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link :to="{ name: 'Home' }">
              <div
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page">Home</div>
            </router-link>
          </li>
          <li v-if="isLogin">
              <router-link :to="{ name: 'ShowEvent', params: { time: 'All' } }">
                  <div class="navSelect">Events</div>
              </router-link>
            </li>
          <li v-if="isLogin ">
            <router-link :to="{ name: 'ShowCategory' }">
              <div class="navSelect">Categories</div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AboutUs' }">
              <div class="navSelect">About</div>
            </router-link>
          </li>
          <li v-if="isAdmin">
            <router-link :to="{ name: 'ShowUsers', params: { roles: 'all' } }">
              <div class="navSelect">Users</div>
            </router-link>
          </li>
          <li v-if="!isLogin">
            <router-link :to="{ name: 'Login' }">
              <div class="navSelect">Login</div>
            </router-link>
          </li>
          <li v-else>
              <div class="navSelect" @click="logout">Logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>


  <aside :class="isOpen ? '' : 'hidden'" class="translate-x-20 rounded-xl">
    <!-- <div class="scrollBar"> -->
    <div class="flex flex-col">
      <p class="mt-3 ml-4 font-bold text-black">Clinic</p>
      <div v-for="(category, index) in categories" :key="index">
        <p class="mt-2 leading-4 text-black pl-7 hover:underline" @click="reloadPage">
          <router-link :to="{
            name: 'ShowEvent',
            params: { time: category.eventCategoryName },
          }">
            {{ category.eventCategoryName }}</router-link>
        </p>
      </div>
      <p class="menuHeading">Events</p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'ShowCategory' }">Event Categories</router-link>
      </p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'ShowEvent', params: { time: 'All' } }">All Events</router-link>
      </p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'ShowEvent', params: { time: 'Past' } }">Past Events</router-link>
      </p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'ShowEvent', params: { time: 'Upcoming' } }">Upcoming Events</router-link>
      </p>
      <p class="menuHeading">Users</p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'ShowUsers', params: { roles: 'all' } }">All Users</router-link>
      </p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'SignUp' }">Add User</router-link>
      </p>
      <p class="menuFilter" @click="reloadPage">
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </p>
      <p class="menuFilter" @click="isOpenRoles = !isOpenRoles">
        Roles
      </p>
      <p :class="isOpenRoles ? '' : 'hidden'" class="menuFilter">
        <router-link :to="{ name: 'ShowUsers', params: { roles: 'student' } }">Student</router-link>
      </p>
      <p :class="isOpenRoles ? '' : 'hidden'" class="menuFilter">
        <router-link :to="{ name: 'ShowUsers', params: { roles: 'lecturer' } }">Lecturer</router-link>
      </p>
      <p :class="isOpenRoles ? '' : 'hidden'" class="menuFilter">
        <router-link :to="{ name: 'ShowUsers', params: { roles: 'admin' } }">Admin</router-link>
      </p>
      <p class="menuHeading">
        <router-link :to="{ name: 'AboutUs' }"> About </router-link>
      </p>
    </div>
  </aside>
  <div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</div>
</template>

<style scoped>
.scrollBar {
  overflow-y: scroll;
  height: 80vh;
  display: block;
}

aside {
  background-color: #d6d9da;
  position: fixed;
  height: 90%;
  bottom: 0;
  right: 0;
  width: 70%;
  z-index: 1;
}

.fixedtop {
  position: fixed;
  margin-left: auto;
}

.logo {
  margin-left: 1.75%;
  margin-bottom: 1%;
  width: 6%;
  display: inline;
}

/* #clinicMenu{
  margin-left: 1%;
}

form::-webkit-scrollbar .gradient, form:valid .gradient{
    background: #07051a;
    color: white;
} */
/* .eachCategory {
  padding: 0.5%;
  margin-left: 1%;
  color: white;
  font-weight: bold;
  border-radius: 2%;
}
.eachCategory:hover{
  background-color: #d9f4a4;
  color: #50403f;
} */

#router {
  margin-top: 10%;
  text-align: center;
  padding: 0.5%;
  height: max-content;
  float: right;
  margin-right: 10%;
  font-weight: bold;
  color: #50403f;
}



/* 
.filterTime {
  margin: 8%;  
  background-color: #d9f4a4;
  color: #50403f;
  padding: 5%;
  padding-left: 7%; 
  padding-right: 7%;
  border-radius: 10%;
}
.filterTime:hover {
  width: 100px;
  background-color: white;
  color: #50403f;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
} */
/* .img {
  margin-left: 5%;
  width: 13%;
  display: inline;
  float: right;
}
.img:hover {
  width: 15%;
  margin-top: 0%;
  transition-property: width;
  transition-duration: 0.3s;         
  transition-timing-function: ease-in-out;
}

select {
  margin-left: 10%;
  margin-top: 5%;
  width: 45%;
  display: inline;
}

form{
    margin-top: 0.5%;
    margin-left: 70%;
    left: 2%;
    transform: translate(0%,-100%);
    transition: all 1s;
    width: 50px;
    height: 50px;
    background: white;
    box-sizing: border-box;
    border-radius: 25px;
    border: 4px solid white;
    padding-left: 5px;
    float: right;
}

input{
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;
    line-height: 30px;
    outline: 0;
    border: 0;
    display: none;
    font-size: 1em;
    border-radius: 20px;
    padding: 0 20px;
}

.fa{
    box-sizing: border-box;
    padding: 10px;
    width: 42.5px;
    height: 42.5px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    color: #07051a;
    text-align: center;
    font-size: 1.2em;
    transition: all 1s;
}

form:hover, form:valid{
    width: 280px;
    cursor: pointer;
}

form:hover input, form:valid input{
    display: block;
}

form:hover .fa, form:valid .fa{
    background: #07051a;
    color: white;
} */
</style>

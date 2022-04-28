<script setup>
// import ListAllEvent from './components/ListAllEvent.vue'

// const events = ref([])
// const getEvents = async () => {
//   const res = await fetch('http://localhost:80/api/events')
//   if (res.status === 200) {
//     events.value = await res.json()
//     console.log(events.value)
//   } else console.log('error, cannot get data')
// }
// onBeforeMount(async () => {
//   await getEvents()
//   console.log(typeof events.value[0].eventStartTime)
// })
</script>

<template>
  <div id="gameWindow">
    <div class="">
      <nav class="navbar navbar-expand-lg">
        <div id="logo">
          <img src="./assets/images/background/logo.png" width="50%" />
        </div>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav"></div>
        </div>
      </nav>
    </div>

    <div class="flex flex-row ">
      <div id="box" class="">
        <div>
          <div class="">
            <div id="addhome" class="">
              <button
                type="button"
                class="btn btn-info"
                style="opacity: 1; color: white"
              >
                Add Event
              </button>
            </div>
            <div id="option">
              <a>You can create your event here</a>
              <p>คุณสามารถสร้างอีเวนต์ที่นี้ได้</p>
              <br />
              <br />
              <p class="" style="font-size: 10px; color: #7c7c7c">
                List by Category -
              </p>
              <p>FrontEnd Clinic</p>
              <p>BackEnd Clinic</p>
              <p>DevOps-Infra Category</p>
              <p>Project Management Clinic</p>
            </div>
            <router-link :to="{ name: 'ListAll'}">
            <div id="allevents">
               <button
                type="button"
                class="btn btn-primary"
                style="opacity: 1; color: white"
              >
                All Events 
              </button>
            </div>
            </router-link>
          </div>
        </div>
      </div>

      <div id="listallevent" class=" basis-1/2 mt-6 ml-5">
        <div>
        <router-view> 

        </router-view>
      </div>
        <!-- <ListAllEvent></ListAllEvent> -->
        
        <!-- <div id="viewall">

        <div id="no-events" v-show="events.length == 0">

          <h1 style="color: #5c5c5c">No Scheduled Events</h1>
        </div>

        <div id="have-events" v-show="events.length > 0">
          <h1 style="color: #5c5c5c">Have Scheduled Events</h1>
        </div>

      </div> -->
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mitr&display=swap');

#gameWindow {
  font-family: 'Mitr';
  font-size: 16px;
  color: white;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: bottom;
  background-attachment: fixed;
}

html,
body {
  background: url(./assets/images/background/background.jpg);
}
#logo {
  margin-top: -10px;
}
#box {
  width: 300px;
  height: 550px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  margin-left: 20px;
  margin-top: 25px;
  font-size: 15px;
}

.navbar-nav {
  margin-left: -10em;
  margin-top: 150em;
  margin-top: -1em;
  padding: 30px;
  color: black;
}
.navbar {
  background-color: #383838;
}
.selectcategory {
  margin-top: 25px;
}
#addhome {
  color: #383838;
}
#option {
  color: #383838;
}
#allevents{
  margin-top: -240px;
}
</style>

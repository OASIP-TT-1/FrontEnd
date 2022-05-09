<script setup>
import { ref } from 'vue'
defineEmits(['deleteEvent'])
const props = defineProps({
  events: {
    type: Array,
    require: true
  }
})
// console.log(props.events.value)

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatDate = (dateTime) => {
  return dateTime.toLocaleString('en-US', {day: '2-digit', month: 'long', year: 'numeric'})
  // return `${dateTime.getDate()}  ${
  //   monthNames[dateTime.getMonth()]
  // }  ${dateTime.getFullYear()}`
}

const formatTime = (dateTime) => {
  return dateTime.toLocaleString('th-TH', {hour: '2-digit', minute: '2-digit', })
  // return `${dateTime.getHours()}:${dateTime.getMinutes()} min.`
}
</script>
 
<template>
<div class="ml-36">
    <div id="no-events" v-show="events.length == 0">
      <h1 class="mx-60 pt-60">No Scheduled Events</h1>
    </div>

    <div>
      <div id="have-events" v-show="events.length > 0">
        <!-- <h1 style="color: #5c5c5c">Have Scheduled Events</h1> -->
        
        <div
          id="showall"
          v-for="(event, index) in events"
          :key="index"
          class="rounded-md p-4 my-3 w-96 color mr-2"
        >
          <div id="detailevents" class="">
            <p class="text-xl font-bold">{{ event.bookingName }}</p>
            <p>{{ event.eventCategoryName }}</p>
            <p class="font-semibold">Appointment Date / Time</p>
            <div >
              <p>Date : {{ formatDate(event.eventStartTime) }}</p> 
              <p>Time : {{ formatTime(event.eventStartTime) }} min.</p>
            </div>
            <div id="duration" class="rounded-full w-44 h-9 p-1">
              <p class="ml-3">Duration : {{ event.eventDuration }} min</p>
            </div>

            <router-link :to="{ name: 'EventDetail', params: {id: event.id} }" >
              <button
                class="border-2 border-gray-500 mt-3 p-2 rounded-lg text-xs text-gray-500 hover:bg-gray-500 hover:text-white"
              >
                see more >
              </button>
            </router-link>
            <div id="bin" @click="$emit('deleteEvent', event.id)">
                <img src="../assets/images/trash.png">
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <!-- <router-view :key="$route.fullPath"> </router-view> -->
    
  </div>
</template>
 
<style>
#no-events {
  background-color: rgba(255, 255, 255, 0.4);
  color: #5c5c5c;
  width: 900px;
  height: 550px;
}

#have-events {
  display: grid;
  grid-template-columns: auto auto auto;
}
#showall {
  background-color: rgba(255, 255, 255, 0.4);
}
#showall:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
#detailevents {
  color: #383838;
}
#duration {
  background-color: #eee385;
}
#bin{
  width: 25px;
  margin-left: 310px;
  margin-top: -30px;
}
</style>
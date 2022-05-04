<script setup>
import { ref, onBeforeMount } from 'vue'
import ListallComponent from '../components/listall_component.vue'

const events = ref([])
const getEvents = async () => {
  // const res = await fetch('http://localhost:8080/api/events')
  const res = await fetch('http://10.4.56.124:8081/api/events')
  if (res.status === 200) {
    events.value = await res.json()
    for (let event of events.value) {
      // event.eventStartTime = new Date(event.eventStartTime)
      console.log(event.eventStartTime)
      
      // console.log(event.eventStartTime)
      // console.log(event.eventStartTime.getDate())
    }
    console.log(events.value)
  
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getEvents()
  console.log(events)
})

const deleteEvent = async (eventId) => {
  let confirms = confirm('Do you want to delete?')
  console.log(eventId)
  console.log(confirms)
  if(confirms){
  // const res = await fetch(`http://localhost:8080/api/events/${eventId}`, {
  //   method: 'DELETE'
  // })
  const res = await fetch(`http://10.4.56.124:8081/api/events/${eventId}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    events.value =  events.value.filter((event) =>  event.id !== eventId)
    console.log('deleted successfully')
  } else console.log('error, cannot delete data')}
}
</script>

<template>
  <!-- <div>
    <div id="no-events" v-show="events.length == 0">
      <h1 class="mx-60 pt-60">No Scheduled Events</h1>
    </div>

    <div>
      <div id="have-events" v-show="events.length > 0">        
        <div
          id="showall"
          v-for="(event, index) in events"
          :key="index"
          class="rounded-md p-4 my-3 w-96 color mr-2"
        >
          <div id="detailevents" class="">
            <p class="text-xl font-bold">{{ event.bookingName }}</p>
            <p>{{ event.eventCategoryName }}</p>
            <p class="font-semibold">Appointment Date</p>
            <p>Date : {{ event.eventStartTime.slice(0, 11) }}</p> 
            <p>Time : {{ event.eventStartTime.slice(14) }} min.</p>
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
            <div id="bin" @click="deleteEvent(event.id)">
                <img src="../assets/images/trash.png">
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    
  </div> -->
  <ListallComponent :events="events" @deleteEvent="deleteEvent" ></ListallComponent>
  <!-- <div></div> -->
</template>


<style scoped>

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

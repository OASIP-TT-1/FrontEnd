<script setup>
import { ref, onBeforeMount } from 'vue'

const events = ref([])
const getEvents = async () => {
  const res = await fetch('http://10.4.56.124:8081/api/events')
  if (res.status === 200) {
    events.value = await res.json()
    for (let event of events.value) {
      event.eventStartTime = new Date(event.eventStartTime).toLocaleString('th-TH')
      console.log(event.eventStartTime)
    }
    console.log(events.value)
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getEvents()
  // console.log(typeof events.value[0].eventStartTime)

  // console.log(Date.parse(events.value[0].eventStartTime))
})
</script>

<template>
  <div>
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
            <p class="font-semibold">Appointment Date</p>
            <p>Date : {{ event.eventStartTime.slice(0, 9) }}</p>
            <p>Time : {{ event.eventStartTime.slice(10) }}</p>
            <!-- {{ Date}} -->
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
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <!-- <router-view :key="$route.fullPath"> </router-view> -->
    
  </div>
</template>

<style scoped>
#viewall {
  /* position: absolute; */
  /* width: 1115px;
  height: 550px;
  padding: 60px;
  background-color: white;
  opacity: 0.5;
  margin-left: 400px;
  margin-top: -550px;
  color: black; */
}
#no-events {
  background-color: rgba(255, 255, 255, 0.4);
  color: #5c5c5c;
  width: 900px;
  height: 550px;

  /* position: fixed; */
  /* margin-left: 400px;
  margin-top: 150px; */
}

#have-events {
  /* margin-top: -567px;
  margin-left: 260px;
   */

  display: grid;
  grid-template-columns: auto auto auto;
  /* grid-column-gap: 5px; */
}
#showall {
  background-color: rgba(255, 255, 255, 0.4);
  /* background-color: white;
  opacity: 0.4; */
}
#detailevents {
  color: #383838;
}
#duration {
  background-color: #eee385;
}
</style>

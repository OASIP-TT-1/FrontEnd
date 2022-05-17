<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import ListallComponent from '../components/ListallComponent.vue'

const events = ref([])
const filterEvents = ref([])

const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`)
  if (res.status === 200) {
    events.value = await res.json()
    filterEvents.value = events.value
    for (let event of events.value) {
      event.eventStartTime = new Date(event.eventStartTime)
      // const dd = new Date(event.eventStartTime)
      console.log(event.eventStartTime)
    }
    console.log(filterEvents.value)
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
  if (confirms) {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/events/${eventId}`,
      {
        method: 'DELETE'
      }
    )
    if (res.status === 200) {
      events.value = events.value.filter((event) => event.id !== eventId)
      console.log('deleted successfully')
    } else console.log('error, cannot delete data')
  }
}

const optionSelected = ref('')
const dateSelected = ref('')

const formatDate = (dateTime) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return new Date(dateTime, options)
}

const search = () => {
  console.log(optionSelected.value)
  // console.log(dateSelected.value)
  // console.log(events.value)
  // console.log(filterEvents.value)
  const currentDateTime = new Date()
  console.log(currentDateTime)
  if (optionSelected.value == 'past') {
    filterEvents.value = events.value.filter(
      (item) => item.eventStartTime < currentDateTime
    )
  } else if (optionSelected.value == 'upcomming') {
    filterEvents.value = events.value.filter(
      (item) => item.eventStartTime > currentDateTime
    )
  } else {
      dateSelected.value = new Date(dateSelected.value)
      filterEvents.value = events.value.filter((item) => {
          return dateSelected.value.getYear() == item.eventStartTime.getYear() &&
                 dateSelected.value.getMonth() == item.eventStartTime.getMonth() &&
                 dateSelected.value.getDate() == item.eventStartTime.getDate()
      })

  }
}

const cancel = () => {
  optionSelected.value = ''
  filterEvents.value = events.value
  console.log(filterEvents.value)
}
</script>

<template>
  <div class="pl-32">
    <div id="searchBar" class="flex flex-row mb-3">
      <div id="searchdate" class="basis-5/6">
        <a> Search by date : </a>
        <select
          v-model="optionSelected"
          class="border-2 border-gray-200 rounded-md p-1 text text-black w-56"
        >
          <option value="" disabled>Select your filter</option>
          <option value="past">Past Event</option>
          <option value="upcomming">Upcomming Event</option>
          <option value="day">Choose by day</option>
        </select>
        <input
          type="date"
          class="border-2 border-gray-200 rounded-md p-1 text ml-4 text-black"
          v-if="optionSelected == 'day'"
          v-model="dateSelected"
        />
      </div>

      <div class="" id="buttonsearch">
        <button class="bg-green-700 p-2 px-3 rounded-md" @click="search">
          search
        </button>
        <button class="bg-red-700 p-2 px-3 ml-3 rounded-md" @click="cancel">
          cancle
        </button>
      </div>
    </div>
    <div>
      <ListallComponent
        :events="filterEvents"
        @deleteEvent="deleteEvent"

      ></ListallComponent>
    </div>
  </div>
</template>

<style>

#searchdate {
  /* margin-left: 150px; */
}

#searchBar {
  width: 170vh;
}

</style>

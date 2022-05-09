<script setup>
import { useRoute } from 'vue-router'
import { ref, onBeforeMount, onBeforeUpdate, onUpdated } from 'vue'
import EventDetailComponent from '../components/EventDetailComponent.vue'
let { params } = useRoute()

// const eventId = params.id
const eventId = params.id
const event = ref({})
const getEventById = async (eventId) => {
  // const res = await fetch('http://localhost:8080/api/events/' + eventId)
  // const res = await fetch('http://10.4.56.124:8081/api/events/' + eventId)
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/${eventId}`)
  if (res.status === 200) {
    event.value = await res.json()
    event.value.eventStartTime = new Date(event.value.eventStartTime)
    console.log(event.value.eventStartTime.toLocaleString('en-GB'))
    // console.log(event.value.eventStartTime.toLocaleString('en-US', {day: '2-digit', year: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', }));
    console.log(event.value)
  } else console.log('error, cannot get data')
}

onBeforeMount(async () => {  
  
  await getEventById(eventId)
})


</script>

<template>

  <div class="ml-40">
    <EventDetailComponent :event="event" @rescheduleEvent="rescheduleEvent"></EventDetailComponent>
  </div>
</template>

<style>

</style>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import ListByCategory from './../components/ListByCateComponent.vue'
let { params } = useRoute()

const id = ref(Number(params.id))
const category = ref('')

switch (id.value) {
  case 1:
    category.value = 'Project Management Clinic'
    break;
  case 2:
    category.value = 'DevOps/Infra Clinic'
    break;
  case 3:
    category.value = 'Database Clinic'
    break;
  case 4:
    category.value = 'Client-side Clinic'
    break;
  case 5:
    category.value = 'Server-side Clinic'
    break;
}

const events = ref([])
const getEvents = async () => {
  // const res = await fetch('http://localhost:8080/api/events')
  // const res = await fetch('http://10.4.56.124:8081/api/events')
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`)
  if (res.status === 200) {
    events.value = await res.json()
    for (let event of events.value) {
      event.eventStartTime = new Date(event.eventStartTime)
      console.log(event.eventStartTime)
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
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/${eventId}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    events.value =  events.value.filter((event) =>  event.id !== eventId)
    console.log('deleted successfully')
  } else console.log('error, cannot delete data')}
}



</script>
 
<template>
    <ListByCategory :category="category" :events="events" @deleteEvent="deleteEvent"></ListByCategory>

</template>
 
<style>

</style>
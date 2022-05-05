<script setup>
import { ref, onBeforeMount } from 'vue'
import ListallComponent from '../components/ListallComponent.vue'

const events = ref([])
const getEvents = async () => {
  // const res = await fetch('http://localhost:8080/api/events')
  const res = await fetch('http://10.4.56.124:8081/api/events')
  // const res = await fetch(`${process.env.VITE_BACK_URL}/api/events`)
  if (res.status === 200) {
    events.value = await res.json()
    for (let event of events.value) {
      event.eventStartTime = new Date(event.eventStartTime)
      // const dd = new Date(event.eventStartTime)
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
  <div>
    <ListallComponent :events="events" @deleteEvent="deleteEvent" ></ListallComponent>
  </div>

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

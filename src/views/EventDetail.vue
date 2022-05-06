<script setup>
import { useRoute , useRouter} from 'vue-router'
import { ref, onBeforeMount } from 'vue'
let { params } = useRoute()

const eventId = params.id
const event = ref({})
const getEventById = async () => {
  // const res = await fetch('http://localhost:8080/api/events/' + eventId)
  // const res = await fetch('http://10.4.56.124:8081/api/events/' + eventId)
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/${eventId}`)
  if (res.status === 200) {
    event.value = await res.json()
    event.value.eventStartTime = new Date(event.value.eventStartTime)
    console.log(event.value.eventStartTime)
    console.log(event.value)
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getEventById()
})

const appRouter = useRouter()
const goBack = () => appRouter.go(-1)

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatDate = (dateTime) => {
  return `${dateTime.getDate()}  ${monthNames[dateTime.getMonth()]}  ${dateTime.getFullYear()}`
}

const formatTime = (dateTime) => {
  return `${dateTime.getHours()}:${dateTime.getMinutes()} min.`
}

</script>

<template>

  <div>
    <div id="back">
      <button type="button" class="btn btn-default btn-xs" @click="goBack">&lt; back</button>
    </div>
    <div id="showdetail" class="flex flex-row">
      <div class="basis-2/5 text-center p-4 border-r-4 border-zinc-300">
        <img
          src="../assets/images/user.png"
          alt="user"
          width="140"
          class="mx-auto"
        />
        <br>
        <h3>{{ event.bookingName }}</h3>
        <p>{{ event.bookingEmail }}</p>
        <h5 class="ml-3 text-sm">{{ event.eventCategoryName }}</h5>
      </div>
      <div class="basis-1/2 p-10">
        <p class="font-semibold">Appointment Date</p>
        <div >
          <p>Date : {{ formatDate(event.eventStartTime) }}</p> 
          <p>Time : {{ formatTime(event.eventStartTime) }}</p>
        </div>
        <!-- {{ Date}} -->
        <div id="duration" class="rounded-full w-40 h-8">
          <p class="ml-3 text-sm">Duration : {{ event.eventDuration }} min</p>
        </div>
        <br>
    
        <p class="font-semibold">Note :</p> 
        
        <p v-if="event.eventNote != null">{{ event.eventNote }}</p>
        <p v-else>no note</p>
      </div>
      
    </div>
  </div>
</template>

<style>
#showdetail {
  background-color: rgba(255, 255, 255, 0.4);
  color: #383838;
  width: 1175px;
  padding: 20px;
  /* height: px; */
}

#duration {
  background-color: #eee385;
  padding: 3.5px;
}

</style>

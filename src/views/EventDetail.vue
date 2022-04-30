<script setup>
import { useRoute , useRouter} from 'vue-router'
import { ref, onBeforeMount } from 'vue'
let { params } = useRoute()

const eventId = params.id
const event = ref({})
const getEventById = async () => {
  const res = await fetch('http://10.4.56.124:81/api/events/' + eventId)
  if (res.status === 200) {
    event.value = await res.json()
    event.value.eventStartTime = new Date(
      event.value.eventStartTime
    ).toLocaleString('th-TH')
    console.log(event.value)
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getEventById()
})

const appRouter = useRouter()
const goBack = () => appRouter.go(-1)

</script>

<template>
  <!-- <h1>test</h1>
    <p>The id is {{ this.$route.params.id }}</p> -->
  <!-- {{ event }} -->
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
        <p>Date : {{ event.eventStartTime.slice(0, 9) }}</p>
        <p>Time : {{ event.eventStartTime.slice(10) }}</p>
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

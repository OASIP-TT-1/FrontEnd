<script setup>
import { ref , computed } from 'vue'
import { useRouter } from 'vue-router'
import Reschedule from '../components/Reschedule.vue'

// defineEmits(['rescheduleEvent'])
const props = defineProps({
  event: {
    type: Object,
    require: true
  }
})

const event = computed(() => props.event)
const isEditMode = ref(false)

const appRouter = useRouter()
const goBack = () => appRouter.go(-1)

const newStartTime = ref('')
const newNote = ref(event.value.eventNote)
const isBlank = ref(false)
// const updateData = computed(() => { return {eventStartTime: newStartTime, eventNote: newNote}})

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const formatDate = (dateTime) => {
  return dateTime.toLocaleString('en-US', {day: '2-digit', month: 'long', year: 'numeric'})
}

const formatTime = (dateTime) => {
  return dateTime.toLocaleString('th-Th', {hour: '2-digit', minute: '2-digit', })
}

const confirm = () => {
  if(newStartTime.value == ''){
    isBlank.value = true
  }else {
    console.log(typeof newStartTime.value)
    const date = new Date(newStartTime.value)
    const updateStartTime = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ]
    const updateNote = newNote.value
    console.log(updateStartTime)
    console.log(updateNote)
    console.log(event.value.id)

    event.value.eventStartTime = date
    event.value.eventNote = newNote.value
  
    rescheduleEvent(updateStartTime, updateNote, event.value.id)
  }
  
  
}

const rescheduleEvent = async (updateStartTime, updateNote, eventId) => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/reschedule/${eventId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      eventStartTime: updateStartTime,
      eventNote: updateNote
    })
  })
  if (res.status === 200) {
    console.log('edited successfully')
    cancel()
  } else console.log('error, cannot be added')
  
}

const cancel = () => {
  newStartTime.value = ''
  newNote.value = event.value.eventNote
  isEditMode.value = false
}
const editMode = () => isEditMode.value = true

</script>

<template>
  <div id="back">
    <button type="button" class="btn btn-default btn-xs" @click="goBack">
      &lt; back
    </button>
  </div>
  <div id="showdetail" class="flex flex-row">
    <div class="basis-2/5 text-center p-4 border-r-4 border-zinc-300">
      <img
        src="../assets/images/user2.png"
        alt="user"
        width="180"
        class="mx-auto"
      />
      <br />
      <h3>{{ event.bookingName }}</h3>
      <p>{{ event.bookingEmail }}</p>
      <h5 class="ml-3 text-sm">{{ event.eventCategoryName }}</h5>
    </div>

    <div class="basis-1/2 p-10" v-if="!isEditMode">
      <p class="font-semibold">Appointment Date / Time</p>
      <div>
        <p>Date : {{ formatDate(event.eventStartTime) }}</p>
        <p>Time : {{ formatTime(event.eventStartTime) }} min</p>
      </div>
      <div id="duration" class="rounded-full w-40 h-8">
        <p class="ml-3 text-sm">Duration : {{ event.eventDuration }} min</p>
      </div>
      <br />

      <p class="font-semibold">Note :</p>

      <p v-if="event.eventNote != null">{{ event.eventNote }}</p>
      <p v-else>no note</p>

      <button
        id="reschedule"
        class="bg-red-600 rounded-lg p-2 px-3 hover:bg-red-700"
        @click="editMode"
      >
        Reschedule
      </button>
    </div>

    <!-- edit mode -->
    <!-- <Reschedule :event="event" v-if="isEditMode"></Reschedule> -->
    <div class="basis-1/2 p-10" v-if="isEditMode">
    <p class="text-red-600" v-if="isBlank">Please select date and time or click cancel</p>
      <div class="mb-4">
        Appointment Date / Time <span class="text-red-600 text-xl">*</span><br />
        <input
          id="date"
          type="datetime-local"
          v-model="newStartTime"
          class="border-2 border-gray-200 rounded-md p-1 px-2 mt-1"
        />
      </div>

      <div class="mb-16">
        Add Note : <span class="text-sm">(No more than 100 characters / ไม่เกิน 100 ตัวอักษร)</span>
        <input
          class="form-control"
          type="text"
          id="bookingname"
          maxlength="100"
          v-model="newNote"
        />
      </div>
      
      <div id="button" class="">
        <button class="bg-green-600 rounded-lg p-2 px-3 hover:bg-green-700 mr-2" @click="confirm">
          Confirm
        </button>
        <button class="bg-red-600 rounded-lg p-2 px-3 hover:bg-red-700" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
   
  </div>
</template>

<style scoped>
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

#reschedule {
  margin-left: 95%;
  color: white;
}

#button {
    padding-left: 85%;
    width: 125%;
    color: white;
}
</style>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';

const categories = ref([])
const getCategory = async () => {
  // const res = await fetch('http://localhost:8080/api/events')
  const res = await fetch('http://10.4.56.124:8081/api/categories')
  if (res.status === 200) {
    categories.value = await res.json()
    console.log(categories.value)
  
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getCategory()
  console.log(categories)
})

const bookingName = ref('')
const bookingEmail = ref('')
const eventCategory = ref('')
const eventStartTime = ref('')
const note = ref('')

const addEvent = () => {
  console.log("add")
  const date = new Date(eventStartTime.value)
  const newEvent = {
    bookingName: bookingName.value,
    bookingEmail: bookingEmail.value,
    eventCategory: eventCategory.value,
    eventStartTime: [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ],
    eventDuration: eventCategory.value.eventDuration,
    note: note.value
  }
  console.log(newEvent)
   addEventToDB(newEvent)
  console.log('เพิ่ม DB เรียบร้อย')
  goAllEvent()
  
}

const addEventToDB = async (newEvent) => {
  console.log(newEvent)
  const res = await fetch('http://10.4.56.124:8081/api/events', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newEvent)
  })
  console.log(res.status)
  if (res.status === 200) {
    // const addedNote = await res.json()
    // notes.value.push(addedNote)
    console.log('added sucessfully')
  } else console.log('error, cannot be added')
}

const appRouter = useRouter()
const goAllEvent = () => appRouter.push({name: 'ListAll'})

</script>
 
<template>
<div>
  <div id="add" class="border-4">
    <div>
      Booking Name : <input class="form-control" type="text" v-model="bookingName" /> 
      Booking Email : <input class="form-control" type="text" v-model="bookingEmail" />
    </div>
    <div class="selectcategory">
      <select v-model="eventCategory">
        <option value="" disabled>Please Select Clinic Category</option>
        <option v-for="category in categories" :key="category.id" :value="category">{{ category.eventCategoryName}}</option>
        
        <!-- <option value="Dev-Ops Infra">Dev-Ops Infra</option>
        <option value="Database">Database</option>
        <option value="Front-End">Front-End</option>
        <option value="Back-End">Back-End</option> -->

        
      </select>
      &emsp; &emsp; &emsp;
      <input id="date" type="datetime-local" v-model="eventStartTime" />
    </div>
    <br />
    <br />
    Add Note : (No more than 100 characters / ไม่เกิน 100 ตัวอักษร)
    <input
      class="form-control"
      type="text"
      id="bookingname"
      maxlength="100"
      v-model="note"
    />
  </div>

  <div id="click">
      <button
        type="button"
        class="btn btn-dark"
        style="opacity: 1; color: white"
        @click="addEvent"
      >
        ADD NEW EVENT
      </button>
      &ensp;
      <button
        type="button"
        class="btn btn-danger"
        style="opacity: 1; color: white"
        @click="goAllEvent"
      >
        CANCEL
      </button>
    </div>
  </div>
</template>
 
<style>
#add {
  position: fixed;
  width: 1115px;
  height: 550px;
  padding: 60px;
  background-color: rgb(255, 255, 255, 0.5);  
  color: black;
}
.selectcategory {
  margin-top: 25px;
}


#click{
  position: absolute;
  margin-left: 65px;
  margin-top: 475px;
}
</style>
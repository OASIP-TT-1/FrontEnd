<script setup>
import { ref, onBeforeMount, computed } from 'vue'
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
const eventDuration = computed(() => {
  if(eventCategory.value == '') {
    return 0
  }else {
    return eventCategory.value.eventDuration
  }
})
const note = ref('')

let isBlank = ref(false)
const changeDuration = () => {

} 

const addEvent = () => {
  if(bookingName.value == ''|| bookingEmail.value == '' || eventCategory.value == '' || eventStartTime.value == '' ) {
    console.log('เข้า if')
    isBlank.value = true
    console.log(isBlank.value)
  } else {
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

  }
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
    console.log('added sucessfully')
    goAllEvent()
  } else console.log('error, cannot be added')
}



const appRouter = useRouter()
const goAllEvent = () => appRouter.push({name: 'ListAll'})

</script>
 
<template>
<div>
  <div id="add" class="">
    <div class="error pb-2" v-if="isBlank">
      Please fill out the information completely. | กรุณากรอกข้อมูลให้ครบด้วยค่ะ
    </div>
    
    <div>
      Booking Name <span class="error">*</span> <input class="form-control mb-3" type="text" v-model="bookingName" />
      Booking Email <span class="error">*</span> <input class="form-control" type="text" v-model="bookingEmail" />
    </div>
    <div class="selectcategory">
      <select v-model="eventCategory" class="border-2 border-gray-200 rounded-md p-1">
        <option value="" disabled>Please Select Clinic Category</option>
        <option v-for="category in categories" :key="category.id" :value="category">{{ category.eventCategoryName}}</option>
      </select> <span class="error">*</span>
      &emsp; &emsp;
      Duration <span class="border-2 border-gray-200 rounded-md p-1 px-2 bg-gray-100"> {{ eventDuration }} </span>
      <br> <br>
      Appointment Date&Time <span class="error">*</span> <br>
      <input id="date" type="datetime-local" v-model="eventStartTime" class="border-2 border-gray-200 rounded-md p-1 px-2 mt-1" />
    </div>
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
  padding: 30px 40px;
  background-color: rgb(255, 255, 255, 0.5);  
  color: black;
}
.selectcategory {
  margin-top: 25px;
}


#click{
  position: absolute;
  margin-left: 60px;
  margin-top: 470px;
}

.error{
  color: red;
}

</style>
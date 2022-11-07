<script setup>
import { ref, computed, onBeforeMount } from "vue";
import 'boxicons'
import { getFileName , downloadFile } from '../../Fetch/fetch_file.js'
const props = defineProps({
  event: {
    type: Object,
    require: true,
  },
});

const fileName = ref("")
const fileUrl = ref("")
onBeforeMount(async () => {
  fileName.value = (await getFileName(props.event.id))[0];
  fileUrl.value = await downloadFile(props.event.id, fileName.value);
  console.log(fileUrl.value);
})

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// extract Date from eventStartTime
const extractDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

// extract Time from eventStartTime
const extractTime = (time) => {
  const t = new Date(time)
  const minute = computed(() => {
    console.log(t.getMinutes());
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`
}

</script>

<template>
  <main class="my-8">
    <div class="col-auto scroll-px-0 detail-container lg:-ml-300px md:ml-52 sm:m-24 ">
      <div
        class="{`col-12 group overflow-auto h-4/6 top-36 bottom-auto scr rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}">
        <div class="max-w-md rounded-lg shadow-2xl col-12 max-h-content bg-gradient-to-r from-gray-300 to-slate-50">
          <button @click="$emit('closeMe')" id="closeDetail" class="items-center justify-end h-8 col-1">
            <img src="../../assets/close.png" />
          </button>

          <img class="object-cover object-center w-full h-20 col-12"
            src="https://www.jeban.com/uploads/2020/11/800/520953_2543e40c73.webp" alt="avatar" />

          <div class="flex items-center px-6 py-1.5 bg-gray-900 col-12">
            <h1 class="mx-3 text-base font-semibold text-white col-9">
              {{ event.eventCategoryId.eventCategoryName }}
            </h1>
            <span
              class="basis-1/3 items-end px-0.5 py-0.5 text-xl text-center bg-purple-300 rounded-md col-1.5 sm:basis-1/3 text-soft-brown heading ">
              {{ event.eventDuration }} min
            </span>
          </div>

          <div class="px-12 pt-3 pb-10 col-12">
            <div class="text-center col-12">
              <h1 class="text-xl font-bold text-gray-800 col-12">
                {{ event.bookingName }}
              </h1>
              <p class="py-1 text-lg font-semibold text-gray-700 col-12">
                {{ event.eventCategoryId.eventCategoryName }}
              </p>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/date.png" class="img col-2" />
              <span class="col-9">
                Date : {{ extractDate(event.eventStartTime) }}
              </span>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/time.png" class="img col-2" />
              <span class="col-9">
                Time : {{ extractTime(event.eventStartTime) }}
              </span>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/email.png" class="img col-2" />
              <span class="col-12">Email : {{ event.bookingEmail }}</span>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/notes.png" class="img col-2" /> Note :
              <span class="text-gray-700 col-9">
                <span class="w-full mx-1">
                  <span class="inline-flex"> {{ event.eventNote }}</span></span>
              </span>
            </div>

            <div class="mt-4 text-gray-700 col-12" v-if="fileName != undefined">
              Attachment File
              <div class="p-3 px-4 border-2 border-stone-400 rounded-md">
                <div class="grid grid-cols-6 gap-4 content-center "> 
                  <span class="col-span-5 self-center text-sm">{{ fileName }}</span>
                  <a :href="fileUrl" :download="fileName"><box-icon name='cloud-download' size='md' border='circle' animation='tada-hover' class="" ></box-icon></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.heading {
  font-weight: bold;
  font-size: 80%;
}

#detail-container {
  margin-left: 30%;
}

#closeDetail {
  width: 5%;
  margin-right: 3%;
  float: right;
  display: inline;
}

.img {
  width: 7%;
  height: 4%;
  margin-right: 2%;
  display: inline;
}

.detail-container {
  position: absolute;
  /* left: 30%; */
}
</style>

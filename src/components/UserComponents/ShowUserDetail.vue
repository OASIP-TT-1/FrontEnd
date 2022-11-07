<script setup>
import { ref,computed } from "vue";
const props = defineProps({
  user: {
    type: Object,
    require: true,
  },
});

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
  const d = new Date(date + " UTC")
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

// extract Time from eventStartTime
const extractTime = (time) => {
  const t = new Date(time + " UTC")
  const minute = computed(() => {
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`
}

</script>

<template>
  <main class="my-8">
    <div class="px-6 col-12 detail-container">
      <div class="{`col-12 group overflow-auto h-5/6 top-24 bottom-auto scr rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}">
        <div class="max-w-lg rounded-lg shadow-2xl col-12 max-h-content bg-gradient-to-r from-zinc-100 to-white">
          <button @click="$emit('closeMe')" id="closeDetail" class="items-center justify-end h-12 col-1">
            <img src="../../assets/close.png" />
          </button>

          <img class="object-cover object-center w-full h-40 " src="../../assets/profile.jpg" alt="avatar"/>

          <div class="flex items-center px-6 py-3 bg-gray-900 col-12">
            <h1 class="mx-3 text-lg font-semibold text-white col-9">
            </h1>
            <span class="items-end px-1 py-1 text-xl text-center bg-purple-300 rounded-md col-2 text-soft-brown heading">
              {{ user.role }}
            </span>
          </div>

          <div class="px-12 pt-5 pb-10 col-12">
            <div class="text-center col-12">
              <h1 class="text-2xl font-semibold text-gray-800 col-12">
                {{ user.name }}
              </h1>
              <p class="py-2 text-lg text-gray-700 col-12">
                {{ user.email }}
              </p>
            </div>

            <div class="rounded-lg time">
              <div class="my-3 text-center text-gray-700">
                <p>Register date : {{ extractDate(user.createdOn) }} {{ extractTime(user.createdOn) }}</p>
              </div>

              <div class="my-3 text-center text-gray-700">
                <p>Latest account update :  {{ extractDate(user.updatedOn) }}  {{ extractTime(user.updatedOn) }}</p>
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
  width: 100%;
}

#closeDetail {
  width: 5%;
  margin-right: 3%;
  float: right;
  display: inline;
}

.img {
  width: 7%;
  height: 7%;
  margin-right: 2%;
  display: inline;
}

.detail-container {
  position: absolute;
  left: 30%;
}

.profile {
  margin-top: -20%;
}

.time {
  border: 1px solid gray;
  font-size: smaller;
  margin-top: 3%;
}
</style>

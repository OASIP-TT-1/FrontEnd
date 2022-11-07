<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { getCategories } from "../../Fetch/fetch_category.js";
import { getEvents } from "../../Fetch/fetch_event.js";
import { getPastEvents } from "../../Fetch/fetch_event.js";
import { getUpcomingEvents } from "../../Fetch/fetch_event.js";
import { getEventsByDate } from "../../Fetch/fetch_event.js";
import { deleteEvent } from "../../Fetch/fetch_event.js";
import { getFileName} from "../../Fetch/fetch_file.js";
import EachEventDetail from "../../components/EventComponents/EachEventDetail.vue";
import EditEvent from "../../components/EventComponents/EditEvent.vue";
import { useRoute } from "vue-router";

let { params } = useRoute();
const filterEvent = ref([]);
const allEvents = ref([]);
const categories = ref([]);
const param = ref();

onBeforeMount(async () => {
  param.value = params.time;
  categories.value = await getCategories();
  allEvents.value = await getEvents();

  extractCategory();
  console.log(currentCategory.value);
  return chooseTime();
});

const currentCategory = ref([]);
const extractCategory = () => {
  currentCategory.value = categories.value.filter((category) => {
    return category.eventCategoryName == param.value;
  });
};

const chooseTime = async () => {
  if (param.value == "All") {
    filterEvent.value = allEvents.value;
  } else if (param.value == currentCategory.value[0].eventCategoryName) {
    filterByCategory(allEvents);
  }
};

const filterByCategory = (events) => {
  filterEvent.value = events.value.filter((event) => {
      return (
        event.eventCategoryId.id ==
        currentCategory.value[0].id
      );
  });
}

const filterAll = () => {
  dateFilter.value = ""
  chooseTime();
};

const filterPast = async () => {
  dateFilter.value = ""
  filterEvent.value = await getPastEvents();
  if(param.value != "All") {
    filterByCategory(filterEvent);
  }
};

const filterUpcoming = async () => {
  dateFilter.value = ""
  filterEvent.value = await getUpcomingEvents();
  if(param.value != "All") {
    filterByCategory(filterEvent);
  }
};

const dateFilter = ref("");
const filterByDate = async () => {
  const date = new Date(dateFilter.value)
  const dateFormat = String(date.getFullYear()) + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0')
  console.log(dateFormat);
  filterEvent.value = await getEventsByDate(dateFormat);
  if(param.value != "All") {
    filterByCategory(filterEvent);
  }
};

defineEmits(["showDetail", "editEvent", "deleteEvent"]);
const isShow = ref(0);
const isShowEdit = ref(0);
const detailCurrentEvent = ref({});
const showDetail = (event) => {
  detailCurrentEvent.value = event;
  isShow.value = 1;
};
const closeShowDetail = () => {
  isShow.value = 0;
  isShowEdit.value = 0;
};
const fileName = ref("")
const showEditForm = async (event) => {
  fileName.value = (await getFileName(event.id))[0];
  detailCurrentEvent.value = event;
  isShowEdit.value = 1;
};
const closeEditForm = () => {
  isShowEdit.value = 0;
  window.location.reload();
  console.log(isShowEdit.value);
};

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

const extractDate = (date) => {
  const d = new Date(date);
  return d;
};

const extractTime = (time) => {
  const t = new Date(time);
  const minute = computed(() => {
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`;
};

// DELETE Event
const removeEvent = async (event) => {
  await deleteEvent(event)
};

const isLecturer = JSON.parse(localStorage.getItem("userDetail")).role == "lecturer";
</script>
<template>
  <main class="mx-10 -mt-4">
    <h2 class="mt-3 mb-5 text-4xl font-bold text-center text-black">
      {{ $route.params.time }} Events
    </h2>
    <!-- filter navbar -->
    <div class="flex items-center justify-between mb-3 ml-6">
      <div
        class="relative flex px-4 text-center bg-gray-100 shadow-lg col-3 rounded-2xl"
        v-if="params.time != 'Past' && params.time != 'Upcoming'"
      >
        <div class="flex-1 group">
          <a
            class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500"
          >
            <span class="block py-3 text-lg">
              <button @click="filterAll" class="active">All</button>
              <span
                class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"
              ></span>
            </span>
          </a>
        </div>
        <div class="flex-1 group">
          <a
            class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500"
          >
            <span class="block py-3 text-lg">
              <button @click="filterPast" class="active">Past</button>
              <span
                class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"
              ></span>
            </span>
          </a>
        </div>
        <div class="flex-1 group">
          <a
            class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500"
          >
            <span class="block py-3 text-lg">
              <button @click="filterUpcoming" class="active">Upcoming</button>
              <span
                class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"
              ></span>
            </span>
          </a>
        </div>
      </div>

      <!-- filter date -->
      <div class="justify-end block col-3">
        <input
          type="date"
          class="py-2 pl-2 rounded-lg hover:bg-blue-200"
          v-model="dateFilter"
        />
        <button
          class="p-2 ml-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700"
          @click="filterByDate"
        >
          filterDate
        </button>
      </div>
    </div>

    <div v-if="filterEvent.length !== 0">
      <div class="grid gap-6 m-6 lg:grid-cols-3 md:grid-cols-2">
        <div v-for="(event, index) in filterEvent" :key="index">
          <div
            class="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-110"
          >
            <div class="flex">
              <div
                class="w-4/12 lg:w-18 md:w-18 bg-gradient-to-r from-indigo-400 to-indigo-300"
              >
                <p class="pt-6 text-3xl font-semibold text-center text-white">
                  {{ extractDate(event.eventStartTime).getDate() }}
                </p>
                <p class="text-lg text-center text-white">
                  {{ monthNames[extractDate(event.eventStartTime).getMonth()] }}
                </p>
                <p class="text-base text-center text-white">
                  {{ extractDate(event.eventStartTime).getFullYear() }}
                </p>
              </div>
              <div class="m-3">
                <div
                  class="text-lg font-semibold tracking-wide text-indigo-500 uppercase"
                >
                  {{ event.bookingName }}
                </div>
                <div
                  class="block mt-1 text-base font-medium leading-tight text-black"
                >
                  {{ event.eventCategoryId.eventCategoryName }}
                </div>
                <p class="mt-1 text-slate-500">
                  Start Time : {{ extractTime(event.eventStartTime) }}
                </p>

                <div class="mt-1 text-slate-500">
                  {{ event.eventDuration }} min
                </div>
                <span
                  id="allButton "
                  class="flex ml-32 -mt-6 xl:ml-40 lg:ml-20 md:ml-36 sm:ml-44"
                >
                  <img
                    @click="showDetail(event)"
                    src="../../assets/detail.png"
                    class="cursor-pointer img-button col-1"
                  />
                  <img
                    v-if="!isLecturer"
                    @click="showEditForm(event)"
                    src="../../assets/edit.png"
                    class="cursor-pointer img-button col-1"
                  />
                  <img
                    v-if="!isLecturer"
                    @click="removeEvent(event)"
                    src="../../assets/trash-bin.png"
                    class="cursor-pointer img-button col-1"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No event -->
    <div v-else>
      <span
        class="flex flex-col items-center px-4 py-20 mt-4 space-y-2 text-xl font-semibold text-center bg-orange-500 rounded-md cursor-pointer group"
        >ไม่มีรายการนัดหมาย</span
      >
      <span>
        <router-link :to="{ name: 'Appointment' }">
          <div
            class="flex flex-col items-center px-4 py-10 space-y-2 text-center rounded-md cursor-pointer bg-gray-900/50 hover:bg-amber-500 hover:smooth-hover"
          >
            <a
              class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
            <p
              class="text-center text-white/50 group-hover:text-gray-900 group-hover:smooth-hover"
            >
              Booking Appointment
            </p>
          </div>
        </router-link>
      </span>
    </div>
    
    <EachEventDetail
      v-if="isShow == 1"
      @closeMe="closeShowDetail"
      :event="detailCurrentEvent"
    />
    <EditEvent
      v-if="isShowEdit == 1"
      @closeEditEvent="closeEditForm"
      :events="filterEvent"
      :event="detailCurrentEvent"
      :fileName="fileName"
      :showEditForm="isShowEdit"
    />
    <div>
      <router-view></router-view>
    </div>
  </main>
</template>
<style scoped>
.detail {
  margin-left: 5%;
  font-size: 100%;
  line-height: 37px;
}

.heading {
  font-weight: bold;
  margin-left: 1%;
}

#eventContainer {
  margin-left: 27%;
  width: 70%;
  height: 100%;
  border-radius: 25px;
}

#allDetail {
  margin-bottom: 7%;
}

#eachEventList {
  background-color: rgb(255 255 255 / 0.9);
  padding: 30px;
  border-radius: 12px;
  height: 100%;
}

#eachEventList:hover {
  width: 90%;
  background-color: rgb(255, 202, 67);
  transition-property: width;
  /* กำหนดให้ "width" เป็น property ที่จะใช้ transition */
  transition-duration: 0.3s;
  /* กำหนดให้ transition กินระยะเวลา 1 วินาที */
  transition-timing-function: ease-in-out;
  /* กำหนดให้รูปแบบของ speed เป็นแบบ "ease" */
}

#eventDuration {
  box-shadow: 5px 5px lightblue;
  float: right;
  margin-right: 5%;
  padding: 2px;
  background-color: #a19ed6;
  text-align: center;
  border-radius: 12px;
  font-size: 90%;
}

#allButton {
  text-align: right;
}

.img-button {
  width: 30px;
  height: 30px;
  display: inline;
}

.img-button:hover {
  width: 20%;
  display: inline;
}

.notHaveEvent {
  background-color: #e9f6cf;
  font-size: 24px;
  margin-left: 5%;
  margin-top: 3%;
  text-align: center;
  padding: 3%;
  border-radius: 30px;
}

.scrollBar {
  overflow-y: scroll;
  height: 70vh;
  margin-right: 5%;
}

.scrollBar {
  overflow-y: scroll;
  height: 70vh;
}

.img {
  width: 7%;
  display: inline;
}

.active:focus {
  background-color: #c1bfe6;
  border-radius: 3px;
  width: fit-content;
}

</style>
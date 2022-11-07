<script setup>
import { ref, onBeforeMount, computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { getCategories } from "../../Fetch/fetch_category.js";
import { addNewEvent } from "../../Fetch/fetch_event.js";

// Import all Vue FilePond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { EMPTY_ARR, EMPTY_OBJ } from "@vue/shared";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

const appRouter = useRouter();
const goBack = () => appRouter.go(-1);

const bookingName = ref("");
const bookingEmail = ref("");
const eventCategoryId = ref("");
const eventDuration = computed(() => {
  if (eventCategoryId.value == "") {
    return 0;
  } else {
    return categories.value.filter(
      category => category.id == eventCategoryId.value
    )[0].eventDuration;
  }
});
const eventStartTime = ref("");
const eventNote = ref("");
let file = ref("");

const categories = ref([]);
const isLogin = localStorage.getItem("accessToken") != null;
onBeforeMount(async () => {
  categories.value = await getCategories();
  if (isLogin) {
    bookingEmail.value = JSON.parse(localStorage.getItem("userDetail")).email;
  }
  console.log(categories.value);
});

// clear form func.
const clearForm = () => {
  bookingName.value = "";
  bookingEmail.value = "";
  eventCategoryId.value = "";
  eventDuration.value = "";
  eventStartTime.value = "";
  eventNote.value = "";
};

//Show Error
let ErrorName = ref(false);
let ErrorEmail = ref(false);
let ErrorCategory = ref(false);
let ErrorStartTime = ref(false);
let ErrorEmail_message = ref("");
let ErrorStartTime_message = ref("");

const validateBookingName = () => {
  ErrorName.value = bookingName.value.length == 0;
};

let format = /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateBookingEmail = () => {
  ErrorEmail.value = bookingEmail.value.length == 0;
  if (!format.test(bookingEmail.value.trim())) {
    ErrorEmail.value = true;
    ErrorEmail_message.value = "Format email is Invaild";
  }
};

const validateEventStartTime = () => {
  ErrorStartTime.value = false;
  ErrorStartTime_message.value = "";

  ErrorStartTime.value = eventStartTime.value.length == 0;
  if (validatePast()) {
    ErrorStartTime.value = true;
    ErrorStartTime_message.value = "Sorry, time is a past time";
  }
};

const validatePast = () => {
  const currentDateTime = new Date();
  const dateTime = new Date(eventStartTime.value);
  return dateTime < currentDateTime;
};

// get current datetime
const minDatetimeLocal = computed(() => {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  const hour = String(today.getHours()).padStart(2, "0");
  const minute = String(today.getMinutes()).padStart(2, "0");
  const dateTime = `${date}T${hour}:${minute}`;
  return dateTime;
});

//format date-time for send to backend
const changeFormat = eventStartTime => {
  const dateTime = new Date(eventStartTime);
  return `${dateTime.toLocaleString("en-GB")}`;
};

const onFileChanged = e => {
  file.value = e.target.files[0];
  console.log(file.value);
};

const addEvent = async () => {
  ErrorName.value = bookingName.value.length == 0;
  ErrorEmail.value = bookingEmail.value.length == 0;
  ErrorCategory.value =
    eventCategoryId.value.length == 0 || eventCategoryId.value == "";
  ErrorStartTime.value = eventStartTime.value.length == 0;
  if (
    ErrorName.value ||
    ErrorEmail.value ||
    ErrorCategory.value ||
    ErrorStartTime.value ||
    file.value.size > 10000000
  ) {
    return 0;
  }

  const data = new FormData();
  const newEvent = {
    bookingEmail: bookingEmail.value,
    bookingName: bookingName.value,
    eventCategoryId: eventCategoryId.value,
    eventDuration: eventDuration.value,
    eventNote: eventNote.value,
    eventStartTime: changeFormat(eventStartTime.value)
  };
  data.append("event", JSON.stringify(newEvent));
  if (file.value.length != 0) {
    data.append("file", file.value);
  }
  console.log(data.values);
  addNewEvent(data);
};
</script>

<template>
  <main class="my-8">
    <div class="container px-6 mx-auto">
      <h2 class="mt-3 mb-5 text-4xl font-bold text-white">Add New Event :</h2>

      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
          <div class="max-w-lg mx-auto -mt-7">
            <div class="divide-y divide-gray-200">
              <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <!-- name input -->
                <div class="flex flex-col">
                  <label class="leading-loose">Booking Name :</label>
                  <input
                    type="text"
                    class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                    :class="{ 'empty-field': ErrorName }"
                    placeholder="Enter your name/group name"
                    v-model="bookingName"
                    maxlength="100"
                    @keyup="validateBookingName"
                  />
                </div>

                <!-- email input -->
                <div class="flex flex-col">
                  <label class="leading-loose">Email :</label>
                  <input
                    type="text"
                    class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                    :class="{ 'empty-field': ErrorEmail }"
                    placeholder="Enter your emails"
                    v-model="bookingEmail"
                    pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                    :disabled="isLogin"
                    @keyup="validateBookingEmail"
                  />
                  <p
                    class="ml-2 text-xs text-right text-red-700"
                    v-if="ErrorEmail"
                  >{{ ErrorEmail_message }}</p>
                </div>

                <!-- clinic input -->
                <div class="flex flex-col">
                  <label class="leading-loose">Clinic :</label>
                  <div>
                    <select v-model="eventCategoryId" :class="{ 'empty-field': ErrorCategory }">
                      <option value disabled selected>*** Select Clinic ***</option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                      >{{ category.eventCategoryName }}</option>
                    </select>
                    <span class="ml-3 font-bold">
                      Duration :
                      <input
                        type="type"
                        v-model="eventDuration"
                        style="width: 60px"
                        class="text-center"
                        :disabled="true"
                      />
                      min
                    </span>
                  </div>
                </div>

                <!-- startTime input -->
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col col-7">
                    <label class="leading-loose">Start Time :</label>
                    <input
                      type="datetime-local"
                      :min="`${minDatetimeLocal}`"
                      v-model="eventStartTime"
                      class="w-full py-2 pl-3 pr-4 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                      :class="{ 'empty-field': ErrorStartTime }"
                      @change="validateEventStartTime"
                    />

                    <!-- startTime validate -->
                    <span class="relative text-gray-400 focus-within:text-gray-600">
                      <p
                        class="ml-2 text-xs text-red-700"
                        v-if="validateEventStartTime"
                      >{{ ErrorStartTime_message }}</p>
                    </span>
                  </div>
                </div>

                <!-- event note input -->
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col">
                    <label class="leading-loose">Note :</label>
                    <textarea
                      type="text"
                      rows="4"
                      cols="50"
                      maxlength="500"
                      class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                      placeholder="Note"
                      v-model="eventNote"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="py-4">
                <label class="leading-loose">Attachment File :</label>
                <FilePond
                  ref="pond"
                  maxFileSize="10MB"
                  @change="onFileChanged($event)"
                  label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
                />
              </div>

              <!-- button -->
              <div class="flex items-center pt-4 space-x-4">
                <button
                  @click="goBack"
                  class="flex items-center justify-center w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none hover:bg-red-500"
                >
                  <svg
                    class="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  @click="addEvent"
                  class="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
                >Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#addEvent-tp {
  margin-left: 27%;
  margin-top: 10%;
}

#addEvent-bg {
  margin-left: 32%;
  background-color: white;
  width: 60%;
  height: 100%;
  border-radius: 25px;
  margin-bottom: 3%;
}

#FillForm {
  margin-left: 1%;
  line-height: 60px;
}

.buttonStyle {
  align-items: center;
  font-size: 120%;
  background-color: #ed8d92;
  margin: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  margin-bottom: 2%;
}
.buttonStyle:hover {
  background-color: #d9f4a4;
}
input,
select,
.endTime {
  margin-left: 3%;
  background-color: #b9d0f0;
  border-radius: 7px;
  height: 40px;
  font-size: 100%;
}

input:focus {
  background-color: #d9f4a4;
}

option {
  background-color: lavender;
}
option:hover {
  background-color: #b9d0f0;
}

label {
  font-weight: bold;
  font-size: 110%;
}

.inputHeading {
  font-weight: bold;
  font-size: 100%;
}
.empty-field {
  border: #dd2828 2px solid;
}
</style>

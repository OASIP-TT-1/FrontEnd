<script setup>
import { ref, computed, onUpdated, onBeforeMount } from "vue";
import { editEventDetail } from "../../Fetch/fetch_event";

// Import all Vue FilePond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

const props = defineProps({
  events: {
    type: Array,
    require: true
  },
  event: {
    type: Object,
    require: true
  },
  fileName: {
    type: String,
    require: true
  },
  showEditForm: {
    type: Number,
    require: true
  }
});

const emit = defineEmits(["closeEditEvent"]);

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
  "December"
];

const extractDate = date => {
  const d = new Date(date);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

const extractTime = time => {
  const t = new Date(time);
  const minute = computed(() => {
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`;
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

const eventStartTime = ref(props.event.eventStartTime);
const eventNote = ref(props.event.eventNote);
const showEditForm = ref(props.showEditForm);
const fileName = ref(props.fileName)
const file = ref({name: fileName.value})

const showInputDate = ref(false);
const openInputDate = () => {
  showInputDate.value = !showInputDate.value;
};

const showInputFile = ref(fileName.value == undefined);
const openInputFile = () => {
  showInputFile.value = !showInputFile.value;
};

const RemoveFile = () => {
  fileName.value = undefined
  file.value = ""
  showInputFile.value = true
}

const onFileChanged = e => {
  file.value = e.target.files[0];
  console.log(file.value);
};

//show error
const ErrorStartTime = ref(false);
const ErrorStartTime_message = ref("");
const validateEventStartTime = () => {
  ErrorStartTime.value = false;
  ErrorStartTime_message.value = "";

  ErrorStartTime.value = eventStartTime.value.length == 0;
  if (validatePast()) {
    ErrorStartTime.value = true;
    ErrorStartTime_message.value = "Sorry, this time is past";
  } else if (overlapTime()) {
    ErrorStartTime.value = true;
    ErrorStartTime_message.value = "Sorry, this time is overlap";
  }
};

const validatePast = () => {
  const currentDateTime = new Date();
  const dateTime = new Date(eventStartTime.value);
  return dateTime < currentDateTime;
};

const overlapTime = () => {
  const overlap = ref(false);
  props.events.splice(
    props.events.findIndex(event => event.id == props.event.id),
    1
  );
  const newStartTime = new Date(eventStartTime.value);
  const newEndTime = getEndTime(
    eventStartTime.value,
    props.event.eventDuration
  );

  for (const event of props.events) {
    if (event.eventCategoryId.id == props.event.eventCategoryId.id) {
      const eventStartTime = new Date(event.eventStartTime);
      const eventEndTime = getEndTime(
        event.eventStartTime,
        event.eventDuration
      );
      overlap.value =
        eventStartTime < newEndTime && eventEndTime > newStartTime;
      if (overlap.value == true) {
        break;
      }
    }
  }
  return overlap.value;
};

const getEndTime = (eventStartTime, eventDuration) => {
  const startTime = new Date(eventStartTime);
  const endTime = new Date(eventStartTime);
  endTime.setMinutes(startTime.getMinutes() + eventDuration);
  return endTime;
};

const changeFormat = eventStartTime => {
  const dateTime = new Date(eventStartTime);
  return `${dateTime.toLocaleString("en-GB")}`;
};

// EDIT
const eventToEdit = ref({});
const editingEvent = async () => {
  if (
    changeFormat(props.event.eventStartTime) ==
    changeFormat(eventStartTime.value) &&
    props.event.eventNote == eventNote.value &&
    props.fileName == file.value.name
  ) {
    Swal.fire({
      title: "Sorry, there are no changes in this editing !",
      text: "Do you want to continue or cancel this editing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue editing !"
    }).then(result => {
      if (!result.isConfirmed) {
        return emit("closeEditEvent");
      }
    });
  } else if (file.value.size > 10000000) {
    return 0
  }else{

  const data = new FormData();
  eventToEdit.value = {
    eventCategoryId: props.event.eventCategoryId.id,
    eventNote: eventNote.value,
    eventStartTime: changeFormat(eventStartTime.value),
    eventDuration: props.event.eventDuration
  };
  data.append("event", JSON.stringify(eventToEdit.value));
  if (file.value.length != 0) {
    data.append("file", file.value);
  }
  console.log(data);
  editEventDetail(props.event.id, data)
};
}
</script>

<template>
  <main class="my-8">
    <div id="edit-container" class="edit-container" v-show="showEditForm == 1">
      <div
        class="{`col-12 overflow-auto h-5/6 top-24 bottom-40 rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}">
        <nav class="max-h-screen py-2 rounded-t-lg bg-neutral-800 md:w-12/12 lg:w-12/12">
          <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7">Edit Event :</span>
          <button @click="$emit('closeEditEvent')" id="closeDetail" class="mt-1 col-12">
            <img src="../../assets/close.png" />
          </button>
        </nav>

        <div class="overflow-hidden bg-center bg-cover shadow-lg col-12 bg-zinc-100">
          <div class="grid gap-2 mx-12 my-10 mb-6 lg:grid-cols-2">
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
                Booking name :
                <span class="font-thin">{{ event.bookingName }}</span>
              </h2>
            </div>
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
                Email :
                <span class="font-thin">{{ event.bookingEmail }}</span>
              </h2>
            </div>
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
                Clinic :
                <span class="font-thin">
                  {{
                  event.eventCategoryId.eventCategoryName
                  }}
                </span>
              </h2>
            </div>
            <div>
              <h2 class="mb-1 text-base font-semibold text-gray-900 dark:text-gray-300">
                Date :
                <span class="mr-10 font-thin">
                  {{
                  extractDate(event.eventStartTime)
                  }}
                </span>
                Start Time :
                <span class="font-thin">
                  {{
                  extractTime(event.eventStartTime)
                  }}
                </span>
                <span
                  class="p-1 pl-2 pr-2 ml-4 text-xl text-center bg-purple-300 rounded-md col-3 text-soft-brown heading">
                  {{
                  event.eventDuration }} min
                </span>
              </h2>
              <button @click="openInputDate"
                class="text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Change
                Date&Time
              </button>
              <span class="ml-0.5" v-if="showInputDate">
                <input type="datetime-local" :class="{ 'empty-field': ErrorStartTime }" :min="`${minDatetimeLocal}`"
                  v-model="eventStartTime" @change="validateEventStartTime" />
                <span class="ml-2 text-red-700 col-1" v-if="ErrorStartTime">
                  {{
                  ErrorStartTime_message
                  }}
                </span>
              </span>
            </div>
            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Note :</label>
              <textarea type="text" rows="5" cols="50" maxlength="500" v-model="eventNote"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="clinic descrition..."></textarea>
            </div>
          </div>
          <div class="ml-12 col-6">
            <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
              Attachment File :
              <span class="font-thin">{{ fileName }}</span>
            </h2>
            <div class="mt-4">
              <span @click="openInputFile" v-if="fileName != undefined"
                class="text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                Change File</span>
              <span @click="RemoveFile" v-if="fileName != undefined"
                class="ml-1 text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                Remove File</span>
            </div>
            <FilePond class="mt-4" v-if="showInputFile" ref="pond" maxFileSize="10MB" @change="onFileChanged($event)"
              label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>" />
          </div>
          <div class="float-right mr-20 my-2">
            <button @click="editingEvent"
              class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#edit-container {
  position: absolute;
  left: 15%;
  line-height: 10px;
}

.detail {
  margin-left: 10%;
  font-size: 100%;
  line-height: 45px;
}

.heading {
  font-weight: bold;
  font-size: 80%;
}

#closeDetail {
  width: 3%;
  margin-right: 5%;
  float: right;
  display: inline;
}

.img {
  width: 3%;
  margin-right: 2%;
  display: inline;
}

textarea {
  background-color: #b9d0f0;
}

input {
  margin-left: 3%;
  background-color: #b9d0f0;
  border-radius: 7px;
  width: 37%;
  height: 45px;
  font-size: 100%;
}

input:focus {
  background-color: rgb(216 180 254);
}

.empty-field {
  border: #dd2828 2px solid;
}

.filepond--panel-root {
  background-color: black;
}
</style>

<script setup>
import { ref, onBeforeMount } from "vue";
import { editUserDetail } from '../../Fetch/fetch_user.js'
const props = defineProps({
  users: {
    type: Array,
    require: true
  },
  user: {
    type: Object,
    require: true
  },
  showEditForm: {
    type: Number,
    require: true
  }
});

const filterUsers = ref([])
onBeforeMount(async () => {
  filterUsers.value = props.users.filter((user) => user.id != props.user.id)
});

const username = ref(props.user.name);
const email = ref(props.user.email);
const role = ref(props.user.role);
const roles = ["admin", "lecturer", "student"];
const showEditForm = ref(props.showEditForm);

const ErrorNameNull = ref(false);
const ErrorNameUnique = ref(false)
const ErrorEmailNull = ref(false);
const ErrorEmailUnique = ref(false)
const ErrorEmailFormat = ref(false)

const validationName = () => {
    ErrorNameNull.value = username.value == null || username.value == ''
    ErrorNameUnique.value = filterUsers.value.map((user) =>{return user.name.trim()}).includes(username.value.trim())
}

const validationEmail = () => {
    if(email.value == null || email.value == '') {
        ErrorEmailNull.value = true
        ErrorEmailFormat.value = false
    }else {
        ErrorEmailNull.value = false
        ErrorEmailFormat.value = validateEmailFormat(email.value.trim()) 
        ErrorEmailUnique.value = filterUsers.value.map((user) => {return user.email.trim()}).includes(email.value.trim())
    }
}

const validateEmailFormat = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email))
}

// EDIT
const userToEdit = ref({});

const emit = defineEmits(["closeEditEvent"]);

const editingUser = () => {
  if(username.value == props.user.name && email.value == props.user.email && role.value == props.user.role){
    closeEditForm();
  }else{
    userToEdit.value = {
      name: username.value,
      email: email.value,
      role: role.value
    };
    editUserDetail(userToEdit.value , props.user.id)
      .then( (res) => {
        if(res == 200){closeEditForm()}
      })
  }
};

const closeEditForm = () => {
  showEditForm.value = false
  window.location.reload()
}

</script>

<template>
  <main class="w-5/12 my-8 border-2 border-rose-600">
    <div id="edit-container" class="px-6 detail-container" v-show="showEditForm == 1">
      <div
        class="{`col-12 overflow-auto h-5/6 top-24 bottom-40 rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}"
      >
        <!-- navbar -->
        <nav class="max-h-screen py-2 rounded-t-lg bg-neutral-800 lg:w-12/12">
          <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7">Edit User :</span>
          <button @click="$emit('closeEditUser')" id="closeDetail" class="mt-1 col-12">
            <img src="../../assets/close.png" />
          </button>
        </nav>

        <div class="overflow-hidden bg-center bg-cover shadow-lg col-12 bg-zinc-100">
          <div class="grid gap-6 px-10 mx-16 my-10 mb-6 lg:grid-cols-2">
            <!-- show ของเดิม -->
            <div class="flex flex-col">
              <label class="leading-loose">Username :</label>
              <input
                type="text"
                class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                placeholder="Enter your name/group name"
                @keyup="validationName"
                v-model="username"
                maxlength="100"
              />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorNameNull"> Please enter username </p>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorNameUnique"> Username is already used </p>
            </div>

            <div class="flex flex-col">
              <label class="leading-loose">Email :</label>
              <input
                type="text"
                class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                placeholder="Enter your email"
                @keyup="validationEmail"
                v-model="email"
                maxlength="50"
              />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmailNull"> Please enter email </p>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmailUnique"> Email is already used </p>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmailFormat"> Please enter the correct email </p>
            </div>
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900">
                Role :
                <select v-model="role" class="rounded-lg">
                  <option value disabled selected>Select Role</option>
                  <option
                    v-for="(eachRole, index) in roles"
                    :key="index"
                    :value="eachRole"
                  >{{ eachRole }}</option>
                </select>
              </h2>
            </div>
          </div>
          <!-- save button -->
          <div class="float-right mr-20">
            <button
              @click="editingUser"
              class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#edit-container {
  position: absolute;
  left: 25%;
  line-height: 10px;
  width: 3000%;
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
  background-color: #b9d0f0;
  border-radius: 7px;
  width: 100%;
  height: 45px;
  font-size: 100%;
}
input:focus {
  background-color: rgb(216 180 254);
}
.error-message {
  color: red;
  font-size: small;
  font-weight: 100;
  margin-left: 2%;
}
</style>

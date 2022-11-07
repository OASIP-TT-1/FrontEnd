<script setup>
import { ref } from "vue";
import { getUserDetail } from "../../Fetch/fetch_user.js"
import ShowUserDetail from "../../components/UserComponents/ShowUserDetail.vue";
import EditUserDetail from "../../components/UserComponents/EditUserDetail.vue";

const props = defineProps({
  users: {
    type: Array,
    require: true,
  }
})

defineEmits('deleteUsers')

const isShowDetail = ref(0)
const isShowEdit = ref(0)
const detailCurrentUser = ref({})
const showDetail = async (userId) => {
  detailCurrentUser.value = await getUserDetail(userId)
  isShowDetail.value = 1
}
const closeShowDetail = () => {
  isShowDetail.value = 0
  isShowEdit.value = 0
}
const showEditForm = (user) => {
  isShowEdit.value = 1
  detailCurrentUser.value = user
  console.log(isShowEdit.value)
}
const closeEditForm = () => {
  isShowEdit.value = 0
  console.log(isShowEdit.value)
}
</script>
 
<template>
  <div>
    <div class="min-h-screen lg:mx-48 md:mx-32 sm:mx-8">
    <div class="p-4 rounded-md">
      <div
        class="flex justify-between px-4 py-2 font-bold text-white rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 text-md">
        <div class="basis-2/12">
          <span>Profile</span>
        </div>
        <div class="basis-3/12">
          <span>Username</span>
        </div>
        <div class="basis-6/12">
          <span>Email</span>
        </div>
        <div class="basis-2/12">
          <span>Role</span>
        </div>
        <div class="basis-3/12">
          <span></span>
        </div>
      </div>
      <div v-if="users.length !== 0">
        <div v-for="(user, index) in users" :key="index"
          class="flex justify-between mt-4 space-x-4 text-sm font-normal bg-white hover:translate-y-5 hover:shadow-2xl rounded-3xl">
          <div class="basis-2/12">
            <img class="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../../assets/kid.jpg"
              alt="Bordered avatar">
          </div>
          <div class="mt-5 basis-3/12">
            <span class="font-bold">{{user.name}}</span>
          </div>
          <div class="mt-5 basis-6/12 ">
            <span>{{user.email}}</span>
          </div>
          <div class="mt-5 basis-3/12 ">
            <span>{{user.role}}</span>
          </div>

          <div class=" basis-2/12">
            <div class="flex space-x-2 md:mt-5">
              <div @click="showDetail(user.id)"
                class="inline-flex p-1 -ml-20 text-sm text-center text-white bg-blue-700 rounded-lg cursor-pointer font-mediu1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Detail</div>
              <div @click="showEditForm(user)"
                class="inline-flex p-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                Edit</div>
              <div @click="$emit('deleteUsers' , user.id)"
                class="inline-flex p-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                Delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ShowUserDetail v-if="isShowDetail == 1" @closeMe="closeShowDetail" :user="detailCurrentUser" />
  <EditUserDetail class="edit" v-if="isShowEdit == 1" @closeEditUser="closeEditForm" :users="users" :user="detailCurrentUser"
    :showEditForm="isShowEdit" />
  </div>
</template>
 
<style>

</style>
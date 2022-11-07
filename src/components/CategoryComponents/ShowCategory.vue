<script setup>
import { ref, computed, onUpdated } from "vue";
import EditCategory from '../CategoryComponents/EditCategory.vue'
const props = defineProps({
  categories: {
    type: Array,
    require: true,
  }
})

const isShowEdit = ref(0)
const detailCurrentCategory = ref({})
const showEditForm = (category) => {
  console.log("เข้า");
  detailCurrentCategory.value = category;
  isShowEdit.value = 1;
}
const closeEditForm = () => {
  isShowEdit.value = 0;
  window.location.reload();
};

const isAdmin = computed(() =>{
  if(localStorage.getItem('accessToken') !== null){
    return JSON.parse(localStorage.getItem('userDetail')).role == 'admin'
  }
})

</script>
 
<template>
  <div>
    <div class="text-5xl font-bold text-center">Clinic</div>
    <div class="px-4 mx-16 my-12 md:px-12">
      <div v-if="categories.length !== 0" class="flex flex-wrap -mx-1 lg:-mx-4">
        <div v-for="(category, index) in categories" :key="index"
          class="p-4 m-auto mb-8 overflow-hidden transition duration-500 ease-in-out transform rounded-lg shadow-lg cursor-pointer h-max h-30 w-80 md:w-80 bg-indigo-50 hover:translate-y-5 hover:shadow-2xl">
            <img alt="blog photo"
              src="https://ouch-cdn2.icons8.com/7IafUowCewhP-tIcwdGHyXhsJoqElQ00jmljBiQ2GMU/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjYv/YTc5MzE5ZDMtNWM5/ZS00MTVmLWJiMjQt/MzMxZjczZmQwN2Vj/LnBuZw.png"
              class="object-cover w-full max-h-60" />
            <div class="w-full">
              <p class="font-medium text-indigo-500 text-md">
                {{ category.eventDuration }} mins
              </p>
              <p class="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                {{ category.eventCategoryName }}
              </p>
              <p class="font-light text-gray-600 dark:text-gray-300 text-md">
                {{ category.eventCategoryDescription }}
              </p>
              <div class="flex flex-wrap items-center justify-center pt-5 mt-4 border-t-2">
                <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName }, }">
                  <div
                    class="text-xs mr-2 py-1.5  hover:text-sm hover:font-semibold hover:bg-orange-200 px-4 text-gray-600 bg-blue-200 rounded-2xl">
                    See Events
                  </div>
                </router-link>
                <div @click="showEditForm(category)" v-if="isAdmin"
                  class="text-xs hover:text-sm hover:font-semibold mr-2 py-1.5 px-4 hover:bg-orange-200 text-gray-600 bg-blue-200 rounded-2xl">
                  Edit Clinic
                </div>
              </div>
            </div>
        </div>
      </div>
      <div v-else class="notHaveEvent col-9">
        <h1>ไม่มีรายการ Category</h1>
      </div>
  
    </div>
  
    <EditCategory v-if="isShowEdit == 1" @closeEditCategory="closeEditForm" :categories="categories"
      :category="detailCurrentCategory" :showEditForm="isShowEdit" />

    </div>
  </template>
 
<style>

</style>
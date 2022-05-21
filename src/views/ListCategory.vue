<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import ListCategory from '../components/ListCateComponent.vue';

const categories = ref([])
const getCategory = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories`)
  if (res.status === 200) {
    categories.value = await res.json()
    console.log(categories.value)
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getCategory()
})


</script>



<template>
<div>
  <ListCategory :categories="categories"></ListCategory>
</div>
  <!-- <div>List By Category ▶</div> -->

  <!-- <div style="width: 110%" class="grid grid-cols-3 gap-3 ml-80 mt-2">

    <router-link :to="{ name: 'ListByCategory', params: {id: 1} }">
      <img src="../assets/images/project.png" />
    </router-link>

    <router-link :to="{ name: 'ListByCategory', params: {id: 2} }">
      <img src="../assets/images/dev.png" />
    </router-link>   

    <router-link :to="{ name: 'ListByCategory', params: {id: 3} }">
      <img src="../assets/images/data.png" />
    </router-link>    

    <router-link :to="{ name: 'ListByCategory', params: {id: 4} }">
      <img src="../assets/images/front.png" class="ml-32" />
    </router-link> 

    <router-link :to="{ name: 'ListByCategory', params: {id: 5} }">
      <img src="../assets/images/back.png" class="ml-32" />
    </router-link>
    
  </div> -->
  <!-- <div>
    <div class="category-box flex flex-row items-center rounded-xl py-40" v-for="category in categories">
      <div class="mr-10 ml-5">
        <img src="../assets/images/category.png" class="" width="55" />
      </div>
      <div class="basis-5/6">
        <p class="text-4xl mb-2">{{ category.eventCategoryName }}</p>
        <p>Description : {{ category.eventCategoryDescription }}</p>
        <span id="duration" class="rounded-full w-44 h-7 p-1 px-3 text-black text-sm">Duration : {{ category.eventDuration }} min.</span>
      </div>
      <div class="Btn">
        <button class="edit bg-blue-500 hover:bg-blue-400 p-2 px-3 rounded-md text-white">Edit category</button>
        <router-link :to="{ name: 'ListByCategory', params: {id: category.id} }">
          <button class="bg-orange-600 hover:bg-orange-400 p-2 px-3 rounded-md text-white">Show events in category</button>
        </router-link>
      </div>

    </div>
  </div> -->

</template>

<style scoped>
/* img {
  padding: 5%;
  margin: 5%;
  border: 0.2em solid white;
  border-radius: 4%;
} */

/* img:hover {
  border: 0.2em solid white;
  border-radius: 4%;
  background-color: rgba(255, 255, 255, 0.3);
} */

.category-box {
  background-color: rgba(255, 255, 255, 0.5);
  width: 150%;
  height: 12em;
  color: #383838;
  margin-left: 20%;
  margin-bottom: 3%;
  padding: 3%;
}

#duration {
  background-color: #eee385;
}

.edit {
  width: 79.5%;
  margin-bottom: 3%;
}

.Btn {
  text-align: center;
}
</style>

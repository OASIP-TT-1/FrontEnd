<script setup>
import { ref, onBeforeMount } from "vue";
import { editCategory } from '../../Fetch/fetch_category'
const props = defineProps({
  categories: {
    type: Array,
    require: true,
  },
  category: {
    type: Object,
    require: true,
  },
  showEditForm: {
    type: Number,
    require: true,
  },
});

const emit = defineEmits(['closeEditCategory'])

const filterCategory = ref([])
onBeforeMount(async () => {
  filterCategory.value = props.categories.filter((category) => category.id != props.category.id)
  console.log(filterCategory);
});

const categoryName = ref(props.category.eventCategoryName);
const duration = ref(props.category.eventDuration);
const description = ref(props.category.eventCategoryDescription);
const showEditForm = ref(props.showEditForm);

// EDIT
const categoryToEdit = ref({});
const editingCategory = () => {
  if (
    props.category.eventCategoryName == categoryName.value &&
    props.category.eventDuration == duration.value &&
    props.category.eventCategoryDescription == description.value
  ) {
    Swal.fire({
      title: 'Sorry, there are no changes in this editing !',
      text: "Do you want to continue or cancel this editing?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue editing !',
    }).then((result) => {
      if (!result.isConfirmed) {
        return emit('closeEditCategory')
    }
  })
  } else {
    categoryToEdit.value = {
      eventCategoryName: categoryName.value.trim(),
      eventDuration: duration.value,
      eventCategoryDescription: description.value,
    };
    editCategory(props.category.id, categoryToEdit.value)
    .then( (res) => {
        if(res === 200) {emit('closeEditCategory')}
      })
  }
};

//show-error
const ErrorNameNull = ref(false);
const ErrorNameUnique = ref(false);
const ErrorDurationNull = ref(false);
const ErrorDurationRange = ref(false);

const validateEventCategoryName = () => {
  ErrorNameNull.value = categoryName.value == null || categoryName.value == ''
  ErrorNameUnique.value = filterCategory.value.map((category) =>{return category.eventCategoryName.trim()}).includes(categoryName.value.trim())
}

const validateDuration = () => {
  ErrorDurationNull.value = duration.value == null || duration.value == ''
  ErrorDurationRange.value = duration.value < 1 || duration.value > 480
}

</script>

<template>
  <main class="my-8">
    <div class="px-6 detail-container" v-show="showEditForm == 1">
      <div class="{`col-12 overflow-auto h-3/4 top-28 bottom-auto rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}" >
        <!-- navbar -->
        <nav class="max-h-screen py-2 rounded-t-lg lg:w-12/12 bg-neutral-800">
          <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7">
            Edit Clinic :
          </span>
          <button @click="$emit('closeEditCategory')" id="closeDetail" class="mt-1 col-12">
            <img src="../../assets/close.png" />
          </button>
        </nav>
        <!-- edit clinic -->
        <div class="overflow-hidden bg-white bg-center bg-cover shadow-lg col-12 shadow-zinc-700">
          <div class="grid gap-6 px-10 mx-16 my-10 mb-6 lg:grid-cols-2">
            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Clinic name :</label>
              <input
                type="text"
                v-model="categoryName"
                @keyup="validateEventCategoryName"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :class="{ 'empty-field': ErrorNameNull }"
                placeholder="categoryName"
                maxlength="100"
                required
              />
              <span class="ml-2 text-red-700 col-1" v-if="ErrorNameUnique">This name is already used</span><br>
            </div>

            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Duration :</label>
              <input
                type="number"
                v-model="duration"
                @keyup="validateDuration"
                @change="validateDuration"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="duration"
                :class="{ 'empty-field': ErrorDurationNull }"
                required
              />
              <span class="ml-2 font-bold">min </span>
              <span class="ml-2 text-red-700 col-1" v-if="ErrorDurationRange" >Must be in range 1-480</span><br>
            </div>

            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Description :</label>
              <textarea
                type="text"
                rows="5"
                cols="50"
                v-model="description"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="clinic descrition..."
                maxlength="500"
                required
              ></textarea>
            </div>

          </div>

          <div class="float-right mr-20">
            <button @click="editingCategory" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail-container {
  position: absolute;
  left: 30%;
  line-height: 10px;
}
#closeDetail {
  width: 3%;
  margin-right: 5%;
  float: right;
  display: inline;
}
textarea {
  background-color: #b9d0f0;
}

input {
  margin-left: 3%;
  background-color: #b9d0f0;
  border-radius: 7px;
  width: 70%;
  height: 40px;
  font-size: 100%;
}
input:focus {
  background-color: rgb(216 180 254);
}
.empty-field {
  border: red 2px solid;
}
</style>

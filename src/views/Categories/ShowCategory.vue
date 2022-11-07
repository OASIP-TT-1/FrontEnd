<script setup>
import { ref, onBeforeMount} from "vue";
import { getCategories } from "../../Fetch/fetch_category";
import EditCategory from "../../components/CategoryComponents/EditCategory.vue";
import ShowCategory from "../../components/CategoryComponents/ShowCategory.vue";

const categories = ref([]);

onBeforeMount(async () => {
  categories.value = await getCategories();
});

defineEmits(["editCategory"]);
const isShowEdit = ref(0);
const detailCurrentCategory = ref({});

const showEditForm = (category) => {
  isShowEdit.value = 1;
  detailCurrentCategory.value = category;
  console.log(isShowEdit.value);
};

const closeEditForm = () => {
  isShowEdit.value = 0;
  window.location.reload();
  console.log(isShowEdit.value);
};

const render = !(localStorage.getItem("accessToken") == null)

</script>

<template>
  <div>
    <ShowCategory :categories="categories" v-if="render"></ShowCategory>
    <h1 id="pleaslogin" v-else>Please Login</h1>

    <!-- <EditCategory v-if="isShowEdit == 1" @closeEditCategory="closeEditForm" :categories="categories"
      :category="detailCurrentCategory" :showEditForm="isShowEdit" /> -->
  </div>

</template>

<style scoped>
    #pleaslogin{
    text-align: center;
    margin-top: 20em;
  }
.detail {
  margin-left: 5%;
  font-size: 100%;
  line-height: 37px;
}

.heading {
  font-weight: bold;
  margin-left: 1%;
}

.scrollBar {
  overflow-y: scroll;
  height: 100vh;
}

#categoryContainer {
  margin-left: 27%;
  width: 70%;
  height: 100%;
  border-radius: 25px;
}

#allDetail {
  margin-bottom: 7%;
}

#eachCategoryList {
  /* background-color: palegoldenrod; */
  background-image: linear-gradient(rgb(255, 157, 0), rgb(255, 237, 99));
  padding: 30px;
  border-radius: 12px;
  height: 100%;
}

#eachCategoryList:hover {
  width: 90%;
  /* background-color : rgb(255, 202, 67);   */
  background-image: linear-gradient(rgb(3, 101, 117), rgb(133, 235, 255));
  transition-property: width;
  /* กำหนดให้ "width" เป็น property ที่จะใช้ transition */
  transition-duration: 0.3s;
  /* กำหนดให้ transition กินระยะเวลา 1 วินาที */
  transition-timing-function: ease-in-out;
  /* กำหนดให้รูปแบบของ speed เป็นแบบ "ease" */
}

.img-button {
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
  height: 55vh;
  margin-right: 5%;
}

.img {
  width: 7%;
  display: inline;
}
</style>

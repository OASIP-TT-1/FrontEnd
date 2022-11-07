<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router"
import {deleteUser , getUsers} from "../../Fetch/fetch_user.js"
import ShowUsers from "../../components/UserComponents/ShowUsers.vue"
let { params } = useRoute()

const users = ref([]);

onBeforeMount(async () => {
  users.value = await getUsers();
  return fillers();
});

const deleteUsers = async (id) => {
  const res = await deleteUser(id)
  res == 200? users.value = users.value.filter((user) => { return user.id != id; }) : ''
}

const fillers = () => {
  if (params.roles != 'all') {
    users.value = users.value.filter(user => user.role == params.roles)
  }
}
const render = !(localStorage.getItem("accessToken") == null)

</script>

<template>
  <ShowUsers :users="users" @deleteUsers="deleteUsers" v-if="render"></ShowUsers>
  <h1 id="pleaslogin" v-else>Please Login</h1>
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
  background-color: #d9f4a4;
  text-align: center;
  border-radius: 12px;
  font-size: 90%;
}

#allButton {
  text-align: right;
}

.img-button {
  width: 20%;
  display: inline;
}

.img {
  width: 7%;
  display: inline;
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

.edit {
  width: 100%;
}
</style>
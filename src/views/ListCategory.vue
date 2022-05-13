<script setup>

</script>



<template>
  <!-- <div>List By Category ▶</div> -->

  <div style="width: 110%" class="grid grid-cols-3 gap-3 ml-80 mt-2">

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
    
  </div>

</template>

<style scoped>
img {
  padding: 5%;
  /* margin: 5%; */
  border: 0.2em solid white;
  border-radius: 4%;
}

img:hover {
  border: 0.2em solid white;
  border-radius: 4%;
  background-color: rgba(255, 255, 255, 0.3);
}

</style>

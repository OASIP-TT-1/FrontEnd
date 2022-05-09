<script setup>

</script>
 
<template>
    <div class="ml-44">
        <div id="home" class="">
          <div>
            <div style="font-size: 65px; color: white;" class="mt-10">bookiing</div>
            <div style="color: white;">
              <a>OASIP-TT1</a><br>
              <a>website for booking clinics of INT221 subject</a>
            </div>
            <router-link :to="{ name: 'ListAll' }">
                <div class="mt-3">
                    <button class="text-white text-lg p-2 px-4 rounded-full bg-orange-500 hover:bg-orange-600">
                        Get Start !
                    </button>
                </div>
            </router-link>
            
          </div>

          <div class="ml-40 -mt-80">
            <img src="../assets/images/home1.png">
          </div>
        </div>
    </div>
</template>
 
<style>
#home {
  position: fixed;
  width: 1500px;
  height: 550px;
  padding: 30px 40px;
  background-color: rgb(255, 255, 255, 0);  
  color: black;
}
</style>
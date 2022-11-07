<script setup>
  import Member_ComponentVue from '../components/Member_Component.vue';
</script>

<template>
  <main class="m-3 my-8 col-12">
    <div class="container justify-center px-1 mx-auto text-center col-12">
      <h2 class="mb-3 text-5xl font-bold text-black uppercase col-12"> members </h2>
      <h2 class="text-3xl font-bold text-black uppercase mb-28 col-12"> team : เหนื่อยก็พัก เจอบั๊กก็ค่อยแก้ </h2>
      <div class="grid gap-8 m-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 md:m-2 sm:m-1">
        <Member_ComponentVue :name="'PICHAYA PAIRIN'" :stdId="'63130500086'" :img="'game.jpg'" :facebook="'https://www.facebook.com/'"></Member_ComponentVue>
        <Member_ComponentVue :name="'ARISA AUDOMKHACHONKITTI'" :stdId="'63130500134'" :img="'ice.jpg'"></Member_ComponentVue>
        <Member_ComponentVue :name="'CHANANYA SINPHICHIT'" :stdId="'63130500140'" :img="'mod2.jpg'"></Member_ComponentVue>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

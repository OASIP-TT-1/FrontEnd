<script setup>
import Reigster from '../../components/UserComponents/Register.vue';
import {Register} from '../../Fetch/fetch_authorization.js'
</script>
 
<template>
<Reigster @register="Register"></Reigster>
</template>
 
<style>
</style>
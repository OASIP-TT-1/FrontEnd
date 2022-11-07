<script setup>
import Login from '../../components/UserComponents/Login.vue';
import { Login as LoginProgress } from '../../Fetch/fetch_authorization';

</script>

<template>
<Login @Login="LoginProgress"></Login>
</template>

<style scoped>
</style>

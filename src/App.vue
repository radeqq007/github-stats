<template>
  <Hero @username-changed="updateUsername" />
  <Dashboard :username="username" />
</template>

<script setup>
import { ref } from 'vue';
import Dashboard from './components/Dashboard.vue';
import Hero from './components/Hero.vue';

const username = ref('');

const updateUsername = newUsername => {
  username.value = newUsername;
};
</script>

<style scoped></style>

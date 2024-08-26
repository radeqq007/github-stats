<template>
  <div class="hero">
    <h1>YOUR GITHUB STATS</h1>
    <input type="text" placeholder="Your username..." v-model="username" />
    <button @click="updateUsername">GET STATS</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const emit = defineEmits();

const updateUsername = () => {
  emit('username-changed', username.value);
};
</script>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  justify-items: center;
}

h1 {
  font-size: 6rem;
  font-weight: 900;
}
input,
button {
  background-color: var(--bg);
  height: 3.2rem;
  width: 20%;
  border: none;
  border-radius: 10rem;
  padding: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

input {
  grid-row-start: 4;
  font-weight: 300;
}

input:focus,
input:active {
  outline: 2px solid var(--primary);
}

button {
  grid-row-start: 5;
  box-shadow: 0 0.2rem 0.2rem var(--primary);
  cursor: pointer;
}
</style>

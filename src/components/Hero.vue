<template>
  <div class="hero">
    <h1>YOUR GITHUB STATS</h1>
    <span class="input">
      <input type="text" placeholder="Your username..." v-model="username" />
      <button @click="updateUsername">GET STATS</button>
    </span>
  </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { ref } from 'vue';

// Default chart styling
Chart.defaults.color = 'white';

const username = ref('');
const emit = defineEmits();

const updateUsername = () => {
  emit('username-changed', username.value);

  // Scroll do dashboard
  const dashboardElement = document.getElementById('dashboard');
  dashboardElement.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10vh;
}

.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
}

h1 {
  font-size: 6rem;
  font-weight: 900;
}

input,
button {
  background-color: var(--bg);
  height: 3.2rem;
  width: 100%;
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

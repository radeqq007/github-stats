<template>
  <div class="h-screen flex flex-col justify-center items-center gap-10 md:gap-40">
    <h1 class="font-black text-6xl text-center md:text-8xl">YOUR GITHUB STATS</h1>
    <span class="flex flex-col items-center gap-8">
      <input type="text" placeholder="Your username..." v-model="username" class="w-70 md:w-100 border-2 border-purple-600 rounded-3xl p-1 md:p-3 text-gray-100 text-center text-lg font-light bg-gray-900"/>
      <button @click="updateUsername" class="w-70 md:w-100 bg-purple-600 rounded-3xl p-2 md:p-3 ">GET STATS</button>
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



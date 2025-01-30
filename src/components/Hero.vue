<template>
  <div
    class="h-screen flex flex-col justify-center items-center gap-10 md:gap-40"
  >
    <h1 class="font-black text-7xl text-center md:text-9xl w-full md:w-160">
      YOUR GITHUB STATS
    </h1>
    <span class="flex flex-col items-center gap-8">
      <span
        class="relative bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl"
      >
        <span
          class="absolute inset-0.5 bg-zinc-900 group-hover:opacity-0 duration-100 rounded-3xl"
        ></span>
        <input
          type="text"
          placeholder="Your username..."
          v-model="username"
          class="relative z-10 w-70 md:w-100 focus:outline-0 rounded-3xl p-1 md:p-3 text-gray-100 text-center text-lg font-light"
        />
      </span>
      <button
        @click="updateUsername"
        class="group relative w-70 md:w-100 bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl p-2 md:p-3"
      >
        <span
          class="absolute inset-0.5 bg-zinc-900 opacity-0 md:opacity-100 group-hover:opacity-0 duration-100 rounded-3xl"
        ></span>
        <span class="relative z-10"> GET STATS </span>
      </button>
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

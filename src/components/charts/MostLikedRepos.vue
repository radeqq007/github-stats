<template>
  <div class="w-full flex flex-col items-center gap-4">
    <div
      class="bg-zinc-800/60 backdrop-blur-xs w-full px-10 py-8 rounded-lg flex justify-between align-center hover:bg-zinc-700 hover:scale-101 transition-all"
      v-for="(repo, index) in repos"
      :key="index"
    >
      <span class="flex flex-col gap-2">
        <h4 class="font-bold text-2xl">{{ index + 1 }}. {{ repo.name }}</h4>
        <h5 class="text-lg italic text-gray-300">
          {{ repo.description ? repo.description : 'No description' }}
        </h5>
      </span>

      <p class="text-xl">{{ repo.stargazers_count }} ⭐</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  username: String,
});

let isDataFetched = ref(false);
const repos = ref([]);

async function fetchData() {
  if (!props.username) {
    isDataFetched.value = false;
    return;
  }

  isDataFetched.value = false;

  try {
    const resp = await fetch(
      `https://api.github.com/users/${props.username}/repos`
    );

    const data = await resp.json();

    repos.value = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
    isDataFetched.value = true;
  } catch (err) {
    // TODO: Do something about this
    console.error(`Error fetching user data: ${err}`);
  }
}

// Fetch data whenever username changes
watch(
  () => props.username,
  () => fetchData(),
  {
    immediate: true,
  }
);
</script>

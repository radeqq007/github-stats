<template>
  <div class="w-full flex flex-col items-center gap-4">
    <div
      class="bg-zinc-800/60 backdrop-blur-xs w-full px-10 py-8 rounded-lg flex justify-between align-center hover:bg-zinc-700 hover:scale-101 transition-all"
      v-for="(repo, index) in repos"
      :key="index"
    >
      <div class="flex flex-col gap-2">
        <h4 class="font-bold text-2xl">{{ index + 1 }}. {{ repo.name }}</h4>
        <h5 class="text-lg italic text-gray-300">
          {{ repo.description ? repo.description : 'No description' }}
        </h5>
      </div>

      <p class="text-xl">{{ repo.stargazers_count }} ⭐</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: Array,
});

const repos = ref([]);

watch(
  () => props.data,
  newData => {
    if (!Array.isArray(newData)) return;

    repos.value = [...newData].sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );
  },
  {
    immediate: true,
  },
);
</script>

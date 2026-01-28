<template>
  <div class="w-11/12 m-auto" id="dashboard">
    <h2 v-if="!username">Enter your github username.</h2>
    <div class="grid grid-cols-2 gap-4">
      <div
        class="w-full col-span-2 p-10 bg-zinc-800/60 backdrop-blur-xs rounded-lg"
      >
        <h3 v-if="!username">Profile</h3>
        <UserProfile :data="user" :username="username" />
      </div>
      <div
        class="bg-zinc-800/60 backdrop-blur-xs rounded-lg px-10 py-5 flex flex-col gap-10 col-span-2 md:col-span-1"
      >
        <h3 class="font-bold text-4xl text-center">Most used languages:</h3>

        <div class="chart">
          <MostUsedLanguages :data="repos" />
        </div>
      </div>
      <div
        class="bg-zinc-800/60 backdrop-blur-xs rounded-lg px-10 py-5 flex flex-col gap-10 col-span-2 md:col-span-1"
      >
        <h3 class="font-bold text-4xl text-center">Types of repositories:</h3>

        <div class="chart">
          <ReposType :data="repos" />
        </div>
      </div>

      <div class="col-span-2 flex flex-col gap-2">
        <h3 class="font-bold text-4xl text-center">Most liked repos:</h3>

        <div>
          <MostLikedRepos :data="repos" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MostLikedRepos from './charts/MostLikedRepos.vue';
import MostUsedLanguages from './charts/MostUsedLanguages.vue';
import ReposType from './charts/ReposType.vue';
import UserProfile from './charts/UserProfile.vue';

import { ref, watch } from 'vue';

const props = defineProps({
  username: String,
});

const user = ref({});
const repos = ref([]);

const fetchData = async () => {
  if (!props.username) return;
  const [userResp, reposResp] = await Promise.all([
    fetch(`https://api.github.com/users/${props.username}`),
    fetch(`https://api.github.com/users/${props.username}/repos`),
  ]);

  user.value = await userResp.json();
  repos.value = await reposResp.json();

  console.log(repos.value);
};

watch(
  () => props.username,
  () => fetchData(),
);
</script>

<template>
  <div
    class="flex justify-between p-1 md:p-8 md:flex-row flex-col items-center md:items-start"
    v-if="username"
  >
    <div class="flex flex-col items-center">
      <img
        :src="`https://avatars.githubusercontent.com/${username}`"
        alt="Profile Picture"
        class="w-50 md:w-60 rounded-full"
      />
      <h3 class="font-black text-4xl">{{ username }}</h3>
      <p class="italic text-lg md:text-xl">{{ bio }}</p>
    </div>
    <div class="flex flex-col items-center md:items-end w-1/2 gap-4 mt-10">
      <h4 class="text-3xl flex justify-between w-80">
        Followers:
        <span class="bg-zinc-900 w-30 text-center rounded-xl p-1">{{
          followers
        }}</span>
      </h4>
      <h4 class="text-3xl flex justify-between w-80">
        Following:
        <span class="bg-zinc-900 w-30 text-center rounded-xl p-1">{{
          following
        }}</span>
      </h4>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  username: String,
});

const followers = ref(0);
const following = ref(0);
const bio = ref('');

async function fetchUserData() {
  if (!props.username) {
    followers.value = 0;
    following.value = 0;
    bio.value = '';
    return;
  }

  try {
    const resp = await fetch(`https://api.github.com/users/${props.username}`);

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();

    followers.value = data.followers;
    following.value = data.following;
    bio.value = data.bio;
  } catch (err) {
    // TODO: handle error
    console.log(`Error fetching data: ${err}`);

    // Reset data on error
    followers.value = 0;
    following.value = 0;
    bio.value = '';
  }
}

// Fetch data whenever username changes
watch(
  () => props.username,
  () => {
    fetchUserData();
  },
  {
    immediate: true,
  }
);
</script>

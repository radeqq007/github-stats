<template>
  <div class="profile" v-if="username">
    <div class="left">
      <img
        :src="`https://avatars.githubusercontent.com/${username}`"
        alt="Profile Picture"
      />
      <h3 class="username">{{ username }}</h3>
      <p class="bio">{{ bio }}</p>
    </div>
    <div class="right">
      <h4>
        Followers: <span>{{ followers }}</span>
      </h4>
      <h4>
        Following: <span>{{ following }}</span>
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

async function fetchBio() {
  try {
    const resp = await fetch(`https://api.github.com/users/${props.username}`);
    const data = await resp.json();

    bio.value = data.bio;
  } catch (err) {
    // TODO: Do something about this
    console.error(`Error fetching user data: ${err}`);
  }
}

async function fetchFollowing() {
  try {
    const resp = await fetch(
      `https://api.github.com/users/${props.username}/following`
    );
    const data = await resp.json();

    following.value = data.length;
  } catch (err) {
    // TODO: Do something about this
    console.error(`Error fetching user data: ${err}`);
  }
}

async function fetchFollowers() {
  try {
    const resp = await fetch(
      `https://api.github.com/users/${props.username}/followers`
    );
    const data = await resp.json();

    followers.value = data.length;
  } catch (err) {
    // TODO: Do something about this
    console.error(`Error fetching user data: ${err}`);
  }
}

// Fetch data whenever username changes
watch(
  () => props.username,
  () => {
    fetchFollowers();
    fetchFollowing();
    fetchBio();
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.profile {
  display: flex;
  padding: 1rem;
}

.left,
.right {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.left {
  align-items: start;
  justify-content: center;
}

.right {
  justify-content: start;
  align-items: right;
  gap: 1.6rem;
}

.username {
  font-size: 2rem;
  margin: 0;
}

.bio {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: color-mix(in srgb, var(--text) 60%, black 40%);
  font-style: italic;
}

.right h4 {
  font-size: 2rem;
  margin: 0;
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.right h4 span {
  background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
  width: 6rem;
  height: 2.3rem;
  display: grid;
  place-items: center;
  border-radius: 0.4rem;
}

img {
  height: 15rem;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-bottom: 0.8rem;
}
</style>

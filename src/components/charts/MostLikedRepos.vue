<template>
  <div class="repos">
    <div class="repo" v-for="(repo, index) in repos" :key="index">
      <span>
        <h4 class="name">{{ index + 1 }}. {{ repo.name }}</h4>
        <h5 class="description">
          {{ repo.description ? repo.description : 'No description' }}
        </h5>
      </span>

      <p class="stars">{{ repo.stargazers_count }} ⭐</p>
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

<style scoped>
.repos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.repo {
  display: flex;
  justify-content: space-between;
  height: 10rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: color-mix(in srgb, var(--bg) 75%, transparent);
  padding: 0 2rem;

  transition: scale 0.08s ease-in-out, filter 0.08s ease-in-out;
}

.repo:hover {
  scale: 1.02;
  filter: brightness(1.1);
}

.repo span {
  text-align: left;
  width: 33%;
}

.name {
  font-size: 1.2rem;
  margin-block: 1rem;
}

.description {
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  margin: 0;

  color: color-mix(in srgb, var(--text) 60%, black 40%);
}
</style>

<template>
  <div class="dashboard" id="dashboard">
    <h2 v-if="username">{{ username }}'s stats</h2>
    <h2 v-else>Enter your github username.</h2>
    <div class="content">
      <div class="most-used-langs card">
        <h3 class="card-title">Most used languages:</h3>

        <div class="chart">
          <MostUsedLanguages :username="username" />
        </div>
      </div>

      <div class="contributions card">
        <canvas>
          <p>Your browser doesn't support canvas element.</p>
        </canvas>
      </div>

      <div class="most-starred-repos card">
        <h3 class="card-title">Most liked repos:</h3>

        <div class="chart">
          <MostLikedRepos :username="username" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MostLikedRepos from './charts/MostLikedRepos.vue';
import MostUsedLanguages from './charts/MostUsedLanguages.vue';

const props = defineProps({
  username: String,
});
</script>

<style scoped>
.dashboard {
  text-align: center;
}

h2 {
  font-size: 5rem;
  font-weight: 900;
}

.card-title {
  font-size: 1.2rem;
  text-align: left;
}

.content {
  min-height: 90vh;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;
  padding-inline: 10rem;
  margin-bottom: 5rem;
}
.card {
  background-color: color-mix(in srgb, var(--secondary) 50%, transparent);
  backdrop-filter: blur(20px);
  border: 1px solid var(--bg); /* don't ask me why I'm using bg color for this */
  border-radius: 0.4rem;
  padding: 0.2rem 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: start;
  flex: 1 1 30%;
  min-width: 250px;
  max-width: 100%;
}

.most-used-langs {
  order: 1;
  aspect-ratio: 1;
}

.contributions {
  order: 2;
  flex: 2 1 60%;
}

.most-starred-repos {
  order: 3;
  flex: 1 1 100%;
}
</style>

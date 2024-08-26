<template>
  <div class="dashboard" id="dashboard">
    <h2 v-if="username">{{ username }}'s stats</h2>
    <h2 v-else>Enter your github username.</h2>
    <div class="content">
      <div class="most-used-langs card">
        <MostUsedLanguages :username="username" />
      </div>
      <div class="contributions card">
        <canvas>
          <p>Your browser doesn't support canvas element.</p>
        </canvas>
      </div>
      <div class="most-starred-repos card">
        <canvas>
          <p>Your browser doesn't support canvas element.</p>
        </canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
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

.content {
  min-height: 90vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3rem;
  padding-inline: 10rem;
  margin-bottom: 5rem;
}
.card {
  background-color: var(--secondary);
  border: 1px solid var(--bg); /* don't ask me why I'm using bg color for this */
  border-radius: 0.4rem;
}

.most-used-langs {
  grid-column: 1;
  grid-row: 1;
  aspect-ratio: 1;
}

.contributions {
  grid-column: 2 / span 2;
  grid-row: 1;
}

.most-starred-repos {
  grid-column: 1 / span 3; /* Span both columns */
  grid-row-start: 2;
}
</style>

<template>
  <div class="dashboard" id="dashboard">
    <h2 v-if="!username">Enter your github username.</h2>
    <div class="content">
      <div class="profile card">
        <h3 v-if="!username">Profile</h3>
        <UserProfile :username="username" />
      </div>
      <div class="most-used-langs card">
        <h3 class="card-title">Most used languages:</h3>

        <div class="chart">
          <MostUsedLanguages :username="username" />
        </div>
      </div>
      <div class="repos-type card">
        <h3 class="card-title">Types of repositories:</h3>

        <div class="chart">
          <ReposType :username="username" />
        </div>
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
import ReposType from './charts/ReposType.vue';
import UserProfile from './charts/UserProfile.vue';

const props = defineProps({
  username: String,
});
</script>

<style scoped>
.dashboard {
  text-align: center;
  width: 100%;
}

.card-title {
  font-size: 1.2rem;
  text-align: left;
}

.content {
  min-height: 90vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-inline: 10rem;
  margin-bottom: 5rem;
  width: 100%;
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
  min-height: 25rem;
}

.profile {
  grid-column: 1 / span 2;
}

.most-used-langs {
  aspect-ratio: 1;
  grid-column: 1 / span 1;
}

.repos-type {
  aspect-ratio: 1;
  grid-column: 2 / span 1;
}

.most-starred-repos {
  grid-column: 1 / span 2;

  order: 3;
  flex: 1 1 100%;
}

@media screen and (max-width: 600px) {
  .content {
    width: 100vw;
    grid-template-columns: 1fr;
    padding-inline: 0;
    justify-items: center;
  }

  .card {
    width: 90%;
  }

  .profile {
    grid-column: 1;
  }

  .most-used-langs {
    aspect-ratio: 1;
    grid-column: 1;
  }

  .repos-type {
    aspect-ratio: 1;
    grid-column: 1;
  }

  .most-starred-repos {
    grid-column: 1;

    order: 3;
    flex: 1 1 100%;
  }
}
</style>

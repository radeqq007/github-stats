<template>
  <div class="w-11/12 m-auto ">
    <h2 v-if="!username">Enter your github username.</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="w-full col-span-2 p-10 bg-gray-900 rounded-lg">
        <h3 v-if="!username">Profile</h3>
        <UserProfile class="" :username="username" />
      </div>
      <div class="bg-gray-900 rounded-lg px-10 py-5 flex flex-col gap-10">
        <h3 class="font-bold text-4xl text-center">Most used languages:</h3>

        <div class="chart">
          <MostUsedLanguages :username="username" />
        </div>
      </div>
      <div class="bg-gray-900 rounded-lg px-10 py-5 flex flex-col gap-10">
        <h3 class="font-bold text-4xl text-center">Types of repositories:</h3>

        <div class="chart">
          <ReposType :username="username" />
        </div>
      </div>

      <div class="col-span-2 flex flex-col gap-2">
        <h3 class="font-bold text-4xl text-center">Most liked repos:</h3>

        <div>
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
/* .dashboard {
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
  border: 1px solid var(--bg); 
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
} */
</style>

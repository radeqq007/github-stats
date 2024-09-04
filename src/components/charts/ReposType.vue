<template>
  <Doughnut v-if="isDataFetched" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';

const props = defineProps({
  username: String,
});

const chartData = ref({
  labels: [''],
  datasets: [
    {
      data: [0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

let isDataFetched = ref(false);

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

    const reposTypes = data.reduce((acc, repo) => {
      const type = repo.fork ? 'Forked' : 'Source';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    chartData.value.labels = Object.keys(reposTypes);
    chartData.value.datasets[0].data = Object.values(reposTypes);
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
<style scoped></style>

<template>
  <!-- WHY ISN'T THE CHART UPDATING I TRIED EVERYTHING SOMEBODY PLS HELP ME IVE TRIED FOR 3 DAYS STRAIGHT -->
  <Doughnut :data="chartData" :options="chartOptions" ref="chart" />
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { nextTick, ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';

const props = defineProps({
  username: String,
});

Chart.defaults.color = 'white';

const chart = ref(null);

const chartData = ref({
  labels: [''],
  datasets: [
    {
      data: [0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

async function fetchData() {
  if (!props.username) return;

  try {
    const resp = await fetch(
      `https://api.github.com/users/${props.username}/repos`
    );
    const data = await resp.json();

    const langCounts = {};

    data.forEach(repo => {
      if (repo.language) {
        if (langCounts[repo.language]) {
          langCounts[repo.language]++;
        } else {
          langCounts[repo.language] = 1;
        }
      }
    });

    chartData.value.labels = Object.keys(langCounts);
    chartData.value.datasets[0].data = Object.values(langCounts);
    console.log(chartData.value.labels);
    console.log(chartData.value.datasets[0].data);

    nextTick(() => {
      if (chart.value) {
        console.log(chart.value.chartInstance);
        chart.value.chartInstance.update();
      }
    });
  } catch (err) {
    // TODO: Do something about this
    console.error(`Error fetching user data: ${err}`);
  }
}

watch(
  () => props.username,
  newUsername => fetchData(newUsername),
  {
    immediate: true,
  }
);
</script>
<style scoped></style>

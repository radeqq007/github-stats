<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';

const props = defineProps({
  data: Array,
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

watch(
  () => props.data,
  async newData => {
    const langCounts = {};
    newData.forEach(repo => {
      if (repo.language) {
        if (langCounts[repo.language]) {
          langCounts[repo.language]++;
        } else {
          langCounts[repo.language] = 1;
        }
      }
    });

    chartData.value = {
      labels: Object.keys(langCounts),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: Object.values(langCounts),
        },
      ],
    };
  },
);
</script>

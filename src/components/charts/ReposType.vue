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

watch(
  () => props.data,
  () => {
    const reposTypes = props.data.reduce((acc, repo) => {
      const type = repo.fork ? 'Forked' : 'Source';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    chartData.value = {
      labels: Object.keys(reposTypes),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: Object.values(reposTypes),
        },
      ],
    };
  },
);
</script>

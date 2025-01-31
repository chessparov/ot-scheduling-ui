<script setup lang="ts">

import {computed} from "vue";

const props = defineProps(['series', 'labels', 'title', 'palette', 'legendPosition']);

const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
  },
  colors: props.palette,
  labels: props.labels,
  // title: {
  //   text: props.title,
  //   // floating: true,
  //   offsetY: 0,
  //   align: 'left',
  //   style: {
  //     color: '#444'
  //   }
  // },
  pie: {
    // offsetY: 100,
    height: 400

  },
  legend: {
    position: props.legendPosition > 1640 ? 'bottom' : 'right',
    // floating: true,
    show: true,
    height: props.legendPosition > 1640 ? 75 : undefined,
  },
  plotOptions: {
    pie: {
      customScale: 1,
      dataLabels: {
        minAngleToShowLabel: 10
      }
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 350
      },
      legend: {
        position: 'top',
        floating: true,
      }
    }
  }]
}))

</script>

<template>
  <apexchart type="pie" :options="chartOptions" :series="props.series"></apexchart>
</template>

<style scoped lang="scss">

</style>
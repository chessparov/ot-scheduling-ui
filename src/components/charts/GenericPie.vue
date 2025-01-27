<script setup lang="ts">

const props = defineProps(['series', 'labels', 'title', 'palette']);


const chartOptions = {
  chart: {
    width: 350,
    type: 'pie',
  },
  theme: {

  },
  colors: props.palette,
  labels: props.labels,
  title: {
    text: props.title,
    floating: true,
    offsetY: 0,
    align: 'right',
    style: {
      color: '#444'
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}

</script>

<template>
  <apexchart type="pie" width="350" :options="chartOptions" :series="props.series"></apexchart>
</template>

<style scoped lang="scss">

</style>
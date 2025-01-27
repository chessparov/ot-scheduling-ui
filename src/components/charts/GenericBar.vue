<script setup lang="ts">

const props = defineProps(['series', 'labels', 'title', 'palette']);


const chartOptions = {
  chart: {
    width: 650,
    type: 'bar',
    stacked: true,
  },
  theme: {
  },
  title: {
    text: props.title,
    floating: true,
    offsetY: 0,
    align: 'center',
    style: {
      color: '#444'
    }
  },
  colors: props.palette,
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 2,
      borderRadiusApplication: 'end', // 'around', 'end'
      borderRadiusWhenStacked: 'last', // 'all', 'last'
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 900
          }
        }
      }
    },
  },
  xaxis: {
    type: 'string',
    categories: props.labels,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 500
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}

</script>

<template>
  <apexchart type="bar" width="650" :options="chartOptions" :series="props.series"></apexchart>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">

import {computed} from "vue";

const props = defineProps(['series', 'labels', 'title', 'palette']);

const chartOptions = computed(() => ({
  chart: {
    height: 650,
    type: 'bar',
    stacked: true,
  },
  // title: {
  //   text: props.title,
  //   floating: true,
  //   offsetY: 0,
  //   align: 'center',
  //   style: {
  //     color: '#444'
  //   }
  // },
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
    labels: {
      rotate: -60,
      minHeight: 300,
      trim: false,
      style: {
        colors: [],
        fontSize: '11px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      },
    }
  },
  legend: {
    position: 'right',
    show: true,
    floating: true,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 500
      },
      legend: {
        show: false,
      }
    }
  }]
}));

</script>

<template>
  <apexchart type="bar" height="650" :options="chartOptions" :series="props.series"></apexchart>
</template>

<style scoped lang="scss">

</style>
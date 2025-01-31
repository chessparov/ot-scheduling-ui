<script setup lang="ts">

import {computed} from "vue";
import {max} from "d3";

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
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
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
  yaxis: {
    min: 0,
    max: function(max) { return max + 3 },
    tickAmount: 6,
    forceNiceScale: true,
    labels: {
      formatter: function(value: number) {
        return Number(value).toFixed(0);
      }
    }
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
    position: 'top',
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
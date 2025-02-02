<script setup lang="ts">

import {computed} from "vue";
import {useColors} from "vuestic-ui";

const props = defineProps(['series', 'labels', 'title', 'palette']);

const {currentPresetName} = useColors();

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
            // fontSize: '12px',
            // fontWeight: 900,
            color: currentPresetName.value === 'light' ? undefined : 'rgba(255,255,255,0.82)'
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
      style: {
        colors: currentPresetName.value === 'light' ? undefined : ['rgba(255,255,255,0.68)'],
      },
      formatter: function(value: number) {
        return Number(value).toFixed(0);
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
        colors: currentPresetName.value === 'light' ? undefined : 'rgba(255,255,255,0.94)',
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
    labels: {
      colors: currentPresetName.value === 'light' ? undefined : 'rgba(255,255,255,0.81)',
    }
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
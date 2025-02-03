<script setup lang="ts">

import * as d3 from "d3";

import {useScheduleStore} from "@/stores/global-store";
import {useColors} from "vuestic-ui";

const {currentPresetName} = useColors();

const arrLateSurgeries = useScheduleStore().scheduleReport["n_interventi_ritardo"]
const minLateSurgeries: number = Math.min(...arrLateSurgeries);
const maxLateSureries: number = Math.max(...arrLateSurgeries);

const histGenerator = d3.bin()
    .domain([minLateSurgeries, maxLateSureries])
    .thresholds(maxLateSureries - minLateSurgeries)

const bins = histGenerator(arrLateSurgeries);
const categories = () => {
  let arrCategories = [];
  for (let i = minLateSurgeries; i <= maxLateSureries; i++) {
    arrCategories.push(i);
  }
  return arrCategories
}

const binLength = () => {
  let arrBinLengths = [];
  for (let i = 0; i < (maxLateSureries - minLateSurgeries); i++) {
    arrBinLengths.push(bins[i].length);
  }
  return arrBinLengths
}

const series = [{
  name: 'Numero interventi in ritardo',
  data: binLength(),
}];

const chartOptions = {
  chart: {
    height: 350,
    type: 'bar',
    background: 'rgba(0, 0, 0, 0)',
  },
  theme: {
    mode: currentPresetName.value,
    monochrome: {
      enabled: true,
      color: '#ff826b',
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 1,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: currentPresetName.value === 'light' ? ["#304758"] : [undefined]
    }
  },
  xaxis: {
    title: {
      text: 'Numero interventi',
      style: {
        fontWeight: 'normal',
        fontSize: '14px',
      }
    },
    categories: categories(),
    position: 'bottom',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: true
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    min: 0,
    max: function(max) { return max + 30 },
    title: {
      text: 'Frequenza',
      style: {
        fontWeight: 'normal',
        fontSize: '14px',
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    }
  },
  title: {
    text: 'Numero di interventi in ritardo',
    floating: false,
    offsetY: 0,
    align: 'center',
    style: {
      // color: '#444',
      fontFamily: 'sans-serif'
    }
  }
}

</script>

<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</template>

<style scoped lang="scss">

</style>
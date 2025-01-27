<script setup lang="ts">

import * as d3 from "d3";
import {useScheduleStore} from "@/stores/global-store";
import {useColors} from "vuestic-ui";

const scale = defineModel()

const arrPctOnc = useScheduleStore().scheduleReport["pct_oncologici"].map((e: number) => {return e * 100})
const minPctOnc: number = Math.max(Math.min(...arrPctOnc) - 2, 0);
const maxPctOnc: number = Math.max(...arrPctOnc) + 2;

const arrNumOnc = useScheduleStore().scheduleReport["n_oncologici"];
const minNumOnc: number = Math.max(Math.min(...arrNumOnc) - 2, 0);
const maxNumOnc: number = Math.max(...arrNumOnc) + 2;

const histGenerator = scale.value === 'percentage' ? d3.bin()
        .domain([minPctOnc, maxPctOnc])
        .thresholds(maxPctOnc - minPctOnc)
    : d3.bin()
        .domain([minNumOnc, maxNumOnc])
        .thresholds(maxNumOnc - minNumOnc)

const bins = scale.value === 'percentage' ? histGenerator(arrPctOnc) : histGenerator(arrNumOnc);
const categories = () => {
  if (scale.value === 'percentage') {
    let arrCategories = [];
    for (let i = Math.round(minPctOnc); i <= maxPctOnc; i++) {
      arrCategories.push(i + "%");
    }
    return arrCategories
  }
  else {
    let arrCategories = [];
    for (let i = Math.round(minNumOnc); i <= maxNumOnc; i++) {
      arrCategories.push(i);
    }
    return arrCategories
  }
}

const binLength = () => {
  if (scale.value === 'percentage') {
    let arrBinLengths = [];
    for (let i = 0; i < (maxPctOnc - minPctOnc); i++) {
      arrBinLengths.push(bins[i].length);
    }
    return arrBinLengths
  }
  else {
    let arrBinLengths = [];
    for (let i = 0; i < (maxNumOnc - minNumOnc); i++) {
      arrBinLengths.push(bins[i].length);
    }
    return arrBinLengths
  }
}

const seriesName = scale.value === 'percentage' ? 'Percentuale di interventi oncologici ' : 'Numero di interventi oncologici'
const xAxisLabel = scale.value === 'percentage' ? 'Percentuale' : 'Numero interventi'
const titleLabel = scale.value === 'percentage' ? 'Percentuale di interventi oncologici' : 'Numero di interventi oncologici'

const {currentPresetName, getComputedColor} = useColors();

const series = [{
  name: seriesName,
  data: binLength(),
}];

const chartOptions = {
  chart: {
    height: 350,
    type: 'bar',
  },
  theme: {
    monochrome: {
      enabled: true,
      color: '#00cae4',
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
      colors: ["#304758"]
    }
  },
  xaxis: {
    title: {
      text: xAxisLabel,
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
    text: titleLabel,
    floating: true,
    offsetY: 0,
    align: 'center',
    style: {
      color: '#444'
    }
  }
}


</script>

<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</template>

<style scoped lang="scss">

</style>
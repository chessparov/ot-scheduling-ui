<script setup lang="ts">


import {useScheduleStore} from "@/stores/global-store";

const arrOnc: number[] = useScheduleStore().scheduleReport["n_oncologici"]
const arrInt: number[] = useScheduleStore().scheduleReport["n_interventi"]

const meanOnc = () => arrOnc.reduce((a: number, b: number) => a + b) / arrOnc.length
const meanInt = () => arrInt.reduce((a: number, b: number) => a + b) / arrInt.length


const series = [Math.round(meanOnc()), Math.round(meanInt() - meanOnc())];

const chartOptions = {
  chart: {
    width: 480,
    type: 'pie',
  },
  theme: {
    palette: 'palette6' // upto palette10
  },
  labels: ['Oncologici', 'Non oncologici'],
  title: {
    text: 'Composizione interventi',
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
  <apexchart type="pie" width="480" :options="chartOptions" :series="series"></apexchart>
</template>

<style scoped lang="scss">

</style>
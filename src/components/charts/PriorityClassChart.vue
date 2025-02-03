<script setup lang="ts">


import {useScheduleStore} from "@/stores/global-store";


const classiInterventi = [{
  name: 'Classe A',
  data: useScheduleStore().scheduleReport["a"]
},
  {
    name: 'Classe B',
    data: useScheduleStore().scheduleReport["b"]
  },
  {
    name: 'Classe C',
    data: useScheduleStore().scheduleReport["c"]
  }
]

const optionsClsseInterventi = {
  chart: {
    id: 'oncologici_reparto',
    stacked: true,
  },
  categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  title: { text: 'Numero interventi per classe' },
  colors: ['#2E93fA', '#ec0b0b', '#56ec0b', '#E91E63'],
  xaxis: {
    title: {
      text: 'N° corsa Montecarlo',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Numero interventi',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  }
}

</script>

<template>
  <apexchart height="100%" width="100%" type="bar" :options="optionsClsseInterventi" :series=classiInterventi></apexchart>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">

const optionsRepartiOncologici = {
  chart: {
    id: 'oncologici_reparto',
  },
  title: { text: 'Media percentuale oncologici in orario per reparto' },
  colors: ['#2E93fA', '#66DA26', '#eab149', '#E91E63'],
  plotOptions: {
    bar: {
      distributed: true,
    }
  },
  xaxis: {
    categories: ['Urologia 1', 'Ginecologia 2', 'Chirurgia generale', 'Endocrinochirurgia'],
    title: {
      text: 'Unità operativa',
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
      text: 'Percentuale [%]',
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
  <apexchart height="100%" width="100%" type="bar" :options="optionsRepartiOncologici" :series=repartiOncologici></apexchart>
</template>

<style scoped lang="scss">

</style>
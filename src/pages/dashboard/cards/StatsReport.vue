<script setup lang="ts">

const optionsInterventi = {
  chart: {
    id: 'interventi'
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
const optionsRitardi = {
  chart: {
    id: 'ritardi'
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
const optionsOncologici = {
  chart: {
    id: 'oncologici'
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
const optionsRepartiOncologici = {
  chart: {
    id: 'oncologici_reparto'
  },
  xaxis: {
    categories: ['Urologia 1', 'Ginecologia 2', 'Chirurgia generale', 'Endocrinochirurgia']
  }
}
const interventi = [{
  name: 'n_interventi',
  data: [130, 130, 128, 134, 127, 136, 131, 129, 134, 133]
}]
const ritardi = [{
  name: 'n_ritardi',
  data: [102, 104, 128, 99, 100, 95, 110, 108, 106, 104]
}]
const oncologici = [{
  name: '%_oncologici',
  data: [19, 24, 41, 13, 22, 31, 21, 18, 30, 18]
}]
const repartiOncologici = [{
  name: '%_oncologici_reparto',
  data: [60, 13, 27, 45]
}]
</script>

<template>
  <div class="" style="display: grid; grid-template-columns: auto auto;">
    <apexchart width="500" type="bar" :options="optionsInterventi" :series="interventi"></apexchart>
    <apexchart width="500" type="bar" :options="optionsRitardi" :series="ritardi"></apexchart>
    <apexchart width="500" type="bar" :options="optionsOncologici" :series="oncologici"></apexchart>
    <apexchart width="500" type="bar" :options="optionsRepartiOncologici" :series=repartiOncologici></apexchart>
  </div>
</template>

<style scoped lang="scss">

</style>
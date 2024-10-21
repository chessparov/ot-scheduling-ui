<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NewSchedule"
})
</script>

<template>
  <h1 class="h1">Nuova schedula</h1>
  <VaInput
      v-model="value"
      placeholder="Inserisci il nome della schedula"
      label="Nome schedula"
  />
  <VaSlider label="Montecarlo"
  />
  <VaButton>
    Ottieni schedula
  </VaButton>
</template>

<style scoped lang="scss">

</style>
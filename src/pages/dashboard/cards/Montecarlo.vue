<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Montecarlo",
  data() {
    return {
      scheduleName: "",
      cycles: 1000,
      date: new Date(),
    }
  }
})
</script>

<template>
  <VaCard class="w-full sm:w-[55%]">
    <VaCardContent>
      <section class="flex flex-col gap-4">
        <VaInput
            v-model="scheduleName"
            placeholder="Inserisci il nome della schedula"
            label="Nome schedula"
        />
        <VaDateInput
            v-model="date" />
        <div id="montecarlo" class="slider-wrapper">
          <VaSlider
              label="Montecarlo"
              v-model="cycles"
              :min=0
              :max=10000
              :readonly="false"
              style="flex-grow: 1; padding-right: 1%"
          />
          <span class="mb-2">
              {{ cycles }} Cicli
            </span>
        </div>
        <span>
            Numero di cicli consigliato: 1000
          </span>
        <VaButton>
          Ottieni schedula
        </VaButton>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<style lang="scss">
.slider-wrapper {
  display: flex 1;
  justify-content: space-between;
  padding: 1%;
}
</style>
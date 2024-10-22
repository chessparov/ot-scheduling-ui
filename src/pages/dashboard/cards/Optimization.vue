<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Optimization",
  data() {
    return {
      optTime: 60 * 2,
      optimization: false,
    }
  }
})
</script>

<template>
  <VaCard class="w-full sm:w-[45%]">
    <VaCardContent>
      <section class="flex flex-col gap-4">
        <VaSwitch
            v-model="optimization"
            label="Ottimizzazione"
        />
        <div class="slider-wrapper">
          <VaSlider
              label="Tempo di ottimizzazione"
              v-model="optTime"
              :min=0
              :max=1000
              :readonly="false"
              style="flex-grow: 1; padding-right: 1%"
          />
          <VaInput
              v-model="optTime"
              label="Secondi"
          />
          <span class="mb-2">
                 Secondi ({{ (optTime / 60).toFixed(1) }} minuti)
          </span>
        </div>
        <span>
          Tempo consigliato: 120 secondi
        </span>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="scss">

</style>
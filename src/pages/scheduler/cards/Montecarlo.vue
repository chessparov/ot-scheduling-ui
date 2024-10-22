<script lang="ts">
import {defineComponent} from 'vue'
import {VaCardContent} from "vuestic-ui";
import BindedSlider from "@/components/BindedSlider.vue";

export default defineComponent({
  name: "Montecarlo",
  components: {BindedSlider, VaCardContent},
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
            label="Data inizio schedulazione"
            v-model="date" />
        <BindedSlider
            :slider-label="'Montecarlo'"
            :slider-min="0"
            :slider-max="10000"
            :slider-value="cycles"
            :input-inner-label="'Cicli'"
        />
        <span>
            Numero di cicli consigliato: 1000
          </span>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="scss">

</style>
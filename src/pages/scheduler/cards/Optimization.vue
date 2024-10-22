<script lang="ts">
import {defineComponent} from 'vue'
import BindedSlider from "@/components/BindedSlider.vue";

export default defineComponent({
  name: "Optimization",
  components: {BindedSlider},
  data() {
    return {
      optTime: 60 * 2,
      optMinutes: (this.optTime / 60).toFixed(1),
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
        <BindedSlider
          :slider-label="'Tempo di ottimizzazione'"
          :slider-min="0"
          :slider-max="1000"
          :slider-value="optTime"
          :input-message="(this.optTime / 60).toFixed(1) + ' minuti'"
          :input-inner-label="'Secondi'"
        />
        <span>
          Tempo consigliato: 120 secondi
        </span>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="scss">

</style>
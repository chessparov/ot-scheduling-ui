<script lang="ts">
import { defineComponent } from "vue";
import BindedSlider from "@/components/BindedSlider.vue";
import RadarChart from "@/components/RadarChart.vue";

export default defineComponent({
  name: "Optimization",
  components: { RadarChart, BindedSlider },
  props: {
    optimization: Boolean,
  },
  data() {
    return {
      optTime: 60 * 2,
    };
  },
  methods: {
    getUpdatedValue(newValue: number) {
      this.optimization ? (this.optTime = newValue) : (this.optTime = 0);
      this.tabuTime();
    },
    tabuTime() {
      this.$emit("tabu-time", this.optTime);
    },
    timeConversion() {
      const minutes = Math.floor(this.optTime / 60).toString();
      const seconds = (this.optTime % 60).toString();

      return minutes + " min " + seconds + " secondi";
    },
  },
  mounted() {
    if (!this.optimization) {
      this.optTime = 0;
    }
  },
});
</script>

<template>
  <VaCard class="w-full sm:w-[45%]" :disabled="!optimization">
    <VaCardContent>
      <section class="flex flex-col gap-4">
        <label class="va-title" style="color: #154ec1; font-size: 16px">
          Ottimizzazione Tabù Search
        </label>
        <BindedSlider
          :disabled="!optimization"
          :slider-label="'Tempo di ottimizzazione'"
          :slider-min="0"
          :slider-max="1000"
          :slider-value="optTime"
          :input-message="timeConversion()"
          :input-inner-label="'Secondi'"
          @update="getUpdatedValue"
        />
        <span> Tempo consigliato: 120 secondi </span>
        <RadarChart />
      </section>
    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="scss"></style>

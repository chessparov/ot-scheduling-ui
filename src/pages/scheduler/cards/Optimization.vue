<script lang="ts">
import {defineComponent} from 'vue'
import BindedSlider from "@/components/BindedSlider.vue";
import RadarChart from "@/components/RadarChartPicker.vue";


export default defineComponent({
  name: "Optimization",
  components: {RadarChart, BindedSlider},
  props: {
    optimization: Boolean,
    tbTime: Number,
  },
  data() {
    return {
      optTime: this.tbTime,
    }
  },
  methods: {
    getUpdatedValue(newValue: number) {
      this.optimization ? this.optTime = newValue : this.optTime = 0;
      this.tabuTime()
    },
    tabuTime() {
      this.$emit("tabu-time", this.optTime);
    },
    timeConversion() {
      const minutes = Math.floor(this.optTime / 60).toString();
      const seconds = (this.optTime % 60).toString();

      return minutes !== '0' ? minutes + ' min ' + seconds + ' secondi' : seconds + ' secondi';
    }
  },
  mounted() {
    if (!this.optimization) {
      this.optTime = 0;
    }
  },
})
</script>

<template>
  <VaCard :disabled="!optimization">
    <VaCardContent>
      <section class="flex flex-col gap-4" >
        <label class="va-title" style="color: #154EC1; font-size: 16px">
          Ottimizzazione Tabù Search
        </label>
        <BindedSlider
            :disabled="!optimization"
            :slider-label="'Tempo di ottimizzazione'"
            :slider-min="1"
            :slider-max="1000"
            :slider-value="optTime"
            :input-message="timeConversion()"
            :input-inner-label="'Secondi'"
            @update="getUpdatedValue"
        />
        <span>
          Tempo consigliato: 120 secondi
        </span>
        <RadarChart/>
      </section>

    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="scss">



</style>
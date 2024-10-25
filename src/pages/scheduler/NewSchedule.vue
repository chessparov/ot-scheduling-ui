<script lang="ts">
import { defineComponent } from "vue";
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";
import Constraints from "@/pages/scheduler/cards/Constraints.vue";

export default defineComponent({
  name: "NewSchedule",
  components: { Constraints, Launch, Montecarlo, Optimization },
  data() {
    return {
      optimization: false,
      mcCycles: 1000,
      tabuTime: 120,
    };
  },
  methods: {
    optStatus(updatedOptimization: boolean) {
      this.optimization = updatedOptimization;
    },
    getTabuTime(tabu: number) {
      if (typeof (tabu == !"undefined")) {
        if (isNaN(tabu)) {
          this.tabuTime = 0;
        } else {
          this.tabuTime = tabu;
        }
      }
    },
    getMcCycles(mc: number) {
      if (typeof (mc == !"undefined")) {
        if (isNaN(mc)) {
          this.mcCycles = 0;
        } else {
          this.mcCycles = mc;
        }
      }
    },
  },
});
</script>

<template>
  <h1 class="h1">Nuova schedula</h1>
  <div class="flex flex-col md:flex-col gap-2">
    <div class="flex flex-col md:flex-row gap-2">
      <Montecarlo
        :upload="true"
        :toggle-optimization="true"
        @toggle-status="optStatus"
        @mc-cycles="getMcCycles"
      />
      <Optimization
        @tabu-time="getTabuTime"
        :optimization="this.optimization"
      />
    </div>
    <Constraints />
    <Launch :mc-cycles="this.mcCycles" :tabu-time="this.tabuTime" />
  </div>
</template>

<style scoped lang="scss"></style>

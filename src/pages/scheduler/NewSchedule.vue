<script lang="ts">
import {defineComponent, ref} from 'vue'
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";
import Constraints from "@/pages/scheduler/cards/Constraints.vue";
import {VaFile} from "vuestic-ui";

export default defineComponent({
  name: "NewSchedule",
  components: {Constraints, Launch, Montecarlo, Optimization},
  data() {
    return {
      name: '',
      startDate: new Date(),
      optimization: false,
      mcCycles: 1000,
      tabuTime: 120,
      files: [] as VaFile[],
    }
  },
  methods: {
    getTabuTime(tabu: number) {
      if (typeof(tabu ==! 'undefined')) {
        if (isNaN(tabu)) {
          this.tabuTime = 0;
        } else {
          this.tabuTime = tabu;
        }
      }
    },
    getMcCycles(mc: number) {
      if (typeof(mc ==! 'undefined')) {
        if (isNaN(mc)) {
          this.mcCycles = 0;
        }
        else {
          this.mcCycles = mc;
        }
      }
    },
  }
})
</script>

<template>
  <h1 class="h1">Nuova schedula</h1>
  <div class="flex flex-col md:flex-col gap-2">
    <div class="flex flex-col md:flex-row gap-2">
      <Montecarlo
          class="w-full md:w-[55%]"
          v-model:name="name"
          v-model:start-date="startDate"
          v-model:files.allowSingleFile="files"
          v-model:optimization="optimization"
          :upload="true"
          @mc-cycles="getMcCycles"
      />
      <Optimization
          class="w-full md:w-[45%]"
          @tabu-time="getTabuTime"
          :optimization="optimization"
      />
    </div>
    <Constraints/>
    <Launch
        :name="name"
        :start-date="startDate"
        :optimization="optimization"
        :mc-cycles="mcCycles"
        :tabu-time="tabuTime"
        :files="files"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
<script lang="ts">
import {defineComponent, ref} from 'vue'
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";
import Constraints from "@/pages/scheduler/cards/Constraints.vue";
import {VaFile} from "vuestic-ui";
import {useGlobalStore} from "@/stores/global-store";

export default defineComponent({
  name: "NewSchedule",
  components: {Constraints, Launch, Montecarlo, Optimization},
  data() {
    return {
      name: '',
      startDate: new Date(),
      optimization: false,
      files: [] as VaFile[],
      globalStore: useGlobalStore(),
      mcCycles: useGlobalStore().montecarloDefault as number,
      tabuTime: useGlobalStore().tabuTimeDefault as number,
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
          this.mcCycles = 1;
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
  <div class="flex flex-col gap-2">
    <VaAlert
        v-if="startDate.getDay() !== 1"
        color="warning"
        closeable
        class="w-full"
        style="margin-top: 0.5rem; margin-bottom: 0.5rem"
    >
      Attenzione! La data di inizio schedulazione selezionata non è un lunedì.
    </VaAlert>
    <div class="flex flex-col lg:flex-row gap-2">
      <Montecarlo
          class="w-full lg:w-[55%]"
          v-model:name="name"
          v-model:start-date="startDate"
          v-model:files.allowSingleFile="files"
          v-model:optimization="optimization"
          :show-toggle="true"
          :upload="true"
          :cycles="mcCycles"
          @mc-cycles="getMcCycles"
      />
      <Optimization
          class="w-full lg:w-[45%]"
          @tabu-time="getTabuTime"
          :optimization="optimization"
          :tb-time="tabuTime"
      />
    </div>
    <Constraints/>
    <Launch
        :name="name"
        :start-date="startDate"
        :optimization="optimization"
        :files-waiting-list="files"
        :analyzer="false"
        :mc-cycles="this.mcCycles"
        :tabu-time="this.tabuTime"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
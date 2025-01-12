<script lang="ts">

import {useScheduleStore} from "@/stores/global-store";
import {ref} from "vue";

export default {
  data() {
    return {
      mc_results: useScheduleStore().scheduleNote,
      scheduleData: useScheduleStore().scheduleData,
      currentTab: "pe",
      tabs: ["pe", "pne"],
      tabNames: {"pe": "Pazienti eletti", "pne": "Pazienti non eletti"},
      colNames: {
        "pe": [
          "Data Intervento",
          "Data Prenot.",
          "due date",
          "Ritardo",
          "Priorità",
          "Cod. Int.",
          "Cod. Diagn.",
          "Tempo Intervento",
          "ID Percorso",
        ],
        "pne": [
          "Data Prenot.",
          "due date",
          "Priorità",
          "Cod. Int.",
          "Cod. Diagn.",
          "ID Percorso",
        ]
      },
      currentNota: 0,
    }
  }
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <VaTabs v-model="currentTab">
      <template #tabs>
        <VaTab
            v-for="tab in tabs"
            :key="tab"
            :name="tab"
        >
          {{ tabNames[tab] }}
        </VaTab>
      </template>
    </VaTabs>
    <VaDataTable
        sticky-header
        striped
        :columns="colNames[currentTab]"
        :items="mc_results[currentTab][currentNota]"
        height="500px"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
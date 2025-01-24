<script setup lang="ts">

import {defineVaDataTableColumns, VaCollapse, VaDataTable} from "vuestic-ui";
import {PropType, toRaw} from "vue";
import {dateParser, timeParser} from "@/services/utils";
import {useScheduleStore} from "@/stores/global-store";
import SurgeriesCountChart from "@/components/charts/SurgeriesCountChart.vue";
import LateSurgeriesCount from "@/components/charts/LateSurgeriesCount.vue";
import DelayCountChart from "@/components/charts/MeanDelayChart.vue";
import OncPercentageCharts from "@/components/charts/OncPercentageCharts.vue";
import OncPercentageOnTimeChart from "@/components/charts/OncPercentageOnTimeChart.vue";
import OncCountChart from "@/components/charts/OncCountChart.vue";

const props = defineProps({
  riepilogo: {
    type: Object as PropType<Record<string, any>>,
    required: true
  },
  modified: {
    type: Boolean,
    required: true
  }
})

const nInterventiOnc = useScheduleStore().scheduleReport["n_oncologici"]
const nInterventiOncOrario = useScheduleStore().scheduleReport["n_oncologici_orario"]
const classiA = useScheduleStore().scheduleReport["a"]
const classiB = useScheduleStore().scheduleReport["b"]
const classiC = useScheduleStore().scheduleReport["c"]
const ritMedioLog = useScheduleStore().scheduleReport["rit_medio_log"]


const riepilogoData = [
  {Parametri_: 'Corse Montecarlo', valore: props.riepilogo.mcCycles,
    Dettagli: 'Data esecuzione', valore_: dateParser(props.riepilogo.creationDate)},
  {Parametri_: 'Ottimizzazione', valore: props.riepilogo.optimization ? 'Sì' : 'No',
    Dettagli: 'Tempo di calcolo', valore_: timeParser(props.riepilogo.computationTime)},
  {Parametri_: 'Tempo ottimizzazione [s]', valore: props.riepilogo.tabuTime,
    Dettagli: 'Autore', valore_:  props.riepilogo.author},
  {Parametri_: 'Alpha', valore: props.riepilogo.alpha, Dettagli:'', valore_: ''},
  {Parametri_: 'Beta', valore: props.riepilogo.beta, Dettagli:'', valore_: ''},
  {Parametri_: 'Epsilon', valore: props.riepilogo.epsilon, Dettagli:'', valore_: ''},
  {Parametri_: 'Theta', valore: props.riepilogo.theta, Dettagli:'', valore_: ''},
]

const columns =  defineVaDataTableColumns([
  { label: 'Parametri', key: 'Parametri_', sortable: false },
  { label: 'Valore', key: 'valore', sortable: false },
  { label: 'Dettagli', key: 'Dettagli', sortable: false },
  { label: 'Valore', key: 'valore_', sortable: false },
])

let firstCollapse = true;
</script>

<template>
  <div class="flex flex-col gap-4">
    <VaAlert
        v-model="props.modified"
        color="warning"
        closeable
        class="w-full"
        style="margin-bottom: 0.5rem"
    >
      Attenzione! La schedula è stata modificata, i dati e le statistiche non sono più aggiornati. Ripetere la simulazione.
    </VaAlert>
    <VaCollapse header="Riepilogo" v-model="firstCollapse">

      <div class="flex flex-col md:flex-row gap-4">
          <VaDataTable
              style="--va-data-table-thead-font-size: 0.5rem; --va-data-table-height: 100%; font-size: 0.8rem"
              :columns="columns"
              :items="riepilogoData"
              class="w-1 md:w-2/3"
          />
      </div>
    </VaCollapse>
    <VaCollapse header="Statistiche Montecarlo">
      <div class="flex flex-col overflow-hidden">
        <div style="min-height: 400px">
          <SurgeriesCountChart/>
        </div>
        <div style="min-height: 400px">
          <LateSurgeriesCount/>
        </div>
        <div style="min-height: 400px">
          <DelayCountChart/>
        </div>
        <div style="min-height: 400px">
          <OncPercentageCharts/>
        </div>
        <div style="min-height: 400px">
          <OncPercentageOnTimeChart/>
        </div>
      </div>
    </VaCollapse>
    <VaCollapse header="Statistiche globali">
    <div class="flex flex-col md:flex-row gap-4 overflow-hidden" style="justify-content: space-between">
      <div class="w-full md:w-1/2" style="min-height: 400px">
        <OncCountChart/>
      </div>
      <div class="w-full md:w-1/2" style="min-height: 300px">
      </div>
    </div>
    </VaCollapse>
  </div>
</template>

<style scoped lang="scss">
.list__item {
  margin: 1rem;
}
</style>
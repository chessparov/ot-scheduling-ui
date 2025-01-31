<script setup lang="ts">

import {defineVaDataTableColumns, VaCollapse, VaDataTable} from "vuestic-ui";
import {PropType, ref, toRaw} from "vue";
import {dateParser, timeParser} from "@/services/utils";
import {useScheduleStore} from "@/stores/global-store";
import SurgeriesCountChart from "@/components/charts/SurgeriesCountChart.vue";
import LateSurgeriesCount from "@/components/charts/LateSurgeriesCount.vue";
import DelayCountChart from "@/components/charts/MeanDelayChart.vue";
import OncPercentageCharts from "@/components/charts/OncPercentageCharts.vue";
import OncPercentageOnTimeChart from "@/components/charts/OncPercentageOnTimeChart.vue";
import OncCountChart from "@/components/charts/OncCountChart.vue";
import NotaStats from "@/pages/dashboard/components/NotaStats.vue";
import {time} from "ionicons/icons";

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
const { scheduleReport } = useScheduleStore()
const nInterventi = scheduleReport["n_interventi"]
const nInterventiRitardo = scheduleReport["n_interventi_ritardo"]
const nInterventiOnc = scheduleReport["n_oncologici"]
const pctInterventiOnc = scheduleReport["pct_oncologici"].map((e: number) => {return e * 100})
const nInterventiOncOrario = scheduleReport["n_oncologici_orario"]
const pctInterventiOncOrario = scheduleReport["pct_oncologici_orario"].map((e: number) => {return e * 100})
const classiA = scheduleReport["a"]
const classiB = scheduleReport["b"]
const classiC = scheduleReport["c"]
const classiD = scheduleReport["d"]
const ritMedio = scheduleReport["rit_medio"]
const ritMedioLog = scheduleReport["rit_medio_log"]


const paramsData = [
  {Parametri_: 'Corse Montecarlo', valore: props.riepilogo.mcCycles},
  {Parametri_: 'Ottimizzazione', valore: props.riepilogo.optimization ? 'Sì' : 'No'},
  {Parametri_: 'Tempo ottimizzazione [s]', valore: props.riepilogo.tabuTime},
  {Parametri_: '\u03B1', valore: props.riepilogo.alpha},
  {Parametri_: '\u03B2', valore: props.riepilogo.beta},
  {Parametri_: '\u03B5', valore: props.riepilogo.epsilon},
  {Parametri_: '\t\u03B8', valore: props.riepilogo.theta},
];

const getMean = (arr: []) => {
  return Number((arr.reduce((a, b) => a + b) / arr.length).toFixed(2))
}
const getMedian = (arr: []) => {
  return Number(arr.sort()[Math.floor((arr.length - 1) / 2)].toFixed(2))
}
const riepilogoData = [
  {stats: 'Numero di interventi', mean: getMean(nInterventi), median: getMedian(nInterventi)},
  {stats: 'Numero di interventi in ritardo', mean: getMean(nInterventiRitardo), median: getMedian(nInterventiRitardo)},
  {stats: 'Ritardo medio', mean: getMean(ritMedio), median: getMedian(ritMedio)},
  {stats: 'Ritardo medio logaritmico', mean: getMean(ritMedioLog), median: getMedian(ritMedioLog)},
  {stats: 'Numero di interventi oncologici', mean: getMean(nInterventiOnc), median: getMedian(nInterventiOnc)},
  {stats: 'Percentuale di interventi oncologici', mean: getMean(pctInterventiOnc) + '%', median: getMedian(pctInterventiOnc) + '%'},
  {stats: 'Numero di interventi oncologici in orario', mean: getMean(nInterventiOncOrario), median: getMedian(nInterventiOncOrario)},
  {stats: 'Percentuale di interventi oncologici in orario', mean: getMean(pctInterventiOncOrario) + '%', median: getMedian(pctInterventiOncOrario) + '%'},
  {stats: 'Numero di classi A', mean: getMean(classiA), median: getMedian(classiA)},
  {stats: 'Numero di classi B', mean: getMean(classiB), median: getMedian(classiB)},
  {stats: 'Numero di classi C', mean: getMean(classiC), median: getMedian(classiC)},
  {stats: 'Numero di classi D', mean: getMean(classiD), median: getMedian(classiD)},
];

const columns1 =  defineVaDataTableColumns([
  { label: 'Parametro', key: 'Parametri_', sortable: false, },
  { label: 'Valore', key: 'valore', sortable: false },
]);
const columns2 =  defineVaDataTableColumns([
  { label: 'Indicatore', key: 'stats', sortable: false, width: '40%'},
  { label: 'Media', key: 'mean', sortable: false },
  { label: 'Mediana', key: 'median', sortable: false },
]);

let firstCollapse = true;

const percent = ref('numeric');
const optionsOnlyIcons =  [
  { value: "numeric", icon: "123" },
  { value: "percentage", iconRight: "percent"},
];


</script>

<template>
  <div class="flex flex-col gap-4">
    <VaAlert
        v-if="props.modified"
        color="warning"
        closeable
        class="w-full"
        style="margin-bottom: 0.5rem"
    >
      Attenzione! La schedula è stata modificata, i dati e le statistiche non sono più aggiornati. Ripetere la simulazione.
    </VaAlert>
    <VaCollapse header="Riepilogo" v-model="firstCollapse">
      <div class="flex flex-col md:flex-row gap-4 justify-between">
        <VaCard
            tag="a"
            gradient
            class="md:min-w-[30%]"
        >
          <VaCardContent>
            <div class="flex flex-row gap-2" style="font-size: 13px">
              <div class="flex flex-col gap-2 card" style="font-weight: bold;">
                <span>Data Creazione</span>
                <span>Autore</span>
                <span>Tempo di calcolo</span>
              </div>
              <div class="flex flex-col gap-2 card">
                <span>{{dateParser(props.riepilogo.creationDate)}}</span>
                <span>{{props.riepilogo.author}}</span>
                <span>{{timeParser(props.riepilogo.computationTime)}}</span>
              </div>
            </div>
          </VaCardContent>
        </VaCard>
        <VaDataTable
            class="table-1 md:max-w-[60%] md:mr-[1%]"
            style="font-size: 13px;"
            :columns="columns1"
            :items="paramsData"
            striped
        />
      </div>
    </VaCollapse>
    <VaCollapse header="Statistiche Globali">
      <div class="flex flex-col overflow-hidden">
        <VaDataTable
            class="table-2"
            style="font-size: 13px;"
            :columns="columns2"
            :items="riepilogoData"
            striped
        />
        <div class="flex flex-col gap-4 md:flex-row" style="min-height: 400px">
          <SurgeriesCountChart class="md:w-1/2"/>
          <LateSurgeriesCount class="md:w-1/2"/>
        </div>
        <div style="min-height: 400px">
          <DelayCountChart/>
        </div>
        <VaButtonToggle
            preset="secondary"
            border-color="rgba(238, 238, 238, 0.4)"
            class="mb-6"
            size="large"
            v-model="percent"
            :options="optionsOnlyIcons"
        />
        <div class="flex flex-col gap-4 md:flex-row" style="min-height: 400px" :key="percent">
          <OncPercentageCharts class="md:w-1/2" v-model="percent"/>
          <OncPercentageOnTimeChart class="md:w-1/2" v-model="percent"/>
        </div>
      </div>
    </VaCollapse>
    <VaCollapse header="Statistiche Nota Operatoria">
      <NotaStats/>
    </VaCollapse>
  </div>
</template>

<style scoped lang="scss">
.list__item {
  margin: 1rem;
}
.table-1 {
  width: 100%;
  @media (min-width: 1440px) {
    width: 100%;
  }
}

.table-2 {
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  @media (min-width: 1440px) {
    width: 100%;
  }
  ::v-deep(tr) {
    border-bottom: 1px solid var(--va-background-border);

    td {
    }
  }
}
.card {
  width: 50%;
}
</style>
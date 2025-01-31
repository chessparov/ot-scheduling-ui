<script setup lang="ts">

import {computed, onBeforeMount, onMounted, ref, toRaw, watch} from "vue";
import GenericPie from "@/components/charts/GenericPie.vue";
import GenericBar from "@/components/charts/GenericBar.vue";
import axios from "axios";
import {useScheduleStore} from "@/stores/global-store";
import {defineVaDataTableColumns, useToast, VaCollapse, VaDataTable} from "vuestic-ui";

const {notify} = useToast();

const loading = ref(true);
const nota = ref('nota1');
const optionsNote = [
  {value: 'nota1', label: 'Nota 1'},
  {value: 'nota2', label: 'Nota 2'},
  {value: 'nota3', label: 'Nota 3'}
]
const data = ref({});

const statType = ref('interventiOrario');
const statList = [
  {value: 'interventiOrario', text: 'Interventi in orario'},
  {value: 'interventiOnc', text: 'Interventi oncologici'},
  {value: 'interventiOncOrario', text: 'Interventi oncologici in orario'},
  {value: 'classe', text: 'Classe di priorità'},
  {value: 'pngla', text: 'PNE/PNGLA'},
  {value: 'pnglaOrario', text: 'PNE/PNGLA in orario'},
];
const columns =  defineVaDataTableColumns([
  { label: 'Statistica', key: 'stats', sortable: false, style: "color: black", width: '70%' },
  { label: 'Valore', key: 'value_', sortable: false},
]);
const titleOptions = {
  'interventiOrario': 'Interventi in orario',
  'interventiOnc': 'Interventi oncologici',
  'interventiOncOrario': 'Interventi oncologici in orario',
  'classe': 'Interventi per classe di priorità',
  'pngla': 'Interventi PNE/PNGLA',
  'pnglaOrario': 'Interventi PNE/PNGLA in orario'
}
;

const riepilogoData = ref([]);
const palette = ref(['#154ec1', '#00cae4', '#50eca6', '#c050ec']);

const getMean = (arr: []) => {
  return Number((arr.reduce((a, b) => a + b) / arr.length).toFixed(2))
};
const { scheduleReport } = useScheduleStore()
// Medie con cui confrontare i valori per lo styling condizionale
const meanData = {
  'Numero di interventi': getMean(scheduleReport["n_interventi"]),
  'Numero di interventi in ritardo': getMean(scheduleReport["n_interventi_ritardo"]),
  'Ritardo medio [giorni]': getMean(scheduleReport["rit_medio"]),
  'Ritardo medio logaritmico': getMean(scheduleReport["rit_medio_log"]),
  'Numero di interventi oncologici': getMean(scheduleReport["n_oncologici"]),
  'Percentuale di interventi oncologici': getMean(scheduleReport["pct_oncologici"].map((e: number) => {
      return e * 100
    })),
  'Numero di interventi oncologici in orario': getMean(scheduleReport["n_oncologici_orario"]),
  'Percentuale di interventi oncologici in orario': getMean(scheduleReport["pct_oncologici_orario"].map((e: number) => {
      return e * 100
    })),
  'Numero di classi A': getMean(scheduleReport["a"]),
  'Numero di classi B': getMean(scheduleReport["b"]),
  'Numero di classi C': getMean(scheduleReport["c"]),
  'Numero di classi D': getMean(scheduleReport["d"]),
};


const getCellBind = (cell, row, column) => {
  let name = row.stats;
  let value = row.value_;
  let target = meanData[name];
  if (typeof value === "string") {
    value = Number(value.replace('%', ''))
  }
  if (name == 'Ritardo medio [giorni]' || name == 'Ritardo medio logaritmico') {
    value = - value;
    target = - target;
  }
  if (target < value) {
      return {
        style: {color: "#107810"},
      };
  }
  else if (target > value) {
    return {
      style: {color: "#f30404"},
    }
  }
  else if (target == value) {
    return {
      style: {color: "#000000"},
    }
  }
}
const labelsPie = {
  'interventiOrario': ["Interventi in ritardo", "Interventi in orario"],
  'interventiOnc': ["Interventi oncologici", "Interventi non oncologici"],
  'interventiOncOrario': ["Interventi oncologici in ritardo", "Interventi oncologici in orario"],
  'classe': ["A", "B", "C", "D"],
  'pngla': ["Interventi PNE/PNGLA", "Interventi non PNE/PNGLA"],
  'pnglaOrario': ["Interventi PNE/PNGLA in ritardo", "Interventi PNE/PNGLA in orario"]
};
const dictSeriesPie = ref([]);
const labelsBar = ref([]);
const dictSeriesBar = ref([]);

const unpackDict = (dictionary) => {
  const values: [] = Object.keys(dictionary).map(function(key) {
    return dictionary[key];
  })
  return values
};

const computedSeriesPie = computed(() =>
    statType.value && dictSeriesPie.value[statType.value] ? dictSeriesPie.value[statType.value] : []
);
const computedLabelsPie = computed(() =>
    statType.value && labelsPie[statType.value] ? labelsPie[statType.value] : []
);
const computedSeriesBar = computed(() =>
    statType.value && dictSeriesBar.value[statType.value] ? dictSeriesBar.value[statType.value] : []
);
const computedLabelsBar = computed(() =>
    statType.value && labelsBar.value[statType.value] ? labelsBar.value[statType.value] : []
);
const computedTitle = computed(() =>
      statType.value && titleOptions[statType.value] ? titleOptions[statType.value] : ""
);

const requestStats = async () => {

  const { scheduleId } = useScheduleStore();
  const pk = scheduleId;
  const index = nota.value;
  loading.value = true;

  await axios
      .get(axios.defaults.baseURL + '/api/scheduler/nota-stats/' + pk + '/' + index)
      .then((res) => {
        riepilogoData.value = [
          {stats: 'Numero di interventi', value_: res.data.n_interventi,},
          {stats: 'Numero di interventi in ritardo', value_: res.data.n_interventi_ritardo},
          {stats: 'Ritardo medio [giorni]', value_: res.data.rit_medio.toFixed(2)},
          {stats: 'Ritardo medio logaritmico', value_: res.data.rit_medio_log.toFixed(2)},
          {stats: 'Numero di interventi oncologici', value_: res.data.n_oncologici},
          {stats: 'Percentuale di interventi oncologici', value_: (res.data.pct_oncologici * 100).toFixed(2) + "%"},
          {stats: 'Numero di interventi oncologici in orario', value_: res.data.n_oncologici_orario},
          {stats: 'Percentuale di interventi oncologici in orario', value_: (res.data.pct_oncologici_orario * 100).toFixed(2) + "%"},
          {stats: 'Numero di interventi di classe A', value_: res.data.a},
          {stats: 'Numero di interventi di classe B', value_: res.data.b},
          {stats: 'Numero di interventi di classe C', value_: res.data.c},
          {stats: 'Numero di interventi di classe D', value_: res.data.d},
        ];
        dictSeriesPie.value = {
          'interventiOrario': [res.data.n_interventi_ritardo, res.data.n_interventi - res.data.n_interventi_ritardo],
          'interventiOnc': [res.data.n_oncologici, res.data.n_interventi - res.data.n_oncologici],
          'interventiOncOrario': [res.data.n_oncologici - res.data.n_oncologici_orario, res.data.n_oncologici_orario],
          'classe': [res.data.a, res.data.b, res.data.c, res.data.d],
          'pngla': [
              unpackDict(res.data.interventi_pngla).reduce((a, b) => a + b, 0),
              unpackDict(res.data.interventi_non_pngla).reduce((a, b) => a + b, 0)
          ],
          'pnglaOrario': [
              unpackDict(res.data.interventi_pngla_ritardo).reduce((a, b) => a + b, 0),
              unpackDict(res.data.interventi_pngla_orario).reduce((a, b) => a + b, 0)
          ],
        };
        labelsBar.value = {
          'interventiOrario': Object.keys(res.data.interventi_per_reparto_orario),
          'interventiOnc': Object.keys(res.data.interventi_onc_per_reparto),
          'interventiOncOrario': Object.keys(res.data.interventi_onc_per_reparto_ritardo),
          'classe': Object.keys(res.data.interventi_a_per_reparto),
          'pngla': Object.keys(res.data.interventi_pngla),
          'pnglaOrario': Object.keys(res.data.interventi_pngla_orario)
        }
        dictSeriesBar.value = {
          'interventiOrario': [
            {name: "Interventi in ritardo", data: unpackDict(res.data.interventi_per_reparto_ritardo)},
            {name: "Interventi in orario", data: unpackDict(res.data.interventi_per_reparto_orario)},
          ],
          'interventiOnc': [
            {name: "Interventi oncologici", data: unpackDict(res.data.interventi_onc_per_reparto)},
            {name: "Interventi non oncologici", data: unpackDict(res.data.interventi_non_onc_per_reparto)},
          ],
          'interventiOncOrario': [
            {name: "Interventi oncologici in ritardo", data: unpackDict(res.data.interventi_onc_per_reparto_ritardo)},
            {name: "Interventi oncologici in orario", data: unpackDict(res.data.interventi_onc_per_reparto_orario)}
          ],
          'classe': [
            {name: "Interventi di classe A", data: unpackDict(res.data.interventi_a_per_reparto)},
            {name: "Interventi di classe B", data: unpackDict(res.data.interventi_b_per_reparto)},
            {name: "Interventi di classe C", data: unpackDict(res.data.interventi_c_per_reparto)},
            {name: "Interventi di classe D", data: unpackDict(res.data.interventi_d_per_reparto)},
          ],
          'pngla': [
            {name: "Interventi PNE/PNGLA", data: unpackDict(res.data.interventi_pngla)},
            {name: "Interventi non PNE/PNGLA", data: unpackDict(res.data.interventi_non_pngla)}
          ],
          'pnglaOrario': [
            {name: "Interventi PNE/PNGLA in ritardo", data: unpackDict(res.data.interventi_pngla_ritardo)},
            {name: "Interventi PNE/PNGLA in orario", data: unpackDict(res.data.interventi_pngla_orario)}
          ],
        };
        loading.value = false;
      })
      .catch((error) => {
        console.log(error)
          notify({
            message: 'Errore lato server',
            color: 'danger'
          })
      })
}

watch(nota, () => {
  requestStats();
})

onMounted(() => {requestStats();});

</script>

<template>
  <div class="flex flex-col gap-2 overflow-hidden" >
    <VaButtonToggle
        preset="secondary"
        border-color="primary"
        class="mb-6"
        size="medium"
        v-model="nota"
        :options="optionsNote"
    />
    <VaCollapse header="Riepilogo nota">
      <VaDataTable
          class=""
          style="font-size: 13px;"
          :columns="columns"
          :items="riepilogoData"
          :loading="loading"
          :cell-bind="getCellBind"
          striped
      />
    </VaCollapse>
    <VaCardTitle style="font-size: 1rem; margin: 0 auto auto;">{{computedTitle}}</VaCardTitle>
    <div class="flex flex-col stat-wrapper gap-0" >
      <div class="flex flex-row pie-wrapper" >
        <VaOptionList
            v-model="statType"
            :options="statList"
            value-by="value"
            type="radio"
            style="--va-option-list-line-height: 3rem; font-weight: bold;"
        />
        <VaInnerLoading class="pie" :loading="loading">
          <GenericPie v-if="computedSeriesPie.length" :series="computedSeriesPie" :labels="computedLabelsPie" :title="computedTitle" :palette="palette"/>
        </VaInnerLoading>
      </div>
      <div class="flex bar" style="margin: auto" >
        <VaInnerLoading :loading="loading">
          <GenericBar v-if="computedSeriesBar.length" :series="computedSeriesBar" :labels="computedLabelsBar" :title="computedTitle" :palette="palette"/>
        </VaInnerLoading>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.stat-wrapper {
  flex-direction: column;
  @media (min-width: 1400px) {
    flex-direction: row;
  }
}
.bar {
  width: 100%;
  @media (min-width: 1400px) {
    width: 50%;
  }
}
.pie {
  margin: auto;
  max-width: 400px;
  @media (min-width: 1400px) {
    width: 100%;
    margin: revert;
    margin-top: 1rem;
  }
}
.pie-wrapper {
  width: 100%;
  @media (min-width: 1400px) {
    width: 50%;
    margin-top: 3rem;
  }
}
</style>
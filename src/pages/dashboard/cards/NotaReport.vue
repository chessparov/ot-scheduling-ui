<script lang="ts">

import {useScheduleStore} from "@/stores/global-store";
import axios from "axios";
import FileDownload from "js-file-download";
import {useToast} from "vuestic-ui";
import api from "../../../../axios";


export default {
  props: {
    modified: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    const input = '';
    const mc_results = Object.keys(useScheduleStore().scheduleNote).length === 0 ? {'pe': [[]], 'pne': [[]]} : useScheduleStore().scheduleNote;
    return {
      isModified: this.$props.modified,
      pe_report: mc_results['pe'],
      pne_report: mc_results['pne'],
      scheduleData: useScheduleStore().scheduleData,
      init: useToast(),
      currentTab: "pe",
      tabs: ["pe", "pne", "nota"],
      tabNames: {"pe": "Pazienti eletti", "pne": "Pazienti non eletti", "nota": "Nota operatoria"},
      colNames: {
        "pe": [
          {key: "Indice", sortingOptions: ["desc", "asc"], sortable: true,},
          {key: "Data Intervento", sortable: true, sortingOptions: ["desc", "asc"], displayFormatFn: (date) => date.split("-").reverse().join("/")},
          {key: "Data Prenot.", label: "Data prenotazione", sortable: true, sortingOptions: ["desc", "asc"], displayFormatFn: (date) => date.split("-").reverse().join("/")},
          {key: "due date", sortable: true, sortingOptions: ["desc", "asc"], displayFormatFn: (date) => date.split("-").reverse().join("/")},
          {key: "Ritardo", sortingOptions: ["desc", "asc"], sortable: true,},
          {key: "Paziente", sortingOptions: ["desc", "asc"], sortable: true, width: '300px'},
          {key: "Reparto", sortingOptions: ["desc", "asc"], sortable: true, width: '400px'},
          {key: "Priorità", label: "Priorita", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Cod. Int.", label: "ICD", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Tipo Intervento", sortingOptions: ["desc", "asc"], sortable: true, width: '800px'},
          {key: "Cod. Diagn.", label: "Cod diagnosi", sortable: true, sortingOptions: ["desc", "asc"], },
          {key: "Diagnosi ICD-9-CM", sortingOptions: ["desc", "asc"], sortable: true, width: '800px'},
          {key: "pne/pngla", sortingOptions: ["desc", "asc"], sortable: true,},
          {key: "Tempo Intervento", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "ID Percorso", sortable: true, sortingOptions: ["desc", "asc"]},
        ],
        "pne": [
          {key: "Indice", sortingOptions: ["desc", "asc"], sortable: true,},
          {key: "Data Prenot.", label: "Data prenotazione", sortable: true, sortingOptions: ["desc", "asc"], displayFormatFn: (date) => date.split("-").reverse().join("/")},
          {key: "due date", sortable: true, sortingOptions: ["desc", "asc"], displayFormatFn: (date) => date.split("-").reverse().join("/")},
          {key: "Paziente", sortingOptions: ["desc", "asc"], sortable: true, width: '300px'},
          {key: "Reparto", sortingOptions: ["desc", "asc"], sortable: true, width: '400px'},
          {key: "Priorità", label: "Priorita", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Cod. Int.", label: "ICD", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Tipo Intervento", sortingOptions: ["desc", "asc"], sortable: true, width: '800px'},
          {key: "Cod. Diagn.", label: "Cod diagnosi", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Diagnosi ICD-9-CM", sortingOptions: ["desc", "asc"], sortable: true, width: '800px'},
          {key: "pne/pngla", sortingOptions: ["desc", "asc"], sortable: true,},
          {key: "ID Percorso", sortable: true, sortingOptions: ["desc", "asc"]},
        ]
      },
      currentNota: 0,
      options: [
        {
          text: 'Nota 1',
          value: 0,
        },
        {
          text: 'Nota 2',
          value: 1,
        },
        {
          text: 'Nota 3',
          value: 2,
        }
      ],
      arrRobot: [
        {text: "Totale", value: 'total'},
        {text: "Robot A", value: 'ROBOT_A'},
        {text: "Robot B", value: 'ROBOT_B'},
        {text: "Robot C", value: 'ROBOT_C'},
        {text: "Robot D", value: 'ROBOT_D'}
      ],
      currentRobot: {text: "Totale", value: 'total'},
      input,
      filter: input,
      isCustomFilteringFn: false,
    }
  },
  computed: {
    customFilteringFn() {
      return this.isCustomFilteringFn ? this.filterExact : undefined;
    },
  },
  methods: {
    filterExact(source) {
      if (this.filter === "") {
        return true;
      }
      return source?.toString?.() === this.filter;
    },

    updateFilter(filter) {
      this.filter = filter;
    },
    async onDownload(){
      const pk = useScheduleStore().scheduleId.toString();
      const index = this.currentNota.toString();
      const robot = this.currentRobot.value.toString();

      if (this.currentTab == "pe") {
        await api
            .get(axios.defaults.baseURL + '/api/scheduler/download-pe/' + pk + '/' + index,
                {
                  responseType: 'blob'
                })
            .then((res) => {
              FileDownload(res.data, `${useScheduleStore().scheduleName}_pe_${this.currentNota}.xlsx`)
            })
            .catch((error) => {
              if (error.response.status == 404) {
                this.init.notify({
                  message: 'Richiesta non valida. Schedula inesistente',
                  color: 'warning'
                })
              }
              else if (error.response.status == 400) {
                this.init.notify({
                  message: 'Richiesta non valida. La nota non esiste',
                  color: 'warning'
                })
              }
              else {
                this.init.notify({
                  message: 'Errore lato server',
                  color: 'danger'
                })
              }
            })
      }
      else if (this.currentTab == "pne") {
        await api
            .get(axios.defaults.baseURL + '/api/scheduler/download-pne/' + pk + '/' + index,
                {
                  responseType: 'blob'
                })
            .then((res) => {
              FileDownload(res.data, `${useScheduleStore().scheduleName}_pne_${this.currentNota}.xlsx`)
            })
            .catch((error) => {
              if (error.response.status == 404) {
                this.init.notify({
                  message: 'Richiesta non valida. Schedula inesistente',
                  color: 'warning'
                })

              }
              else if (error.response.status == 400) {
                this.init.notify({
                  message: 'Richiesta non valida. La nota non esiste',
                  color: 'warning'
                })
              }
              else {
                this.init.notify({
                  message: 'Errore lato server',
                  color: 'danger'
                })
              }
            })
      }
      else {
        await api
            .get(axios.defaults.baseURL + '/api/scheduler/download-nota/' + pk + '/' + index + '/' + robot,
                {
                  responseType: 'blob'
                })
            .then((res) => {
              FileDownload(res.data, `${useScheduleStore().scheduleName}_nota_${this.currentNota}_${robot.toLowerCase()}.xlsx`)
            })
            .catch((error) => {
              if (error.response.status == 404) {
                this.init.notify({
                  message: 'Richiesta non valida. Schedula inesistente',
                  color: 'warning'
                })
              }
              else if (error.response.status == 400) {
                this.init.notify({
                  message: 'Richiesta non valida. La nota non esiste',
                  color: 'warning'
                })
              }
              else {
                this.init.notify({
                  message: 'Errore lato server',
                  color: 'danger'
                })
              }
            })
      }
    },
  },
  watch: {
    input(newValue) {
      this.updateFilter(newValue);
    },
  },
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <VaAlert
        v-model="isModified"
        color="warning"
        closeable
        class="w-full"
        style="margin-bottom: 0.5rem"
    >
      Attenzione! La schedula è stata modificata, i dati e le statistiche non sono più aggiornati. Ripetere la simulazione.
    </VaAlert>
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
    <VaRadio
        v-model="currentNota"
        :options="options"
        value-by="value"
    />
    <div class="flex flex-col gap-4" v-if="currentTab != 'nota'">
      <div class="flex flex-col sm:flex-row gap-4">
        <VaInput
            v-model="input"
            placeholder="Filtro..."
            class="max-w-[50%]"
        />
        <VaCheckbox
            v-model="isCustomFilteringFn"
            label="Corrispondenza esatta"
            style="margin: auto 0 auto 0; justify-items: center"
            class="min-w-[25%]"
        />
      </div>
      <VaDataTable
          :columns="colNames[currentTab]"
          :items="currentTab == 'pe' ? pe_report[currentNota] : pne_report[currentNota]"
          :filter="filter"
          :filter-method="customFilteringFn"
          virtual-scroller
          sticky-header
          striped
          height="500px"
      />
    </div>
    <div class="flex flex-col gap-4" v-if="currentTab == 'nota'">
      <VaSelect
          v-model="currentRobot"
          placeholder="Seleziona robot..."
          label="Seleziona Robot"
          color="#158DE3"
          class="calendar-button"
          :options="arrRobot"
      />
      <VaButton
          icon="download"
          class="calendar-button"
          @click="onDownload"
      >
        Download
      </VaButton>
    </div>
    <VaButton
        v-if="currentTab != 'nota'"
        icon="download"
        class="calendar-button"
        @click="onDownload"
    >
      Download
    </VaButton>
  </div>
</template>

<style scoped lang="scss">

.calendar-button {
  margin-top: 0.5rem;
  max-width: none;

  @media (min-width: 640px) {
    max-width: 12rem;
  }
}

</style>

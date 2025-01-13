<script lang="ts">

import {useScheduleStore} from "@/stores/global-store";


export default {
  props: {
    modified: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    const input = '';
    return {
      isModified: this.$props.modified,
      mc_results: useScheduleStore().scheduleNote,
      scheduleData: useScheduleStore().scheduleData,
      currentTab: "pe",
      tabs: ["pe", "pne"],
      tabNames: {"pe": "Pazienti eletti", "pne": "Pazienti non eletti"},
      colNames: {
        "pe": [
          {key: "Data Intervento", sortable: true, sortingOptions: ["desc", "asc"], displayFormatFn: (date) => date.split("-").reverse().join("/")},
          {key: "Data Prenot.", label: "Data prenotazione", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "due date", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Ritardo", sortingOptions: ["desc", "asc"], sortable: true,},
          {key: "Priorità", label: "Priorita", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Cod. Int.", label: "ICD", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Cod. Diagn.", label: "Cod diagnosi", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Tempo Intervento", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "ID Percorso", sortable: true, sortingOptions: ["desc", "asc"]},
        ],
        "pne": [
          {key: "Data Prenot.", label: "Data prenotazione", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "due date", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Priorità", label: "Priorita", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Cod. Int.", label: "ICD", sortable: true, sortingOptions: ["desc", "asc"]},
          {key: "Cod. Diagn.", label: "Cod diagnosi", sortable: true, sortingOptions: ["desc", "asc"]},
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
    <div class="flex flex-row gap-4">
      <VaInput
          v-model="input"
          placeholder="Filtro..."
          class="max-w-[50%]"
      />
      <VaCheckbox
          v-model="isCustomFilteringFn"
          label="Corrispondenza esatta"
          style="margin: auto; justify-items: center"
          class="min-w-[25%]"
      />
    </div>
    <VaDataTable
        :columns="colNames[currentTab]"
        :items="mc_results[currentTab][currentNota]"
        :filter="filter"
        :filter-method="customFilteringFn"
        sticky-header
        striped
        height="500px"
    />
  </div>
</template>

<style scoped lang="scss">

</style>

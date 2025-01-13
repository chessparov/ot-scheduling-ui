<script setup lang="ts">

import {defineVaDataTableColumns, VaCollapse, VaDataTable} from "vuestic-ui";
import {PropType} from "vue";
import {dateParser, timeParser} from "@/services/utils";

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

const optionsInterventi = {
  chart: {
    id: 'interventi',
  },
  title: { text: 'Numero di interventi' },
  colors: ['#FF9800'],
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    title: {
      text: 'N° corsa Montecarlo',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    title: {
      text: 'N° Interventi',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  }
}
const optionsRitardi = {
  chart: {
    id: 'ritardi',
  },
  title: { text: 'Ritardo medio' },
  colors: ['#2E93fA'],
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    title: {
      text: 'N° corsa Montecarlo',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Ritardo medio [Giorni]',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  }

}
const optionsOncologici = {
  chart: {
    id: 'oncologici',
  },
  title: { text: 'Oncologici in orario' },
  colors: ['#66DA26'],
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    title: {
      text: 'N° corsa Montecarlo',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Percentuale [%]',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  }
}
const optionsRepartiOncologici = {
  chart: {
    id: 'oncologici_reparto',
  },
  title: { text: 'Media percentuale oncologici in orario per reparto' },
  colors: ['#2E93fA', '#66DA26', '#eab149', '#E91E63'],
  plotOptions: {
    bar: {
      distributed: true,
    }
  },
  xaxis: {
    categories: ['Urologia 1', 'Ginecologia 2', 'Chirurgia generale', 'Endocrinochirurgia'],
    title: {
      text: 'Unità operativa',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Percentuale [%]',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  }
}
const optionsClsseInterventi = {
  chart: {
    id: 'oncologici_reparto',
    stacked: true,
  },
  categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  title: { text: 'Numero interventi per classe' },
  colors: ['#2E93fA', '#ec0b0b', '#56ec0b', '#E91E63'],
  xaxis: {
    title: {
      text: 'N° corsa Montecarlo',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Numero interventi',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  }
}

const interventi = [{
  name: 'N° Interventi effettuati',
  data: [130, 130, 128, 134, 127, 136, 131, 129, 134, 133]
}]
const ritardi = [{
  name: 'Ritardo Medio',
  data: [102, 104, 128, 99, 100, 95, 110, 108, 106, 104]
}]
const oncologici = [{
  name: 'Percentuale interventi oncologici effettuati in orario',
  data: [19, 24, 41, 13, 22, 31, 21, 18, 30, 18]
}]
const repartiOncologici = [
    {
      name: 'Percentuale interventi oncologici effuttuati in orario per reparto',
      data: [24, 15, 52, 29]
}]
const classiInterventi = [{
    name: 'Classe A',
    data: [121, 118, 110, 100, 102, 104, 110, 123, 118, 113]
  },
  {
    name: 'Classe B',
    data: [10, 8, 2, 4, 7, 7, 9, 8, 6, 5]
  },
  {
    name: 'Classe C',
    data: [2, 1, 8, 0, 4, 7, 2, 11, 1, 5]
  }
]

const riepilogoData = [
  {Parametri_: 'Corse Montecarlo', valore: props.riepilogo.mcCycles,
    Dettagli: 'Data esecuzione', valore_: dateParser(props.riepilogo.creationDate)},
  {Parametri_: 'Ottimizzazione', valore: props.riepilogo.optimization ? 'Sì' : 'No',
    Dettagli: 'Tempo di calcolo', valore_: timeParser(props.riepilogo.computationTime)},
  {Parametri_: 'Tempo ottimizzazione [s]', valore: props.riepilogo.tabuTime,
    Dettagli: 'Autore', valore_:  props.riepilogo.author},
  {Parametri_: 'Alpha', valore: props.riepilogo.alpha, Dettagli:'', valore_: ''},
  {Parametri_: 'Beta', valore: props.riepilogo.beta, Dettagli:'', valore_: ''},
  {Parametri_: 'Gamma', valore: props.riepilogo.gamma, Dettagli:'', valore_: ''},
  {Parametri_: 'Epsilon', valore: props.riepilogo.epsilon, Dettagli:'', valore_: ''},
]

const columns =  defineVaDataTableColumns([
  { label: 'Parametri', key: 'Parametri_', sortable: true },
  { label: 'Valore', key: 'valore', sortable: true },
  { label: 'Dettagli', key: 'Dettagli', sortable: true },
  { label: 'Valore', key: 'valore_', sortable: true },
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
      <div class="flex flex-col md:flex-row overflow-hidden" style="justify-content: space-between">
        <div class="w-full md:w-1/3" style="min-height: 300px">
          <apexchart height="100%" width="100%" type="bar" :options="optionsInterventi" :series="interventi"></apexchart>
        </div>
        <div class="w-full md:w-1/3" style="min-height: 300px">
          <apexchart height="100%" width="100%" type="bar" :options="optionsRitardi" :series="ritardi"></apexchart>
        </div>
        <div class="w-full md:w-1/3" style="min-height: 300px">
          <apexchart height="100%" width="100%" type="bar" :options="optionsOncologici" :series="oncologici"></apexchart>
        </div>
      </div>
    </VaCollapse>
    <VaCollapse header="Statistiche globali">
    <div class="flex flex-col md:flex-row gap-4 overflow-hidden" style="justify-content: space-between">
      <div class="w-full md:w-1/2" style="min-height: 300px">
        <apexchart height="100%" width="100%" type="bar" :options="optionsRepartiOncologici" :series=repartiOncologici></apexchart>
      </div>
      <div class="w-full md:w-1/2" style="min-height: 300px">
        <apexchart height="100%" width="100%" type="bar" :options="optionsClsseInterventi" :series=classiInterventi></apexchart>
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
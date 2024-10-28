<script setup lang="ts">

import {VaCollapse, VaDataTable} from "vuestic-ui";
import {onMounted} from "vue";

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
  title: { text: 'Media Oncologici in orario per reparto' },
  colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63'],
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
  colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63'],
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
const healthOptions = {
  chart: {
    id: 'scheduleHealth',
    height: '100%',
  },
  title: {
    text: 'SALUTE SCHEDULA'
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Health'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: undefined,
      inverseColors: false,
      opacityFrom: 0.95,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: []
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '17px'
        },
        value: {
          formatter: function(val) {
            return parseInt(val) + "%";
          },
          color: '#111',
          fontSize: '36px',
          show: true,
        }
      }
    },
  },
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
const repartiOncologici = [{
  name: 'Percentuale interventi oncologici effettuati in orario',
  data: [60, 13, 27, 45]
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
const healthRadial = [100];

const riepilogoData = [
  {Parametri_: 'Corse Montecarlo', valore: 1000, Dettagli: 'Data esecuzione', valore_: new Date().toDateString()},
  {Parametri_: 'Tempo ottimizzazione [s]', valore: 120, Dettagli: 'Tempo di calcolo [s]', valore_: 125},
  {Parametri_: 'Ottimizzazione', valore: 'Si', Dettagli: 'Autore', valore_:  'Mimmo'},
  {Parametri_: 'Alpha', valore: 2, Dettagli:'', valore_: ''},
  {Parametri_: 'Beta', valore: 5, Dettagli:'', valore_: ''},
  {Parametri_: 'Gamma', valore: 0, Dettagli:'', valore_: ''},
  {Parametri_: 'Epsilon', valore: 3, Dettagli:'', valore_: ''},
]

function addGradientStops() {
  if (healthRadial[0] >= 75) {
    healthOptions.fill.gradient.colorStops.push(
    {
      offset: 0,
          color: "#ff0000",
        opacity: 1
    },
    {
      offset: 30,
          color: "#f4e208",
        opacity: 1
    },
    {
      offset: 50,
          color: "#15ed15",
        opacity: 1
    })
  }
  else if (healthRadial[0] < 75 && healthRadial[0] > 50) {
    healthOptions.fill.gradient.colorStops.push(
        {
          offset: 0,
          color: "#ea2121",
          opacity: 1
        },
        {
          offset: 50,
          color: "#f46208",
          opacity: 1
        },
        {
          offset: 100,
          color: "#f4e208",
          opacity: 1
        }
      )
  }
  else {
    healthOptions.fill.gradient.colorStops.push(
        {
          offset: 0,
          color: "#ff0000",
          opacity: 1
        },
        {
          offset: 50,
          color: "#ed3030",
          opacity: 1
        },
        {
          offset: 100,
          color: "rgb(237,81,81)",
          opacity: 1
        }
      )
  }
}
onMounted(() => {addGradientStops()});

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-4" style="height: 100%; width: 100%; justify-content: space-between">
      <div class="flex flex-col gap-4 sm:w-[60%]">
        <h1 class="va-title" style="text-align: left; font-size: 0.85rem">Riepilogo</h1>
        <VaDataTable
            style="--va-data-table-thead-font-size: 0.5rem; --va-data-table-height: 100%; font-size: 0.8rem"
            :items="riepilogoData"
        />
      </div>
      <div class="sm:w-[40%]">
        <apexchart class="" type="radialBar" :series="healthRadial" :options="healthOptions"></apexchart>
      </div>
    </div>
    <VaCollapse header="Statistiche Montecarlo">
      <div class="flex flex-row overflow-hidden" style="justify-content: space-between">
        <div class="sm:w-[30%]" style="min-height: 300px">
          <apexchart height="100%" width="100%" type="bar" :options="optionsInterventi" :series="interventi"></apexchart>
        </div>
        <div class="sm:w-[30%]" style="min-height: 300px">
          <apexchart height="100%" width="100%" type="bar" :options="optionsRitardi" :series="ritardi"></apexchart>
        </div>
        <div class="sm:w-[30%]" style="min-height: 300px">
          <apexchart height="100%" width="100%" type="bar" :options="optionsOncologici" :series="oncologici"></apexchart>
        </div>
      </div>
    </VaCollapse>
    <VaCollapse header="Statistche globali">
    <div class="flex flex-row gap-4 overflow-hidden" style="justify-content: space-between">
      <div class="sm:w-[48%]" style="min-height: 300px">
        <apexchart height="100%" width="100%" type="bar" :options="optionsRepartiOncologici" :series=repartiOncologici></apexchart>
      </div>
      <div class="sm:w-[48%]" style="min-height: 300px">
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
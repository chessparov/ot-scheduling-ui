<script lang="ts">

import Calendar from "@/pages/dashboard/cards/Calendar.vue";
import SaveDownload from "@/pages/dashboard/cards/SaveDownload.vue";
import DashboardMenu from "@/pages/dashboard/cards/DashboardMenu.vue";
import StatsReport from "@/pages/dashboard/cards/StatsReport.vue";
import {VaButtonToggle, VaCard} from "vuestic-ui";
import {useScheduleStore} from "@/stores/global-store";
import axios from "axios";
import {ref} from "vue";

export default {
  components: {VaCard, VaButtonToggle, StatsReport, DashboardMenu, SaveDownload, Calendar},
  data() {
    return {
      modifiedSchedule: false,
      menuCurrentTab: 'SCHEDULA',
      menuTabs: ['SCHEDULA', 'STATISTICHE'],
      currentTab: 'SETTIMANA 1',
      weeks: ['SETTIMANA 1', 'SETTIMANA 2', 'SETTIMANA 3', 'SETTIMANA 4'],
      scheduleStore: useScheduleStore(),
      scheduleTitle: useScheduleStore().scheduleName,
      scheduleStats: useScheduleStore().scheduleStats,
    }
  },
  mounted() {
  }
    // console.log(useScheduleStore().scheduleStats);
    // axios
    //   .get('http://localhost:8000/api/scheduler/get-stats/' + this.scheduleStore.scheduleId.toString())
    //   .then(res => {
    //     console.log(res)
        // this.riepilogo = [
        //   {Parametri_: 'Corse Montecarlo', valore: 1000, Dettagli: 'Data esecuzione', valore_: new Date().toDateString()},
        //   {Parametri_: 'Tempo ottimizzazione [s]', valore: 120, Dettagli: 'Tempo di calcolo [s]', valore_: 125},
        //   {Parametri_: 'Ottimizzazione', valore: 'Si', Dettagli: 'Autore', valore_:  'Mimmo'},
        //   {Parametri_: 'Alpha', valore: 2, Dettagli:'', valore_: ''},
        //   {Parametri_: 'Beta', valore: 5, Dettagli:'', valore_: ''},
        //   {Parametri_: 'Gamma', valore: 0, Dettagli:'', valore_: ''},
        //   {Parametri_: 'Epsilon', valore: 3, Dettagli:'', valore_: ''},
        // ]
      // })
  // }
}
</script>

<template>
  <h1 class="h1">Dashboard</h1>
  <VaCard>
    <div class="flex flex-col gap-4 " style="padding: 1.5rem">
      <div class="flex flex-col sm:flex-row gap-4 justify-between" style="padding-bottom: 1.25rem">
        <label class="va-title" style="font-size: 1rem; padding: 0.25rem">
          {{ scheduleTitle }}
        </label>
        <VaButtonToggle
            v-model="menuCurrentTab"
            :options="[
                  {label: 'Schedula', icon: 'calendar_month', value: 'SCHEDULA'},
                  {label: 'Statistiche', icon: 'show_chart', value: 'STATISTICHE'}
                ]"
        />
      </div>
      <section v-if="menuCurrentTab === 'SCHEDULA'" class="flex flex-col gap-4">
        <Calendar @modifiedSchedule="this.modifiedSchedule = true"/>
        <SaveDownload :modified-schedule="this.modifiedSchedule"/>
      </section>
      <section v-else class="flex flex-col gap-4">
        <StatsReport :riepilogo="this.scheduleStats"/>
      </section>
    </div>
  </VaCard>
<!--    <DashboardMenu-->
<!--        :menuTab="menuTab"-->
<!--        @changed-tab="changeTab"-->
<!--    />-->
</template>

<style lang="scss" scoped>


</style>
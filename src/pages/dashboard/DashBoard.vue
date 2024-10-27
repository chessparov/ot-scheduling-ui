<script lang="ts">

import Calendar from "@/pages/dashboard/cards/Calendar.vue";
import SaveDownload from "@/pages/dashboard/cards/SaveDownload.vue";
import DashboardMenu from "@/pages/dashboard/cards/DashboardMenu.vue";
import StatsReport from "@/pages/dashboard/cards/StatsReport.vue";
import {VaButtonToggle, VaCard} from "vuestic-ui";

export default {
  components: {VaCard, VaButtonToggle, StatsReport, DashboardMenu, SaveDownload, Calendar},
  data() {
    return {
      modifiedSchedule: false,
      menuCurrentTab: 'SCHEDULA',
      menuTabs: ['SCHEDULA', 'STATISTICHE'],
      currentTab: 'SETTIMANA 1',
      weeks: ['SETTIMANA 1', 'SETTIMANA 2', 'SETTIMANA 3', 'SETTIMANA 4'],
    }
  },
}
</script>

<template>
  <h1 class="h1">Dashboard</h1>
  <VaCard style="padding: 1.5rem">
    <div class="flex flex-col gap-4 ">
      <div class="flex flex-row gap-4 justify-between" style="padding-bottom: 1.25rem">
        <label class="va-title" style="font-size: 1.1rem; padding: 0.25rem">
          Schedula 20 Ottobre 2024
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
        <StatsReport/>
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
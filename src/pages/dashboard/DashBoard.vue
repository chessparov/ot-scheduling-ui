<script lang="ts">

import Calendar from "@/pages/dashboard/cards/Calendar.vue";
import SaveDownload from "@/pages/dashboard/cards/SaveDownload.vue";
import DashboardMenu from "@/pages/dashboard/cards/DashboardMenu.vue";
import StatsReport from "@/pages/dashboard/cards/StatsReport.vue";
import {VaButtonToggle, VaCard} from "vuestic-ui";
import {useScheduleStore} from "@/stores/global-store";
import NotaReport from "@/pages/dashboard/cards/NotaReport.vue";

export default {
  components: {NotaReport, VaCard, VaButtonToggle, StatsReport, DashboardMenu, SaveDownload, Calendar},
  data() {
    return {
      menuCurrentTab: 'SCHEDULA',
      menuTabs: ['SCHEDULA', 'NOTA', 'STATISTICHE'],
      currentTab: 'SETTIMANA 1',
      weeks: ['SETTIMANA 1', 'SETTIMANA 2', 'SETTIMANA 3', 'SETTIMANA 4'],
      scheduleTitle: useScheduleStore().scheduleName,
      scheduleStats: useScheduleStore().scheduleStats,
      startDate: new Date(useScheduleStore().scheduleStartDate),
      isModified: useScheduleStore().modified,
      changesMade: false,
    }
  },
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
                  {label: 'Nota', icon: 'library_books', value: 'NOTA'},
                  {label: 'Statistiche', icon: 'show_chart', value: 'STATISTICHE'},
                ]"
        />
      </div>
      <section v-if="menuCurrentTab === 'SCHEDULA'" class="flex flex-col gap-4">
        <Calendar @modifiedSchedule="this.isModified = true; changesMade = true;" :start-date="startDate"/>
        <SaveDownload :changesMade="this.changesMade" @changes-saved="this.changesMade = false"/>
      </section>
      <section v-else-if="menuCurrentTab === 'NOTA'" class="flex flex-col gap-4">
        <NotaReport :modified="this.isModified"/>
      </section>
      <section v-else class="flex flex-col gap-4">
        <StatsReport :riepilogo="this.scheduleStats" :modified="this.isModified"/>
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
<script lang="ts">

import {useFocus} from "@vueuse/core";
import Calendar from "@/pages/dashboard/cards/Calendar.vue";
import SaveDownload from "@/pages/dashboard/cards/SaveDownload.vue";
import DashboardMenu from "@/pages/dashboard/cards/DashboardMenu.vue";

export default {
  components: {DashboardMenu, SaveDownload, Calendar},
  methods: {},
  data() {
    return {
      modifiedSchedule: false,
      currentTab: 'SETTIMANA 1',
      weeks: ['SETTIMANA 1', 'SETTIMANA 2', 'SETTIMANA 3', 'SETTIMANA 4'],
    }
  }
}
</script>

<template>
  <h1 class="h1">Dashboard</h1>
  <div class="flex flex-row  gap-4">
    <section class="flex flex-col gap-4 w-full sm:w-[100%]">
      <Calendar @modifiedSchedule="this.modifiedSchedule = true"/>
      <SaveDownload :modified-schedule="this.modifiedSchedule"/>
    </section>
    <DashboardMenu/>
  </div>
</template>

<style lang="scss" scoped>


</style>
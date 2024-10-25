<script lang="ts">
import Calendar from "@/pages/dashboard/cards/Calendar.vue";
import SaveDownload from "@/pages/dashboard/cards/SaveDownload.vue";
import DashboardMenu from "@/pages/dashboard/cards/DashboardMenu.vue";
import Stats from "@/pages/dashboard/cards/Stats.vue";

export default {
  components: { Stats, DashboardMenu, SaveDownload, Calendar },
  data() {
    return {
      modifiedSchedule: false,
      menuTab: "DASHBOARD",
      currentTab: "SETTIMANA 1",
      weeks: ["SETTIMANA 1", "SETTIMANA 2", "SETTIMANA 3", "SETTIMANA 4"],
    };
  },
  methods: {
    changeTab(tab: string) {
      this.menuTab = tab;
    },
  },
};
</script>

<template>
  <h1 class="h1">Dashboard</h1>
  <div class="flex flex-row gap-4 h-full sm:h-[100%]">
    <section
      v-if="menuTab === 'DASHBOARD'"
      class="flex flex-col gap-4 w-full sm:w-[100%]"
    >
      <Calendar @modifiedSchedule="this.modifiedSchedule = true" />
      <SaveDownload :modified-schedule="this.modifiedSchedule" />
    </section>
    <section v-else class="flex flex-col gap-4 w-full sm:w-[100%]">
      <Stats />
    </section>
    <DashboardMenu :menuTab="menuTab" @changed-tab="changeTab" />
  </div>
</template>

<style lang="scss" scoped></style>

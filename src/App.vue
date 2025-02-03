<script setup>

import {useUserStore} from "@/stores/user-store";
import {useGlobalStore} from "@/stores/global-store";
import {useScheduleStore} from "@/stores/global-store";
import {useDataStore} from "@/stores/data-store";

const userStore = useUserStore()
const globalStore = useGlobalStore()
const scheduleStore = useScheduleStore()
const dataStore = useDataStore()

userStore.fetchData()
scheduleStore.fetchData()
globalStore.fetchData()
dataStore.fetchUsers()
dataStore.fetchProjects()
dataStore.fetchUos()

</script>

<template>
  <RouterView />
</template>

<style lang="scss">
#app {
  font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 20rem;
}
</style>

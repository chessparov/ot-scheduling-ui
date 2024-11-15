<script setup>

import {useUserStore} from "@/stores/user-store";
import {useGlobalStore} from "@/stores/global-store";
import {useScheduleStore} from "@/stores/global-store";

const userStore = useUserStore()
const globalStore = useGlobalStore()
const scheduleStore = useScheduleStore()

userStore.fetchData()
scheduleStore.fetchData()
globalStore.fetchData()

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

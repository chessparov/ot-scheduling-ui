<script lang="ts">
import {defineComponent} from 'vue'
import ThemeSwitcher from "@/pages/settings/components/ThemeSwitcher.vue";
import DefaultSettings from "@/pages/settings/components/DefaultSettings.vue";
import AccountAdmin from "@/pages/settings/components/AccountAdmin.vue";

export default defineComponent({
  name: "Settings",
  components: {AccountAdmin, DefaultSettings, ThemeSwitcher},
})
</script>

<template>
  <div class="flex flex-col space-y-6 md:space-y-4">
    <h1 class="page-title">Impostazioni</h1>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <h3 class="h3">Modalità</h3>
      <ThemeSwitcher />
    </div>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <DefaultSettings />
      <AccountAdmin />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
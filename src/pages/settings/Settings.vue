<script lang="ts">
import {defineComponent} from 'vue'
import ThemeSwitcher from "@/pages/settings/cards/ThemeSwitcher.vue";
import DefaultSettings from "@/pages/settings/cards/DefaultSettings.vue";
import AccountAdmin from "@/pages/settings/cards/AccountAdmin.vue";
import {useUserStore} from "@/stores/user-store";

export default defineComponent({
  name: "Settings",
  components: {AccountAdmin, DefaultSettings, ThemeSwitcher},
  data() {
    return {
      userStore: useUserStore(),
    }
  }
})
</script>

<template>
  <div class="flex flex-col space-y-6 md:space-y-4">
    <h1 class="page-title">Impostazioni</h1>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <h3 class="h3">Modalità</h3>
      <ThemeSwitcher />
    </div>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg" v-if="userStore.admin">
      <DefaultSettings />
    </div>
    <div class="flex flex-col p-2 bg-backgroundSecondary rounded-lg" style="margin-bottom: 2rem;" v-if="userStore.admin">
      <AccountAdmin />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
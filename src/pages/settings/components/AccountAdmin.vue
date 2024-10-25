<script lang="ts">
import {defineComponent} from 'vue'
import AddUser from "@/pages/settings/components/AddUser.vue";

export default defineComponent({
  name: "AccountAdmin",
  components: {AddUser}
})
</script>

<template>
  <div class="flex flex-col p-4 bg-backgroundSecondary rounded-lg">
    <h3 class="h3 mb-6">Amministra accont</h3>
    <VaCollapse header="Aggiungi account">
      <AddUser />
    </VaCollapse>
    <VaCollapse header="Modifica acoount">
      <span class="text-regularLarge">
        Amministra account esistenti
      </span>
    </VaCollapse>
  </div>
</template>

<style scoped lang="scss">

</style>
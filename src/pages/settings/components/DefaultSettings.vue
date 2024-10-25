<script lang="ts">
import {defineComponent} from 'vue'
import {useGlobalStore} from "@/stores/global-store";

export default defineComponent({
  name: "DefaultSettings",
  data() {
    return {
      store: useGlobalStore(),
    }
  }
})
</script>

<template>
  <div class="flex flex-col p-4 bg-backgroundSecondary rounded-lg">
    <h3 class="h3 mb-6">Modifica parametri default</h3>
    <div class="flex flex-col justify-between overflow-x-hidden gap-4">
      <div class="flex flex-rew justify-between overflow-x-hidden gap-4 sm:w-[50%]">
        <span class="text-regularLarge">
          Numero cicli Montecarlo
        </span>
        <VaInput class="sm:w-[50%]" v-model="store.montecarloDefault" size="small">
          <template #appendInner>
            <span>Cicli</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-rew justify-between overflow-x-hidden gap-4 sm:w-[50%]">
        <span class="text-regularLarge">
          Tempo tabù search
        </span>
        <VaInput class="sm:w-[50%]" v-model="store.tabuTimeDefault" size="small">
          <template #appendInner>
            <span>Secondi</span>
          </template>
        </VaInput>
      </div>
    </div>
    <VaDivider class="py-4 group-last:hidden" />
    <div class="flex flex-row justify-between overflow-x-hidden sm:w-[50%]">
      <div class="flex flex-col justify-between overflow-x-hidden">
        <span class="text-regularLarge">
          Vincoli
        </span>
        <span class="text-regularMedium">
          Modifica i vincoli nel database. Le modifiche apportate sono permanenti.
        </span>
      </div>
      <VaButton :to="'constraints'">
        Tabella
      </VaButton>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
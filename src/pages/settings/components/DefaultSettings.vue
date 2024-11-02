<script lang="ts">
import {defineComponent} from 'vue'
import {useGlobalStore} from "@/stores/global-store";
import UoList from "@/pages/settings/components/UoList.vue";

export default defineComponent({
  name: "DefaultSettings",
  components: {UoList},
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
      <div class="flex flex-row justify-between overflow-x-hidden gap-4">
        <span class="text-regularMedium">
          Numero cicli Montecarlo
        </span>
        <VaInput class="sm:w-[50%]" v-model="store.montecarloDefault" size="small">
          <template #appendInner>
            <span>Cicli</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-row justify-between overflow-x-hidden gap-4 ">
        <span class="text-regularMedium">
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
    <div class="flex flex-col md:flex-row justify-between overflow-x-hidden">
      <div class="flex flex-col">
        <span class="text-regularMedium" style="font-weight: bold">
          Vincoli
        </span>
        <span class="text-regularMedium py-2">
          Modifica i vincoli nel database. Le modifiche apportate sono permanenti.
        </span>
      </div>
      <VaButton :to="'constraints'" style="min-width: 20%">
        Vai alla tabella
      </VaButton>
    </div>
    <VaDivider class="py-4 group-last:hidden" />
    <UoList />
    <VaDivider class="py-4 group-last:hidden" />
  </div>
</template>

<style scoped lang="scss">

</style>
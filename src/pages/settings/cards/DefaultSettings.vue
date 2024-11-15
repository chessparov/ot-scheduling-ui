<script setup lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import {useGlobalStore} from "@/stores/global-store";
import UoList from "@/pages/settings/components/UoList.vue";
import {createNumeralMask, useInputMask, useToast, VaButton, VaDivider, VaInput} from "vuestic-ui";
import axios from "axios";

const { init } = useToast();
const globalStore = useGlobalStore();
const formData = reactive({
  mc_cycles: ref(globalStore.montecarloDefault as number),
  tabu_time: ref(globalStore.tabuTimeDefault as number),
  n_rooms: ref(globalStore.roomsNumberDefault as number),
  n_weeks: ref(globalStore.weeksNumberDefault as number),
  n_days: ref(globalStore.daysNumberDefault as number),
  slot_duration: ref(globalStore.slotDurationDefault as number),
})
const numericInput1 = ref();
const numericInput2 = ref();
const numericInput3 = ref();
const numericInput4 = ref();
const numericInput5 = ref();
const numericInput6 = ref();

useInputMask(createNumeralMask(), numericInput1);
useInputMask(createNumeralMask(), numericInput2);
useInputMask(createNumeralMask(), numericInput3);
useInputMask(createNumeralMask(), numericInput4);
useInputMask(createNumeralMask(), numericInput5);
useInputMask(createNumeralMask(), numericInput6);

const modParams = () => {
  axios
      .post('http://localhost:8000/api/scheduler/mod-simparams',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
      .then(res => {
        globalStore.updateGlobal(
            Number(formData.mc_cycles.toString().replace(' ', '')),
            Number(formData.tabu_time.toString().replace(' ', '')),
            Number(formData.n_weeks.toString().replace(' ', '')),
            Number(formData.n_days.toString().replace(' ', '')),
            Number(formData.n_rooms.toString().replace(' ', '')),
            Number(formData.slot_duration.toString().replace(' ', '')),
        )
        init({message: 'Modifiche salvate con successo', color: 'success'})

      })
      .catch(err => {
        init({message: 'Errore lato server', color: 'danger'})
      })
}
</script>

<template>
  <div class="flex flex-col p-4 bg-backgroundSecondary rounded-lg">
    <h3 class="h3 mb-6">Modifica parametri default</h3>
    <div class="flex flex-col justify-between overflow-x-hidden gap-4">
      <div class="flex flex-col md:flex-row justify-between overflow-x-hidden gap-4">
        <span class="text-regularMedium">
          Numero cicli Montecarlo
        </span>
        <VaInput class="md:w-[50%]" v-model="formData.mc_cycles" ref="numericInput1" size="small">
          <template #appendInner>
            <span>Cicli</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-col md:flex-row justify-between overflow-x-hidden gap-4 ">
        <span class="text-regularMedium">
          Tempo tabù search
        </span>
        <VaInput class="md:w-[50%]" v-model="formData.tabu_time" ref="numericInput2" size="small">
          <template #appendInner>
            <span>Secondi</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-col md:flex-row justify-between overflow-x-hidden gap-4 ">
        <span class="text-regularMedium">
          Numero di settimane
        </span>
        <VaInput class="md:w-[50%]" v-model="formData.n_weeks" ref="numericInput3" size="small">
          <template #appendInner>
            <span>N°</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-col md:flex-row justify-between overflow-x-hidden gap-4 ">
        <span class="text-regularMedium">
          Numero di giorni
        </span>
        <VaInput class="md:w-[50%]" v-model="formData.n_days" ref="numericInput4" size="small">
          <template #appendInner>
            <span>N°</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-col md:flex-row justify-between overflow-x-hidden gap-4 ">
        <span class="text-regularMedium">
          Numero di sale
        </span>
        <VaInput class="md:w-[50%]" v-model="formData.n_rooms" ref="numericInput5" size="small">
          <template #appendInner>
            <span>N°</span>
          </template>
        </VaInput>
      </div>
      <div class="flex flex-col md:flex-row justify-between overflow-x-hidden gap-4 " style="margin-bottom: 1rem">
        <span class="text-regularMedium">
          Durata slot sala operatoria
        </span>
        <VaInput class="md:w-[50%]" v-model="formData.slot_duration" ref="numericInput6" size="small">
          <template #appendInner>
            <span>Ore</span>
          </template>
        </VaInput>
      </div>
      <VaButton class="button-left md:button-right" @click="modParams">
        Conferma modifiche
      </VaButton>
    </div>
    <VaDivider class="py-4 group-last:hidden" />
    <div class="flex flex-col md:flex-row justify-between overflow-x-hidden">
      <div class="flex flex-col" style="margin-bottom: 1rem">
        <span class="text-regularMedium" style="font-weight: bold">
          Vincoli
        </span>
        <span class="text-regularMedium py-2">
          Modifica i vincoli nel database. Le modifiche apportate sono permanenti.
        </span>
      </div>
      <VaButton :to="'constraints'" class="button-left md:button-right">
        Vai alla tabella
      </VaButton>
    </div>
    <VaDivider class="py-4 group-last:hidden" />
    <UoList />
    <VaDivider class="py-4 group-last:hidden" />
  </div>
</template>

<style scoped lang="scss">



.button-left {
  min-width: 25%;
  margin: auto auto auto 0

}

@media (min-width: 1024px) {
  .md\:button-right {
    min-width: 25%;
    margin: auto 0 auto auto
  }
}

</style>
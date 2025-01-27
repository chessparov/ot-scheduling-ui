<script setup lang="ts">

import {ref} from "vue";
import GenericPie from "@/components/charts/GenericPie.vue";
import GenericBar from "@/components/charts/GenericBar.vue";

const nota = ref('nota1');
const optionsNote = [
  {value: 'nota1', label: 'Nota 1'},
  {value: 'nota2', label: 'Nota 2'},
  {value: 'nota3', label: 'Nota 3'}
]

const statType = ref('interventiOrario');
const statList = [
  {value: 'interventiOrario', text: 'Interventi in orario'},
  {value: 'interventiOnc', text: 'Interventi oncologici'},
  {value: 'interventiOncOrario', text: 'Interventi oncologici in orario'},
  {value: 'classe', text: 'Classe di priorità'},
  {value: 'pngla', text: 'PNGLA'},
  {value: 'pnglaOrario', text: 'PNGLA in orario'},
]
const palette = ref(['#154ec1', '#00cae4']);
</script>

<template>
  <div class="flex flex-col gap-4 overflow-hidden" >
    <VaButtonToggle
        preset="secondary"
        border-color="primary"
        class="mb-6"
        size="medium"
        v-model="nota"
        :options="optionsNote"
    />
    <div class="flex flex-col lg:flex-row gap-4 overflow-hidden" >
      <div class="w-full lg:w-1/6" style="min-height: 300px">
        <VaOptionList
            v-model="statType"
            :options="statList"
            value-by="value"
            type="radio"
        />
      </div>
      <div class="w-full lg:w-2/6" style="min-height: 400px">
        <GenericPie :series="[60, 40]" :labels="['asd', 'asfgsdfd']" :title="'Test pie'" :palette="palette"/>
      </div>
      <div class="w-full lg:w-3/6" >
        <GenericBar :palette="palette" :series="[{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43, 12, 23, 23, 34, 1, 43, 11],
          fillColor: '#ff826b'
        }, {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27, 12, 24, 21, 11, 9, 23, 10],
          fillColor: '#00cae4'
        }]" :labels="['ertk', '2kjnk', 'ASD', 'ASDAS', 'ASDAS2', 'KISHDGK', 'KHSDGFJK', '234NKKS', 'KJNF92', 'JKHBB23B', '23B4K2HK', '234BM2NM', '23MB4']" :title="'test bar'"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
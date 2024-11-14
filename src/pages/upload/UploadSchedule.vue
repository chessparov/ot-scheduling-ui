<script lang="ts">
import {defineComponent} from 'vue'
import Constraints from "@/pages/scheduler/cards/Constraints.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";
import axios from "axios";
import {VaFile} from "vuestic-ui";

export default defineComponent({
  name: "UploadSchedule",
  components: {Launch, Optimization, Montecarlo, Constraints},

  data() {
    return {
      name: '',
      filesSchedule: [] as VaFile[],
      filesWaitingList: [] as VaFile[],
      mcCycles: 1000,
      tabuTime: 0,
      optimization: false,
      startDate: new Date(),
      errorMsg: "Formato del file non supportato, assicurarsi che si tratti di un file con estensione .xls o .xlsx",
      selectedSchedule: '',
      scheduleSource: 'archive',
      info: null,
    }
  },
  methods: {
    allowSingleFile() {
      if (this.filesSchedule.length > 1) {
        this.filesSchedule = this.filesSchedule.pop();
      }
      if (this.filesWaitingList.length > 1) {
        this.filesWaitingList = this.filesWaitingList.pop();
      }
    },
    getTabuTime(tabu: number) {
      if (typeof(tabu ==! 'undefined')) {
        if (isNaN(tabu)) {
          this.tabuTime = 0;
        } else {
          this.tabuTime = tabu;
        }
      }
    },
    getMcCycles(mc: number) {
      if (typeof(mc ==! 'undefined')) {
        if (isNaN(mc)) {
          this.mcCycles = 0;
        }
        else {
          this.mcCycles = mc;
        }
      }
    },
  }
})
</script>

<template>
  <h1 class="h1">Analizza schedula</h1>
  <div class="flex flex-col md:flex-col gap-2">
    <div class="flex flex-col md:flex-row gap-2">
      <VaCard class="w-full md:w-[45%]" style="padding: 1rem">
        <div class="flex flex-col gap-4">
          <span class="va-title" style="padding: 1rem 0 0 0; font-size: 0.85rem">Esegui simulazione Montecarlo</span>
          <span class="text-regular-medium" style="padding: 0 0 1rem 1rem">
            Scegli dall'archivio una schedula su cui ri-effettuare la simulazione con metodo Montecarlo,
            oppure caricane una in formato .xls/.xlsx.
          </span>
          <VaButtonToggle
              label="Seleziona sorgente schedula"
              v-model="scheduleSource"
                :options="[
                    {label: 'Upload', icon: 'upload', value: 'upload'},
                    {label: 'Archivio', icon: 'archive', value: 'archive'}
                  ]"
              style="padding-left: 1rem"
          />

          <div class="flex flex-row gap-6 justify-between" v-if="scheduleSource !== 'upload'">
            <VaSelect

                :options="['Schedula ottobre', 'Schedula Test', 'Novembre 23 Schedula']"
                v-model="selectedSchedule"
                placeholder="Scegli una schedula da analizzare..."
                label="Scegli una schedula"
                style="padding: 1.35rem 0 1rem 0"
            >
            </VaSelect>
          </div>
          <VaFileUpload
              v-if="scheduleSource === 'upload'"
              v-model="filesSchedule"
              dropzone
              file-types="xls,xlsx"
              type="list"
              color="#ded9d9"
              :fileIncorrectMessage="errorMsg"
              id="upload-schedula"
              @file-added="allowSingleFile"
          >
            <div class="flex flex-col gap-2" style="margin: auto; padding: 2rem">
              <VaButton class="va-button--ellipsis" style="margin: auto; min-width: 300px">
                Carica schedula da analizzare
              </VaButton>
            </div>
          </VaFileUpload>
        </div>
      </VaCard>
      <Montecarlo
          class="w-full md:w-[55%]"
          :upload="true"
          v-model:name="name"
          v-model:files.allowSingleFile="filesWaitingList"
          v-model:optimization="optimization"
          v-model:start-date="startDate"
          @mc-cycles="getMcCycles"
      />
    </div>
    <Launch
        :mc-cycles="this.mcCycles"
        :tabu-time="this.tabuTime"
        :name="name"
        :start-date="startDate"
        :optimization="false"
        :files-waiting-list="filesWaitingList"
        :files-schedule="filesSchedule"
        :analyzer="true"
    />
  </div>
</template>

<style scoped lang="scss">

#upload-schedula {
  //--va-file-upload-margin: 1vw 1vw;
  //--va-file-upload-margin: 2rem;
  --va-file-upload-dropzone-field-padding: 1.5rem 2rem;
  --va-file-upload-list-item-background-color: rgba(205, 201, 201, 0.49);
  outline: 1px solid var(--va-file-upload-list-item-background-color);
}

</style>
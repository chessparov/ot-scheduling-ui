<script setup lang="ts">
import {defineComponent, ref, watch} from 'vue'
import Constraints from "@/pages/scheduler/cards/Constraints.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";
import {useToast, VaButtonToggle, VaCard, VaFile, VaFileUpload, VaSelect} from "vuestic-ui";
import {useGlobalStore} from "@/stores/global-store";
import {useDataStore} from "@/stores/data-store";
import {Project} from "@/pages/history/types";
import {Store} from "pinia";
import {Uo} from "@/pages/settings/types";

let name = '';
let optimization = false;
let startDate = new Date();
let errorMsg = "Formato del file non supportato, assicurarsi che si tratti di un file con estensione .xls o .xlsx";

let filesWaitingList = ref<VaFile[]>([]);
let filesSchedule = ref<VaFile[]>([]);

const {init: notify} = useToast();
const selectedSchedule = ref<Project>();
const projects = useDataStore().projects as Project[];
const scheduleSource = ref('archive');

let mcCycles = ref(useGlobalStore().montecarloDefault);
let tabuTime = 0;

const allowSingleFile = () => {
  if (filesSchedule.value.length > 1) {
    filesSchedule.value.pop();
    notify({
      message: 'Non è possibile caricare più di un file',
      color: 'warning',
    })
  }
}

const getMcCycles = (mc: number) => {
  mcCycles.value = mc;
}

watch(scheduleSource, () => {
  if (scheduleSource.value === 'archive') {
    filesSchedule.value = [] as VaFile[];
  }
  else {
    selectedSchedule.value = null;
  }
})

</script>

<template>
  <h1 class="h1">Analizza schedula</h1>
  <div class="flex flex-col md:flex-col gap-2">
    <div class="flex flex-col sm:flex-row gap-2">
      <VaCard class="w-full md:w-[45%]" style="padding: 1rem">
        <div class="flex flex-col gap-4 mb-2">
          <span class="va-title" style="padding: 1rem 0 0 0; font-size: 0.85rem">Esegui simulazione Montecarlo</span>
          <span class="text-regular-medium" style="padding: 0 0 1rem 1rem">
            Scegliere dall'archivio una schedula su cui ri-effettuare la simulazione con metodo Montecarlo,
            oppure caricarne una in formato .xls/.xlsx.
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
                :options="projects"
                :text-by="(option: Project) => option.title"
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
              file-types="xls,xlsx"
              dropzone
              type="list"
              color="#ded9d9"
              :fileIncorrectMessage="errorMsg"
              id="upload-schedula"
              @file-added="allowSingleFile"
          >
            <div class="flex flex-col gap-2" style="margin: auto; padding: 2rem">
              <VaButton class="va-button--ellipsis" style="margin: auto; padding: 0 1.5rem 0 1.5rem">
                Carica schedula da analizzare
              </VaButton>
            </div>
          </VaFileUpload>
        </div>
      </VaCard>
      <Montecarlo
          class="w-full md:w-[55%]"
          :upload="true"
          :cycles="mcCycles"
          :show-toggle="false"
          v-model:name="name"
          v-model:files.allowSingleFile="filesWaitingList"
          v-model:optimization="optimization"
          v-model:start-date="startDate"
          @mc-cycles="getMcCycles"
      />
    </div>
    <Launch
        :mc-cycles="mcCycles"
        :tabu-time="tabuTime"
        :name="name"
        :start-date="startDate"
        :optimization="optimization"
        :selected-schedule="selectedSchedule"
        :files-waiting-list="filesWaitingList"
        :files-schedule.allowSingleFile="filesSchedule"
        :analyzer="true"
    />
  </div>
</template>

<style scoped lang="scss">

#upload-schedula {

  --va-file-upload-dropzone-field-padding-sm: 1rem;
  --va-file-upload-dropzone-field-padding: 1.5rem 0rem 0rem 0rem;
  --va-file-upload-list-item-background-color: rgba(205, 201, 201, 0.49);
  outline: 1px solid var(--va-file-upload-list-item-background-color);
}

</style>
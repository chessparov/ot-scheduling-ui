<script setup lang="ts">
import BindedSlider from "@/components/BindedSlider.vue";
import {useToast, VaCard, VaCardContent, VaDateInput, VaFile, VaFileUpload, VaInput, VaSwitch} from "vuestic-ui";
import {ref, toRaw} from "vue";
import axios from "axios";
import FileDownload from "js-file-download";

const props = defineProps({
  upload: {
    type: Boolean,
    required: true,
  },
  cycles: {
    type: Number,
    required: true,
  },
  showToggle: {
    type: Boolean,
    default: false,
  }
})

const { init: notify } = useToast()

const emit = defineEmits<{
  (e: 'toggle-status', value: boolean): void
  (e: 'mc-cycles', value: number): void
}>()

const name = defineModel('name')
const startDate = defineModel('startDate')
const optimization = defineModel('optimization')
const [files, modifiers] = defineModel('files',
    {
  set(value: VaFile[]) {
    if (modifiers.allowSingleFile) {
      if (value.length >= 2) {
        value.pop();
        notify({
          message: 'Non è possibile caricare più di un file',
          color: 'warning',
        })
      }
      return value
    }
  }
})

let cycles = ref(props.cycles)
let visibility = props.upload ? 'visible' : 'hidden';
let display = props.showToggle ? 'flex' : 'none';
let btnDisabled = ref(false);


function cyclesNumber(newValue: number) {
  cycles.value = newValue;
  emit("mc-cycles", cycles.value);
}

async function onClean() {

  if (files.value.length === 0) {
    notify({
      message: 'Nessuna lista caricata',
      color: 'warning'
    })
    return;
  }

  const formData = new FormData();
  formData.append('file', files.value[0], 'lista.xlsx');
  btnDisabled.value = true;

  await axios
      .post('http://localhost:8000/api/scheduler/clean-list',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob'
          })
      .then((res) => {
        FileDownload(res.data, `lista_filtrata.xlsx`)
        btnDisabled.value = false;
      })
      .catch((error) => {
        if (error.response.status == 400) {
          notify({
            message: 'File non valido',
            color: 'warning'
          })
        }
        else {
          notify({
            message: 'Errore lato server',
            color: 'danger'
          })
        }
      })
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <section class="flex flex-col gap-4">
        <VaInput
            v-model="name"
            placeholder="Inserisci il nome della schedula"
            label="Nome schedula"
        />
        <VaDateInput
            label="Data inizio schedulazione"
            v-model="startDate" />
        <div class="flex flex-col gap-2" >
          <BindedSlider
              :slider-label="'Montecarlo'"
              :slider-min="1"
              :slider-max="10000"
              :slider-value="cycles"
              :input-inner-label="'Cicli'"
              @update="cyclesNumber"
          />
          <span style="padding: 1rem">
            Numero di cicli consigliato: 1000
          </span>
        </div>
        <div class="flex flex-row w-full sm:w-[45%]" id="toggle" >
          <VaSwitch
            class="mt-4"
            v-model="optimization"
            style="font-size: 1rem; visibility: v-bind(visibility);"
            left-label
            size="small"
          >
          <span class="va-title" style="color: #154EC1; visibility: v-bind(visibility);">
            Ottimizzazione
          </span>
          </VaSwitch>
        </div>
        <div class="flex flex-col gap-4" >
          <VaCollapse
              class="min-w-96 gap-4"
              header="Pulizia lista attesa"
              icon="cleaning_services"
          >
            <span>
              La lista viene filtrata in modo che contenga solo interventi assegnati alla line di chirurgia robotica.
              <br>
              Il filtro è applicato controllando che in almeno una tra le colonne "Blocco" e "Gruppo Lista"
              compaia l'assegnazione al CMR di chirurgia robotica.
              <br>
              La lista viene poi ordinata per "Priorità" e "Due Date" in questo preciso ordine.
            </span>
            <br>
            <div class="flex flex-row gap-4">
<!--              <VaProgressCircle v-if="btnDisabled" indeterminate size="small" style="margin-top: auto; margin-bottom: auto;"/>-->
              <VaButton class="my-4 gap-4" @click="onClean" :disabled="btnDisabled" :loading="btnDisabled">
                Esegui pulizia
              </VaButton>
            </div>
          </VaCollapse>
          <VaFileUpload
              :hidden="!upload"
              v-model="files as VaFile[]"
              file-types="xlsx,xls"
              uploadButtonText="Carica Lista Attesa"
          />
        </div>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="css">

#toggle {
  visibility: v-bind(visibility);
  display: v-bind(display);
}
</style>

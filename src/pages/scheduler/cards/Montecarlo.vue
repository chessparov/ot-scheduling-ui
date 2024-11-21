<script setup lang="ts">
import BindedSlider from "@/components/BindedSlider.vue";
import {useToast, VaCard, VaCardContent, VaDateInput, VaFile, VaFileUpload, VaInput, VaSwitch} from "vuestic-ui";
import {ref} from "vue";

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
const optimization: boolean = defineModel('optimization')
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


function cyclesNumber(newValue: number) {
  cycles = newValue;
  emit("mc-cycles", cycles);
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <section class="flex flex-col gap-4">
        <VaInput
            v-model="name as string"
            placeholder="Inserisci il nome della schedula"
            label="Nome schedula"
        />
        <VaDateInput
            label="Data inizio schedulazione"
            v-model="startDate as Date" />
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
          <VaFileUpload
              :hidden="!upload"
              v-model="files as VaFile[]"
              file-types="xlsx,xls"
              uploadButtonText="Carica Lista Attesa"
          />
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
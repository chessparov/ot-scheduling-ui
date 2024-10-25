<script lang="ts">
import { defineComponent } from "vue";
import {
  VaCardContent,
  VaFileUploadList,
  VaFileUploadListItem,
} from "vuestic-ui";
import BindedSlider from "@/components/BindedSlider.vue";

export default defineComponent({
  name: "Montecarlo",
  components: {
    VaFileUploadListItem,
    VaFileUploadList,
    BindedSlider,
    VaCardContent,
  },
  props: {
    upload: Boolean,
    toggleOptimization: Boolean,
  },
  data() {
    return {
      scheduleName: "",
      cycles: 1000,
      date: new Date(),
      files: [],
      optimization: false,
      visibility: this.toggleOptimization ? "visible" : "hidden",
      display: this.toggleOptimization ? "flex" : "none",
    };
  },
  methods: {
    optimizationStatus() {
      this.$emit("toggle-status", this.optimization);
    },
    cyclesNumber(newValue: number) {
      this.cycles = newValue;
      this.$emit("mc-cycles", this.cycles);
    },
    allowSingleFile() {
      if (this.files.length > 1) {
        this.files = this.files.pop();
      }
    },
  },
});
</script>

<template>
  <VaCard class="w-full sm:w-[55%]">
    <VaCardContent>
      <section class="flex flex-col gap-4">
        <VaInput
          v-model="scheduleName"
          placeholder="Inserisci il nome della schedula"
          label="Nome schedula"
        />
        <VaDateInput label="Data inizio schedulazione" v-model="date" />
        <div class="flex flex-col gap-2">
          <BindedSlider
            :slider-label="'Montecarlo'"
            :slider-min="1"
            :slider-max="10000"
            :slider-value="cycles"
            :input-inner-label="'Cicli'"
            @update="cyclesNumber"
          />
          <span style="padding: 1rem"> Numero di cicli consigliato: 1000 </span>
        </div>
        <div class="flex flex-row w-full sm:w-[45%]" id="toggle">
          <VaSwitch
            class="mt-4"
            v-model="optimization"
            style="font-size: 1rem; visibility: v-bind(visibility)"
            @input="optimizationStatus"
            left-label
            size="small"
          >
            <span
              class="va-title"
              style="color: #154ec1; visibility: v-bind(visibility)"
            >
              Ottimizzazione
            </span>
          </VaSwitch>
        </div>
        <VaFileUpload
          :hidden="!upload"
          v-model="files"
          file-types="xlsx,xls"
          uploadButtonText="Carica Lista Attesa"
          @file-added="allowSingleFile"
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

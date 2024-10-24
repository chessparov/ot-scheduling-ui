<script lang="ts">
import {defineComponent} from 'vue'
import Constraints from "@/pages/scheduler/cards/Constraints.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";

export default defineComponent({
  name: "UploadSchedule",
  components: {Launch, Optimization, Montecarlo, Constraints},

  data() {
    return {
      files: [],
      mcCycles: 1000,
      tabuTime: 120,
      optimization: false,
      errorMsg: "Formato del file non supportato, assicurarsi che si tratti di un file con estensione .xls o .xlsx"
    }
  },
  methods: {
    allowSingleFile() {
      if (this.files.length > 1) {
        this.files = this.files.pop();
      }
    },
    optStatus(updatedOptimization: boolean) {
      this.optimization = updatedOptimization;
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
  <h1 class="h1">Carica schedula</h1>
  <div class="flex flex-col md:flex-col gap-2">
    <div class="flex flex-col md:flex-row gap-2">
      <Montecarlo
          :upload="false"
          :toggle-optimization="false"
          @toggle-status="optStatus"
          @mc-cycles="getMcCycles"
      />
      <VaCard class="w-full sm:w-[45%]">
        <VaFileUpload
            v-model="files"
            dropzone
            file-types="xls,xlsx"
            type="list"
            color="#ded9d9"
            :fileIncorrectMessage="errorMsg"
            style="--va-file-upload-margin: 4rem"
            id="upload-schedula"
            @file-added="allowSingleFile"

        >
          <div class="flex flex-col gap-2" style="width:25vw; margin: auto; padding: 0.5rem">
            <VaButton class="va-button--ellipsis" style="margin: 0.7rem">
              Carica schedula da analizzare
            </VaButton>
          </div>
        </VaFileUpload>
      </VaCard>
    </div>
    <Launch
        :mc-cycles="this.mcCycles"
        :tabu-time="this.tabuTime"
    />
  </div>
</template>

<style scoped lang="scss">

#upload-schedula {
  --va-file-upload-margin: 1vw 1vw;
  --va-file-upload-dropzone-field-padding: 1.5rem 20vw;
  --va-file-upload-list-item-background-color: rgba(200, 196, 196, 0.25)
}

</style>
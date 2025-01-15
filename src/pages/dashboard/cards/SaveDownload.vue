<script lang="ts">

import {useUserStore} from "@/stores/user-store";
import {useScheduleStore} from "@/stores/global-store";
import FileDownload from 'js-file-download'
import {useToast} from "vuestic-ui";
import axios from "axios";

export default {
  props: {
    changesMade: {
      default: false,
      type: Boolean,
    },
  },
  emits: {
    changesSaved: {

    }
  },
  data() {
    return {
      userStore: useUserStore(),
      scheduleStore: useScheduleStore(),
      init: useToast(),
    }
  },
  methods: {
    async onDownload(){
      await axios
          .get('http://localhost:8000/api/scheduler/download-schedule/' + this.scheduleStore.scheduleId.toString(),
              {
                responseType: 'blob'
              })
          .then((res) => {
            FileDownload(res.data, `${this.scheduleStore.scheduleName}.xlsx`)
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.init.notify({
                message: 'Richiesta non valida. Schedula inesistente',
                color: 'warning'
              })
            }
            else {
              this.init.notify({
                message: 'Errore lato server',
                color: 'danger'
              })
            }
          })
    },
    async onUpdate() {
      await axios
          .put('http://localhost:8000/api/scheduler/update-project/' + this.scheduleStore.scheduleId.toString(),
              {schedule_data: this.scheduleStore.scheduleData, modified: true},
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
          .then((res) => {
            this.init.notify({
              message: 'Schedula modificata con successo',
              color: 'success'
            })
            // After the schedule has been saved, turn off the save button until new changes are made
            this.$emit('changesSaved');
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.init.notify({
                message: 'Richiesta non valida. Schedula inesistente',
                color: 'warning'
              })
            }
            else {
              this.init.notify({
                message: 'Errore lato server',
                color: 'danger'
              })
            }
          })
    }
  }
}
</script>

<template>
  <VaCard>
    <div class="flex flex-col md:flex-row gap-2" style="justify-content: space-between">
      <div class="flex flex-col md:flex-row gap-2" v-if="userStore.admin">
        <VaButton
            :disabled="!changesMade"
            icon="check"
            class="calendar-button"
            @click="onUpdate"
        >
          Salva Modifiche
        </VaButton>
<!--        <VaButton-->
<!--            icon="delete"-->
<!--            color="danger"-->
<!--            class="calendar-button"-->
<!--        >-->
<!--          Elimina-->
<!--        </VaButton>-->
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <VaButton
            icon="download"
            class="calendar-button"
            @click="onDownload"
        >
          Download
        </VaButton>

      </div>
    </div>
  </VaCard>
</template>

<style scoped lang="scss">

.calendar-button {
  min-width: 10rem;
}

</style>
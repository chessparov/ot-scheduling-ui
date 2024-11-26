<script lang="ts">

import {useUserStore} from "@/stores/user-store";
import axios from "axios";
import { useScheduleStore} from "@/stores/global-store";
import FileDownload from 'js-file-download'
import {useToast} from "vuestic-ui";

export default {
  props: {
    modifiedSchedule: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      saveBtnStatus: false,
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
            console.log(res)})
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
              {schedule_data: this.scheduleStore.scheduleData},
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
            :disabled="!modifiedSchedule"
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
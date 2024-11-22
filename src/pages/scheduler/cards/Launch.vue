<script lang="ts">

import {defineComponent, PropType} from "vue";
import {useToast, VaCardContent, VaFile} from "vuestic-ui";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/user-store";
import {useScheduleStore} from "@/stores/global-store";
import {Project} from "@/pages/history/types";


export default defineComponent ({
  name: "Launch",
  props: {
    name: String,
    startDate: Date,
    optimization: Boolean,
    mcCycles: Number,
    tabuTime: Number,
    filesWaitingList: Array,
    filesSchedule: Array,
    analyzer: Boolean,
    selectedSchedule: {
      type: Object as PropType<Project | null>,
      required: false,
    }
  },
  components: {VaCardContent},
  data () {
    return {
      percent: 0,
      estimatedTime: this.mcCycles + this.tabuTime,
      compTime: 0,
      currentTime: 0,
      toast: useToast(),
    }
  },
  methods: {
    getLabel() {
      const hours = Math.floor(this.estimatedTime / (60 * 60)).toString();
      const minutes = Math.floor((this.estimatedTime % (60 * 60)) / 60).toString();
      const seconds = ((this.estimatedTime % (60 * 60)) % 60).toString();
      return Number(hours) >= 1
          ? hours + ' ore ' + minutes + ' min ' + seconds + ' secondi'
          : Number(minutes) >= 1 ? minutes + ' min ' + seconds + ' secondi'
          : seconds + ' secondi';
    },
    setProgressBar() {
      if (this.currentTime < this.compTime) {
        this.percent = Math.round(((this.currentTime) / this.compTime) * 100);
        this.currentTime++;

      }
      else if (this.currentTime == this.compTime) {
        this.percent = 95;
      }
    },

    requestMsc() {

      if (!this.name) {
        return;
      }
      if (!this.filesWaitingList) {
        return;
      }
      if (this.filesSchedule?.length === 0 && this.selectedSchedule === null) {
        return;
      }

      this.compTime = this.estimatedTime;

      let formData = new FormData();

      formData.append('title', this.name);
      formData.append('author', useUserStore().email);
      formData.append('startDate', this.startDate?.toUTCString());
      formData.append('optimization', this.optimization);
      formData.append('mcCycles', this.mcCycles);
      formData.append('tabuTime', this.tabuTime);
      formData.append('file', this.filesWaitingList[0], 'lista.xlsx');

      let progressBarTimeOut = setInterval(this.setProgressBar, 1000);

      if (!this.analyzer) {

        if (this.filesWaitingList.length == 1) {
          axios
              .post('http://localhost:8000/api/scheduler/new-schedule',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
              .then(response => {
                useScheduleStore().updateSchedule(response.data, this.name);
                this.currentTime = 0;
                clearInterval(progressBarTimeOut);
                router.push({name: 'dashboard'});
              })
              .catch(error => {
                if (error.response.status === 400) {
                  this.toast.init({ message: "File non valido", color: "danger" })
                }
                else {
                  this.toast.init({ message: "Errore lato server", color: "danger" })
                }
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
              })
        }
        else {
          this.toast.init({ message: "Non è possibile caricare più di un file!", color: "danger" })
          clearInterval(progressBarTimeOut);
          this.currentTime = 0;
        }
      }
      else {
        if (this.filesSchedule?.length === 0) {
          formData.append('scheduleId', this.selectedSchedule?.id);
          axios
              .post('http://localhost:8000/api/scheduler/analyze',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
              .then(response => {
                useScheduleStore().updateSchedule(response.data, this.name);
                this.currentTime = 0;
                clearInterval(progressBarTimeOut);
                router.push({name: 'dashboard'});
              })
              .catch(error => {
                if (error.response.status === 400) {
                  this.toast.init({message: "File non valido", color: "danger"})
                } else {
                  this.toast.init({message: "Errore lato server", color: "danger"})
                }
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
              })
          }
        else if (this.filesSchedule.length === 1) {
          formData.append('schedule', this.filesSchedule[0], 'schedula.xlsx');
          axios
              .post('http://localhost:8000/api/scheduler/analyze',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
              .then(response => {
                useScheduleStore().updateSchedule(response.data, this.name);
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
                router.push({name: 'dashboard'});
              })
              .catch(error => {
                if (error.response.status === 400) {
                  this.toast.init({message: "File non valido", color: "danger"})
                } else {
                  this.toast.init({message: "Errore lato server", color: "danger"})
                }
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
              })
        }
        else {
          this.toast.init({message: "Non è possibile caricare più di un file!", color: "danger"})
          clearInterval(progressBarTimeOut);
          this.currentTime = 0;
        }
      }
    }
  },
  updated() {
    this.estimatedTime = this.mcCycles + this.tabuTime;
  }
})
</script>

<template>
  <VaCard class="w-full sm:w-[100%]">
    <VaCardContent>
        <div class="launcher-wrapper flex flex-col gap-4">
          <span>
            Tempo stimato: {{ getLabel() }}
          </span>
          <VaProgressBar
              v-model="percent"
              :max="100"
              :rounded="false"
              color="#7294d9"
              size="1.3rem"
              content-inside
              show-percent
          />
          <VaButton @click="requestMsc()">
            Ottieni schedula
          </VaButton>
        </div>
    </VaCardContent>
  </VaCard>
</template>

<style scoped lang="scss">

.launcher-wrapper {
  padding: 1%;
  width: 100%;
  margin: auto;
}
</style>
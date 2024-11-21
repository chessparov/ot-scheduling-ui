<script lang="ts">

import {defineComponent} from "vue";
import {useToast, VaCardContent, VaFile} from "vuestic-ui";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/user-store";
import {useScheduleStore} from "@/stores/global-store";


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
      this.compTime = this.estimatedTime;

      let formData = new FormData();
      let progressBarTimeOut = setInterval(this.setProgressBar, 1000);

      formData.append('title', this.name);
      formData.append('author', useUserStore().email);
      formData.append('startDate', this.startDate?.toUTCString());
      formData.append('optimization', this.optimization);
      formData.append('mcCycles', this.mcCycles);
      formData.append('tabuTime', this.tabuTime);

      if (!this.analyzer) {

        if (!this.filesWaitingList) {
          return;
        }

        else if (this.filesWaitingList.length == 1) {

          formData.append('file', this.filesWaitingList[0], 'lista.xlsx');

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
                this.currentTime = 0;
                clearInterval(progressBarTimeOut);
              })
        }
        else {
          this.toast.init({ message: "Non è possibile caricare più di un file!", color: "danger" })
        }
      }
      else {

        if (!this.filesSchedule) {
          return;
          }

        else if (this.filesSchedule.length == 1) {
          formData.append('schedule', this.filesSchedule[0])
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
                this.currentTime = 0;
                clearInterval(progressBarTimeOut);
              })
        }
        else {
          this.toast.init({message: "Non è possibile caricare più di un file!", color: "danger"})
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
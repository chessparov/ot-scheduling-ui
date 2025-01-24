<script lang="ts">

import {defineComponent, PropType} from "vue";
import {useToast, VaCardContent, VaFile} from "vuestic-ui";
import axios from "axios";
import {useUserStore} from "@/stores/user-store";
import {useGlobalStore, useOptParamsStore, useScheduleStore} from "@/stores/global-store";
import {Project} from "@/pages/history/types";
import {useDataStore} from "@/stores/data-store";
import { useProjects } from '../../history/composables/useProjects'


export default defineComponent ({
  name: "Launch",
  props: {
    name: String,
    startDate: Date,
    optimization: Boolean,
    mcCycles: {
      type: Number,
      required: true
    },
    tabuTime: {
      type: Number,
      required: true,
    },
    filesWaitingList:
        {
          type: Array,
          required: true,
        },
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
      estimatedTime: 4 + 0.006 * this.mcCycles + this.tabuTime,
      compTime: 0,
      currentTime: 0,
      btnDisabled: false,
      toast: useToast(),
    }
  },
  methods: {
    getLabel() {
      const hours = Math.floor(this.estimatedTime / (60 * 60)).toString();
      const minutes = Math.floor((this.estimatedTime % (60 * 60)) / 60).toString();
      const seconds = Math.round((this.estimatedTime % (60 * 60)) % 60).toString();
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
        this.percent = 99;
      }
    },
    requestMsc() {

      let { add } = useProjects();

      if (!this.name) {
        this.toast.init({ message: "Inserire un nome valido!", color: "warning" });
        return;
      }
      if (this.filesSchedule?.length === 0 && this.selectedSchedule === null) {
        this.toast.init({ message: "Caricare una schedula o sceglierne una dall'archivio!", color: "warning" })
        return;
      }
      if (this.filesWaitingList.length !== 1)  {
        this.toast.init({ message: "Caricare una lista d'attesa!", color: "warning" })
        return;
      }
      this.btnDisabled = true;
      this.compTime = this.estimatedTime;

      let formData = new FormData();
      let scheduleStats = JSON.stringify({
        'mcCycles': this.mcCycles,
        'tabuTime': this.tabuTime,
        'optimization': this.optimization,
        'alpha': this.optimization ? useOptParamsStore().optParams[0] : 0,
        'beta': this.optimization ? useOptParamsStore().optParams[1] : 0,
        'epsilon': this.optimization ? useOptParamsStore().optParams[2] : 0,
        'theta': this.optimization ? useOptParamsStore().optParams[3] : 0,
        'creationDate': new Date(),
        'computationTime': 0,
        'author': useUserStore().email
      });

      formData.append('title', this.name);
      formData.append('author', useUserStore().email);
      formData.append('startDate', this.startDate?.toLocaleDateString());
      formData.append('optimization', this.optimization);
      formData.append('mcCycles', this.mcCycles);
      formData.append('tabuTime', this.tabuTime);
      formData.append('optParams', this.optimization ? useOptParamsStore().optParams : [0, 0, 0, 0])
      formData.append('file', this.filesWaitingList[0], 'lista.xlsx');
      formData.append('schedule_stats', scheduleStats)

      let progressBarTimeOut = setInterval(this.setProgressBar, 1000);
      useDataStore().fetchProjects();

      const scheduleStore = useScheduleStore();
      if (!this.analyzer) {
        axios
            .post('http://localhost:8000/api/scheduler/new-schedule',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
            .then(response => {
              scheduleStore.scheduleId = response.data.id;
              scheduleStore.scheduleName = response.data.title;
              scheduleStore.scheduleData = response.data.schedule_data;
              scheduleStore.scheduleStats = response.data.schedule_stats;
              scheduleStore.scheduleNote = response.data.note;
              scheduleStore.scheduleReport = response.data.mc_results;
              scheduleStore.modified = response.data.modified;
              scheduleStore.scheduleStartDate = response.data.start_date;
              this.currentTime = 0;
              this.percent = 0;
              clearInterval(progressBarTimeOut);
              this.btnDisabled = false;

              let newProject = response.data as Project;
              add(newProject);
              this.$router.push({name: 'dashboard', replace: true}).catch(failure => {console.log(failure)});
            })
            .catch(error => {
              this.btnDisabled = false;
              if (error.response.status === 400) {
                this.toast.init({ message: `File non valido:\n${error.response.data}`, color: "danger" })
              }
              else {
                this.toast.init({ message: "Errore lato server", color: "danger" })
              }
              clearInterval(progressBarTimeOut);
              this.currentTime = 0;
              this.percent = 0;
            })
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
                scheduleStore.scheduleId = response.data.id;
                scheduleStore.scheduleName = response.data.title;
                scheduleStore.scheduleData = response.data.schedule_data;
                scheduleStore.scheduleStats = response.data.schedule_stats;
                scheduleStore.scheduleNote = response.data.note;
                scheduleStore.scheduleReport = response.data.mc_results;
                scheduleStore.modofied = response.data.modified;
                scheduleStore.scheduleStartDate = response.data.start_date;
                this.currentTime = 0;
                this.percent = 0;
                clearInterval(progressBarTimeOut);
                this.btnDisabled = false;

                let newProject = response.data as Project;
                add(newProject);
                this.$router.push({name: 'dashboard', replace: true}).catch(failure => {console.log(failure)});
              })
              .catch(error => {
                this.btnDisabled = false;
                if (error.response.status === 400) {
                  this.toast.init({ message: `File non valido:\n${error.response.data}`, color: "danger" })
                }
                else {
                  this.toast.init({message: "Errore lato server", color: "danger"})
                }
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
                this.percent = 0;
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
                scheduleStore.scheduleId = response.data.id;
                scheduleStore.scheduleName = response.data.title;
                scheduleStore.scheduleData = response.data.schedule_data;
                scheduleStore.scheduleStats = response.data.schedule_stats;
                scheduleStore.scheduleNote = response.data.note;
                scheduleStore.scheduleReport = response.data.mc_results;
                scheduleStore.modified = response.data.modified;
                scheduleStore.scheduleStartDate = response.data.start_date;
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
                this.percent = 0;

                this.btnDisabled = false;

                let newProject = response.data as Project;
                add(newProject);
                this.$router.push({name: 'dashboard', replace: true}).catch(failure => {console.log(failure)});
              })
              .catch(error => {
                this.btnDisabled = false;
                if (error.response.status === 400) {
                  this.toast.init({ message: `File non valido:\n${error.response.data}`, color: "danger" })
                }
                else {
                  this.toast.init({message: "Errore lato server", color: "danger"})
                }
                clearInterval(progressBarTimeOut);
                this.currentTime = 0;
                this.percent = 0;
              })
        }
        else {
          this.toast.init({message: "Non è possibile caricare più di un file!", color: "danger"})
          clearInterval(progressBarTimeOut);
          this.currentTime = 0;
          this.percent = 0;
        }
      }
    }
  },
  updated() {
    this.estimatedTime = 4 + 0.006 * this.mcCycles + this.tabuTime;
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
          <VaButton @click="requestMsc()" :disabled="btnDisabled" :loading="btnDisabled">
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
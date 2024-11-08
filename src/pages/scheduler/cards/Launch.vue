<script lang="ts">

import {defineComponent} from "vue";
import {VaCardContent} from "vuestic-ui";
import axios from "axios";
import router from "@/router";

export default defineComponent ({
  name: "Launch",
  props: {
    name: String,
    startDate: Date,
    optimization: Boolean,
    mcCycles: Number,
    tabuTime: Number,
    files: Array,
  },
  components: {VaCardContent},
  data () {
    return {
      percent: 0,
      estimatedTime: this.mcCycles + this.tabuTime,
      compTime: 0,
      currentTime: 0,
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

      let progressBarTimeOut = setInterval(this.setProgressBar, 1000);

      if (this.files.length == 1) {

        let formData = new FormData();
        formData.append('file', this.files[0], 'lista.xlsx');
        formData.append('name', this.name);
        formData.append('startDate', this.startDate?.toUTCString());
        formData.append('optimization', this.optimization);
        formData.append('mcCycles', this.mcCycles);
        formData.append('tabuTime', this.tabuTime);

        axios
            .post('http://localhost:8000/api/scheduler/new-schedule',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
            .then(response => {
              clearTimeout(progressBarTimeOut);
              router.push({name: 'dashboard'});
            })
            .catch(error => {
              console.log(error)
            })
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
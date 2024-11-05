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
      percent: 60,
      estimatedTime: this.mcCycles + this.tabuTime,

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
    requetMsc() {
      axios
          .get('http://localhost:8000/api/scheduler', {params: {
              name: this.name,
              startDate: this.startDate,
              optimization: this.optimization,
              mcCycles: this.mcCycles,
              tabuTime: this.tabuTime,
              files: this.files,
            }})
          .then(response => {
            console.log(response);
            router.push({name: 'dashboard'});
          })
          .catch(error => {console.log(error)})
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
          <VaButton @click="requetMsc">
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
<script lang="ts">
import { defineComponent } from "vue";
import { VaCardContent } from "vuestic-ui";

export default defineComponent({
  name: "Launch",
  props: {
    mcCycles: Number,
    tabuTime: Number,
  },
  components: { VaCardContent },
  data() {
    return {
      percent: 60,
      estimatedTime: this.mcCycles + this.tabuTime,
    };
  },
  methods: {
    getLabel() {
      const hours = Math.floor(this.estimatedTime / (60 * 60)).toString();
      const minutes = Math.floor(
        (this.estimatedTime % (60 * 60)) / 60,
      ).toString();
      const seconds = ((this.estimatedTime % (60 * 60)) % 60).toString();
      return Number(hours) >= 1
        ? hours + " ore " + minutes + " min " + seconds + " secondi"
        : Number(minutes) >= 1
          ? minutes + " min " + seconds + " secondi"
          : seconds + " secondi";
    },
  },
  updated() {
    this.estimatedTime = this.mcCycles + this.tabuTime;
  },
});
</script>

<template>
  <VaCard class="w-full sm:w-[100%]">
    <VaCardContent>
      <div class="launcher-wrapper flex flex-col gap-4">
        <span> Tempo stimato: {{ getLabel() }} </span>
        <VaProgressBar
          v-model="percent"
          :max="100"
          :rounded="false"
          color="#7294d9"
          size="1.3rem"
          content-inside
          show-percent
        />
        <VaButton :to="{ name: 'dashboard' }"> Ottieni schedula </VaButton>
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

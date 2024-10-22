<script lang="ts">

import {defineComponent} from "vue";
import {VaCardContent} from "vuestic-ui";

export default defineComponent ({
  name: "Launch",
  components: {VaCardContent},
  data () {
    return {
      percent: 80,
      estimatedTime: 10
    }
  }
})
</script>

<template>
  <VaCard class="w-full sm:w-[100%]">
    <VaCardContent>
        <div class="launcher-wrapper flex flex-col gap-4">
          <span>
            Tempo stimato: {{ estimatedTime }} minuti
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
          <VaButton>
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
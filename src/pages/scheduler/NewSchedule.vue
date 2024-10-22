<script lang="ts">
import {defineComponent} from 'vue'
import Optimization from "@/pages/scheduler/cards/Optimization.vue";
import Montecarlo from "@/pages/scheduler/cards/Montecarlo.vue";
import Launch from "@/pages/scheduler/cards/Launch.vue";

export default defineComponent({
  name: "NewSchedule",
  components: {Launch, Montecarlo, Optimization},
  data() {
    return {

    }
  }
})
</script>

<template>
  <h1 class="h1">Nuova schedula</h1>
  <div class="flex flex-col md:flex-col gap-2">
    <div class="flex flex-col md:flex-row gap-2">
      <Montecarlo/>
      <Optimization/>
    </div>
    <Launch/>
  </div>
</template>

<style scoped lang="scss">

</style>
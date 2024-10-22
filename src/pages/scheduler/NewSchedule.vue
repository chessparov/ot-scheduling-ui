<script lang="ts">
import {defineComponent} from 'vue'
import Optimization from "@/pages/dashboard/cards/Optimization.vue";
import Montecarlo from "@/pages/dashboard/cards/Montecarlo.vue";

export default defineComponent({
  name: "NewSchedule",
  components: {Montecarlo, Optimization},
  data() {
    return {

    }
  }
})
</script>

<template>
  <h1 class="h1">Nuova schedula</h1>
  <div class="flex flex-col md:flex-row gap-2">
    <Montecarlo/>
    <Optimization/>
  </div>
</template>

<style scoped lang="scss">

</style>
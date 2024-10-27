<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Stats",
  data() {
    return {
      arrNumber: [133, 124, 128, 135, 130, 132, 130, 137, 127, 136, 133, 130, 124, 132, 131]
    }
  }
})
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <VaTextarea/>
  </div>
</template>

<style scoped lang="scss">

</style>
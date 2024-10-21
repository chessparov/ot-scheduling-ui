<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GreetingsMessage",

  data() {
    return {}
  },
  props: {
    username: String,
  }
})
</script>

<template>
  <span class="greet-message">
    Ciao, {{ username }}
  </span>
</template>

<style scoped lang="css">

.greet-message {
  padding-right: 1.3rem;
  font-size: 1.2rem;
}
</style>
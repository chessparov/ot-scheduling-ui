<script lang="ts">
import {defineComponent} from 'vue'
import {useUserStore} from "@/stores/user-store";

export default defineComponent({
  name: "GreetingsMessage",

  data() {
    return {
      user: useUserStore()
    }
  },
})
</script>

<template>
  <span class="greet-message">
    Ciao, {{ user.name }}
  </span>
</template>

<style scoped lang="css">

.greet-message {
  font-size: 1.2rem;
}
</style>
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
    Ciao, {{ user.userName }}
  </span>
</template>

<style scoped lang="css">

.greet-message {
  padding-right: 1.3rem;
  font-size: 1.2rem;
}
</style>
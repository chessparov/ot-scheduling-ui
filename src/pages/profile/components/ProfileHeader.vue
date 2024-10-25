<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user-store";

export default defineComponent({
  name: "ProfileHeader",
  data() {
    return {
      store: useUserStore(),
    };
  },
});
</script>

<template>
  <VaAvatar
    size="large"
    src="../../../../../public/blank-profile.png"
  ></VaAvatar>
  <div class="flex flex-col justify-center">
    <h2 class="text-[28px] md:text-[32px] leading-10 font-bold">
      {{ store.userName }} {{ store.surname }}
    </h2>
    <div class="flex space-x-1 text-[13px] leading-4">
      <p>Account creato il</p>
      <p>{{ store.memberSince }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

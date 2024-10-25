<script lang="ts">

import {defineComponent, ref} from 'vue'
import EditNameModal from "@/pages/profile/modals/EditNameModal.vue";
import Settings from "@/pages/profile/settings/Settings.vue";
import ResetPasswordModal from "@/pages/profile/modals/ResetPasswordModal.vue";
import ProfileHeader from "@/pages/profile/components/ProfileHeader.vue";
import EditEmailModal from "@/pages/profile/modals/EditEmailModal.vue";

export default defineComponent({
  name: "Profile",
  components: {ProfileHeader, ResetPasswordModal, EditEmailModal, EditNameModal, Settings},
  data() {
    return {
      isEditNameModalOpen: ref(false),
      isResetPasswordModalOpen: ref(false),
      isEmailModalOpen: ref(false),
      fieldToModify: '',
    }
  },
  methods: {
    openNameModal(field: string) {
      this.fieldToModify = field;
      this.isEditNameModalOpen = true;
    },
    openResetPasswordModal() {
      this.isResetPasswordModalOpen = true;
    },
    openEmailModal() {
      this.isEmailModalOpen = true;
    }
  }
})
</script>

<template>
  <h1 class="va-h1">Profilo</h1>
  <div class="flex flex-col p-4 space-y-10 bg-backgroundSecondary rounded-lg" style="padding: 1.5rem;">
    <div class="flex space-x-5">
      <ProfileHeader/>
    </div>
    <div class="space-y-4 md:space-y-6">
      <Settings
          @openNameModal="openNameModal"
          @openResetPasswordModal="openResetPasswordModal"
          @openEmailModal="openEmailModal"
      />
    </div>
  </div>
  <EditNameModal v-if="isEditNameModalOpen" @cancel="isEditNameModalOpen = false" :field="fieldToModify" />
  <EditEmailModal v-if="isEmailModalOpen" @cancel="isEmailModalOpen = false" field="Email"/>
  <ResetPasswordModal v-if="isResetPasswordModalOpen" @cancel="isResetPasswordModalOpen = false"/>
</template>

<style scoped lang="scss">

</style>
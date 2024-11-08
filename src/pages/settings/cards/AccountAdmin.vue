<script setup lang="ts">
import { ref } from 'vue'
import AddUser from "@/pages/settings/components/AddUser.vue";
import ViewUsers from "@/pages/settings/components/ViewUsers.vue";
import EditUserForm from '../components/EditUserForm.vue'
import {useUsers} from "@/pages/settings/composables/useUsers";
import {User} from "@/pages/settings/types";
import {useModal, useToast} from "vuestic-ui";
import ResetPassword from "@/pages/settings/components/ResetPassword.vue";


const { users, isLoading, filters, sorting, pagination, ...usersApi } = useUsers()
const userToEdit = ref<User | null>(null)

const doShowEditUserModal = ref(false)
const doShowResetPasswordModal = ref(false)

const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showResetPasswordModal = (user: User) => {
  userToEdit.value = user
  doShowResetPasswordModal.value = true
}

const showAddUserModal = () => {
  userToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserSaved = async (user: User) => {
  if (userToEdit.value) {
    await usersApi.update(user)
    notify({
      message: `${user.name} modificato con successo`,
      color: 'success',
    })
  } else {
    usersApi.add(user)
    notify({
      message: `${user.name} è stato creato`,
      color: 'success',
    })
  }
}

const onUserDelete = async (user: User) => {
  await usersApi.remove(user)
  notify({
    message: `${user.name} è stato eliminato`,
    color: 'success',
  })
}
const passwordReset = async (user: User) => {
  if (userToEdit.value) {
    await usersApi.update(user)
    notify({
      message: `Password dell'utente "${user.name}" ripristinata con successo`,
      color: 'success',
    })
  } else {
    usersApi.add(user)
    notify({
      message: `${user.name} è stato creato`,
      color: 'success',
    })
  }
}


const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Sono state apportate modifiche non salvate, procedere comunque?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <div class="flex flex-col p-4 bg-backgroundSecondary rounded-lg">
    <h3 class="h3 mb-6">Amministra accont</h3>
    <VaCollapse header="Visualizza lista account">
      <ViewUsers
          v-model:sorting-order="sorting.sortingOrder"
          v-model:sort-by="sorting.sortBy"
          :loading="isLoading"
          :users="users"
          :pagination="pagination"
          @editUser="showEditUserModal"
          @deleteUser="onUserDelete"
          @resetPassword="showResetPasswordModal"
      />
      <VaModal
          v-slot="{ cancel, ok }"
          v-model="doShowEditUserModal"
          size="small"
          mobile-fullscreen
          close-button
          hide-default-actions
          :before-cancel="beforeEditFormModalClose"
      >
        <h1 class="va-h5">{{ userToEdit ? 'Modifica utente' : 'Aggiungi utente' }}</h1>
        <EditUserForm
            ref="editFormRef"
            :user="userToEdit"
            :save-button-label="userToEdit ? 'Salva' : 'Aggiungi'"
            @close="cancel"
            @save="
              (user) => {
                onUserSaved(user)
                ok()
              }
            "
        />
      </VaModal>
      <VaModal
          v-slot="{ cancel, ok }"
          v-model="doShowResetPasswordModal"
          size="small"
          mobile-fullscreen
          close-button
          hide-default-actions
          :before-cancel="beforeEditFormModalClose"
      >
        <h1 class="va-h5">Ripristina Password</h1>
        <ResetPassword
            ref="editFormRef"
            :user="userToEdit"
            :save-button-label="Conferma"
            @close="cancel"
            @save="
              (user) => {
                passwordReset(user)
                ok()
              }
            "
        />
      </VaModal>
    </VaCollapse>
    <VaCollapse header="Aggiungi account">
      <AddUser />
    </VaCollapse>
  </div>
</template>

<style scoped lang="scss">

</style>
<template>
  <VaModal
    :mobile-fullscreen="false"
    size="small"
    hide-default-actions
    max-width="380px"
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">Modifica {{ props.field }}</h1>
    <VaForm ref="form" @submit.prevent="submit">
      <VaInput
        v-model="Email"
        class="mb-4"
        :label="props.field"
        :placeholder="props.field"
      />
      <VaValue v-slot="isPasswordVisible" :default-value="false">
        <VaInput
          v-model="inputPassword"
          :type="isPasswordVisible.value ? 'text' : 'password'"
          class="mb-4"
          label="Password"
          placeholder="Inserisci la password per confermare"
          @clickAppendInner.stop="
            isPasswordVisible.value = !isPasswordVisible.value
          "
        >
          <template #appendInner>
            <VaIcon
              :name="
                isPasswordVisible.value
                  ? 'mso-visibility_off'
                  : 'mso-visibility'
              "
              class="cursor-pointer"
              color="secondary"
            />
          </template>
        </VaInput>
      </VaValue>
      <div
        class="flex flex-col-reverse md:flex-row md:items-center md:justify-end md:space-x-4"
      >
        <VaButton
          :style="buttonStyles"
          preset="secondary"
          color="secondary"
          @click="emits('cancel')"
        >
          Annulla</VaButton
        >
        <VaButton
          :style="buttonStyles"
          class="mb-4 md:mb-0"
          type="submit"
          @click="submit"
        >
          Conferma</VaButton
        >
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user-store";

import { useToast, VaValue } from "vuestic-ui";
import { validators } from "@/services/utils";
import axios from "axios";

const store = useUserStore();

const buttonStyles = {
  "--va-button-font-size": "14px",
  "--va-button-line-height": "20px",
};

const { init } = useToast();

const emits = defineEmits(["cancel"]);
const props = defineProps(["field"]);

const Email = ref<string>(store.email);
const inputPassword = ref('');

const submit = () => {
  if (!Email.value || Email.value === store.email) {
    return emits("cancel");
  }
  let formData = new FormData();
  formData.append("newEmail", Email.value);
  formData.append("password", inputPassword.value);
  formData.append("admin", store.admin)
  axios
      .put('http://localhost:8000/api/scheduler/mod-email/' + store.email.toString(),
          {
            newEmail: Email.value,
            password: inputPassword.value,
            admin: store.admin,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      )
      .then((res) => {
        store.changeUserEmail(Email.value);
        init({ message: "Email aggiornata con successo", color: "success" });
        emits("cancel");
      })
      .catch((error) => {
        init({ message: "Password invalida", color: "danger" });
      })
};
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>

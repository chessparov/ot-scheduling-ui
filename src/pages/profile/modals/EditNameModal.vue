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
    <VaForm ref="form">
      <VaInput
        v-if="props.field === 'Nome'"
        v-model="Name"
        class="mb-4"
        :label="props.field"
        :placeholder="props.field"
      />
      <VaInput
        v-else
        v-model="Surname"
        class="mb-4"
        :label="props.field"
        :placeholder="props.field"
      />
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
          @click="submitMods"
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

import { useToast } from "vuestic-ui";
import axios from "axios";

const store = useUserStore();

const buttonStyles = {
  "--va-button-font-size": "14px",
  "--va-button-line-height": "20px",
};

const { init } = useToast();

const emits = defineEmits(["cancel"]);
const props = defineProps(["field"]);

const Name = ref<string>(store.name);
const Surname = ref<string>(store.surname);
const Email = ref<string>(store.email);

const submitMods = () => {
  if (props.field === "Nome") {
    if (!Name.value || Name.value === store.name) {
      return emits("cancel");
    }
    axios
        .put('http://localhost:8000/api/scheduler/mod-name/' + store.email.toString(),
            {
              name: Name.value,
              admin: store.admin,
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
        )
        .then((res) => {
          store.changeUserName(Name.value);
          init({ message: "Nome aggiornato con successo", color: "success" });
          emits("cancel");
        })
        .catch((error) => {
            init({message: "Errore lato server", color: "danger"});
        })

  } else {
    if (!Surname.value || Surname.value === store.surname) {
      return emits("cancel");
    }
    axios
        .put('http://localhost:8000/api/scheduler/mod-surname/' + store.email.toString(),
            {
              surname: Surname.value,
              admin: store.admin,
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
        )
        .then((res) => {
          store.changeUserSurname(Surname.value);
          init({ message: "Cognome aggiornato con successo", color: "success" });
          emits("cancel");
        })
        .catch((error) => {
            init({message: "Errore lato server", color: "danger"});
        })
  }
};
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>

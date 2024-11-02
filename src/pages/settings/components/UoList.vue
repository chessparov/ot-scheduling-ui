<script setup lang="ts">
import {useModal} from "vuestic-ui";
import {ref} from "vue";
import EditUoForm from "@/pages/settings/components/EditUoForm.vue";

let uos = [
  'Chirurgia generale',
  'Endocrinochirurgia',
  'Urologia 1',
  'Urologia 2',
  'Ginecologia 1',
  'Ginecologia 2',
  'Chirurgia toracica'
];

let currentUo = ref('');
let uoToEdit = '';
const doShowEditUoModal = ref(false);
const editFormRef = ref();

const { confirm } = useModal();

function onAdd() {
  doShowEditUoModal.value = true
  uoToEdit = ''
}
function onModify() {
  if (currentUo.value !== '') {
    doShowEditUoModal.value = true
    uoToEdit = currentUo.value
  }
}

function modifyUo(newUo: string) {
  const index = uos.indexOf(currentUo.value);
  uos.splice(index, 1);
  uos.push(newUo);
  currentUo.value = newUo;
}
function deleteUO(uo: string) {
  const index = uos.indexOf(uo);
  uos.splice(index, 1);
}
function addUo(newUo: string) {
  uos.push(newUo);
  currentUo.value = newUo
}

const onUoDelete = async (uo: string) => {
  const agreed = await confirm({
    title: 'Elimina unità operativa',
    message: `Eliminare in modo definitivo la seguente unità operativa \"${ uo }\"?`,
    okText: 'Elimina',
    cancelText: 'Annulla',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    const index = uos.indexOf(uo);
    currentUo.value = uos[index + 1];
    deleteUO(uo);
  }
}

</script>

<template>
  <VaCollapse>
    <template #header>
      <div class="flex flex-row justify-between" style="cursor: pointer;">
        <div class="flex flex-col">
                <span class="text-regularMedium" style="font-weight: bold;">
                  Unità Operative
                </span>
          <span class="text-regularMedium">
                  Aggiungi e rimuovi unità operative. Modifica la denominazione di unità operative esistenti
                </span>
        </div>
        <i class="va-icon material-icons va-collapse__expand-icon va-collapse__expand-icon--collapsed"
           style="font-size: 19px; height: 19px; line-height: 19px; cursor: pointer"
        >
          expand_more
        </i>
      </div>
    </template>
    <div class="flex flex-col justify-between p-4 gap-4">
      <VaSelect
          v-model="currentUo"
          label="Lista unità operative"
          placeholder="Seleziona un'unità operativa"
          :options="uos"
      />
      <div class="flex flex-col sm:flex-row gap-2">
        <VaButton
            icon="add"
            @click="onAdd"
        >
          Aggiungi
        </VaButton>
        <VaButton
            icon="edit_document"
            @click="onModify"
        >
          Modifica
        </VaButton>
        <VaButton
            type="submit"
            color="danger"
            icon="delete"
            @click="onUoDelete(currentUo)"
        >
          Elimina
        </VaButton>
      </div>
    </div>
    <VaModal
        v-slot="{ cancel, ok }"
        v-model="doShowEditUoModal"
        size="small"
        mobile-fullscreen
        close-button
        hide-default-actions
    >
      <h1 class="va-h5">{{ uoToEdit ? 'Modifica unità operativa' : 'Aggiungi unità operativa' }}</h1>
      <div style="padding-top: 1rem">
        <VaInput
            v-if="uoToEdit"
            label="Denominazione precedente"
            disabled
            :placeholder="uoToEdit"
        />
        <EditUoForm
            ref="editFormRef"
            :uo="uoToEdit"
            :save-button-label="uoToEdit ? 'Salva' : 'Aggiungi'"
            @close="cancel"
            @save="(uo) => {
                  (uoToEdit != '') ? modifyUo(uo): addUo(uo)
                  ok()
                }
              "
        />
      </div>
    </VaModal>
  </VaCollapse>
</template>

<style scoped lang="scss">

</style>
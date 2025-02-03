<script setup lang="ts">
import {useModal, useToast, VaCollapse, VaModal} from "vuestic-ui";
import {ref} from "vue";
import EditUoForm from "@/pages/settings/components/EditUoForm.vue";
import {useDataStore} from "@/stores/data-store";
import {Uo} from "@/pages/settings/types";
import axios from "axios";
import api from "../../../../axios";

let defaultUo: Uo = {
  id: -1,
  title: '',
  creation_date: new Date,
  fixed_schedule: false,
}
const currentUo = ref<Uo>(defaultUo);
const uoToEdit = ref<string>('');

const {init: notify} = useToast();
const dataStore = useDataStore();
let uos = dataStore.uos as Uo[];
const doShowEditUoModal = ref(false);
const editFormRef = ref();
const { confirm } = useModal();

function onAdd() {
  uoToEdit.value = '';
  doShowEditUoModal.value = true;
}

const addUo = async(newUo: string, fixed: boolean) => {
  await api
      .post(axios.defaults.baseURL + '/api/scheduler/add-uo',
          {title: newUo,
            fixed_schedule: fixed,},
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
      )
      .then((res) => {
        uos.push(res.data);
        dataStore.fetchUos();
        currentUo.value = res.data;
        notify({message: `L'unità operativa "${newUo}" è stata creata con successo!`, color: 'success'})
      })
      .catch((err) => {
        if (err.response.status === 403) {
          notify({message: `L'unità operativa "${newUo}" esiste già nel database`, color: 'danger'},)
        }
        else if (err.response.status === 400) {
          notify({message: `Errore nella creazione di "${newUo}".`, color: 'danger'},)
        }
        else {
          notify({message: `Errore lato server`, color: 'danger'},)

        }
      })
}

function onModify() {
  if (currentUo.value === undefined) {
    return
  }
  if (currentUo.value.title !== '') {
    doShowEditUoModal.value = true
    uoToEdit.value = currentUo.value.title
  }
}

const modifyUo = async(newUo: string, fixed: boolean) => {
  const json = JSON.stringify({
    title: newUo,
    fixed_schedule: fixed,
  })
  await api
      .put(axios.defaults.baseURL + '/api/scheduler/update-uo/' + currentUo.value.id,
          json,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
      )
      .then((res) => {
        const index = uos.indexOf(currentUo.value);
        uos.splice(index, 1);
        uos.push(res.data);
        dataStore.fetchUos();
        currentUo.value = res.data;
        notify({message: `L'unità operativa "${currentUo.value.title}" è stata modificata con successo!`, color: 'success'})
      })
      .catch((err) => {
        if (err.response.status === 404) {
          notify({message: `${err.response.data}`, color: 'danger'})
        }
        else {
          notify({message: `Errore lato server`, color: 'danger'})
        }
      })

}

const onUoDelete = async (uo: Uo) => {
  if (uo.id !== -1) {
    const agreed = await confirm({
      title: 'Elimina unità operativa',
      message: `Eliminare in modo definitivo la seguente unità operativa \"${ uo.title }\"?`,
      okText: 'Elimina',
      cancelText: 'Annulla',
      size: 'small',
      maxWidth: '380px',
    })

    if (agreed) {
      const index = uos.indexOf(uo);
      currentUo.value = uos[index + 1];
      await deleteUO(uo);
    }
  }
}

const deleteUO = async (uo: Uo) => {
  await api
      .delete(axios.defaults.baseURL + '/api/scheduler/delete-uo/' + uo.id)
      .then(() => {
        const index = uos.indexOf(uo);
        uos.splice(index, 1);
        dataStore.fetchUos();
        notify({message: `L'unità operativa "${uo.title}" è stata eliminata con successo!`, color: 'success'})
      })
      .catch((err) => {
        if (err.response.status === 404) {
          notify({message: `L'unità operativa "${uo.title}" non è stata trovata`, color: 'danger'},)
        }
        else {
          notify({message: `Errore lato server`, color: 'danger'})
        }
      })

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
          :text-by="(option: Uo) => option.title"
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
            :ifEdit="uoToEdit"
            :uo="currentUo"
            :save-button-label="(uoToEdit !== '') ? 'Salva' : 'Aggiungi'"
            @close="cancel"
            @save="(uoTitle: string, uoFixed: boolean) => {
                  (uoToEdit != '') ? modifyUo(uoTitle, uoFixed): addUo(uoTitle, uoFixed)
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
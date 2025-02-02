<script setup lang="ts">

import axios from "axios";
import FileDownload from "js-file-download";
import {useToast, VaCard, VaCardContent, VaFile, VaFileUpload} from "vuestic-ui";
import {ref} from "vue";
import api from "../../../axios";

const { init: notify } = useToast()

const files = defineModel('files',
    {
      set(value: VaFile[]) {
        if (value.length >= 2) {
          value.pop();
          notify({
            message: 'Non è possibile caricare più di un file',
            color: 'warning',
          })
        }
        return value
      }
    })
const btnDisabled = ref(false);

async function onClean() {

  if (files.value.length === 0) {
    notify({
      message: 'Nessuna lista caricata',
      color: 'warning'
    })
    return;
  }

  let formData = new FormData();
  formData.append('file', files.value[0], 'lista.xlsx');
  btnDisabled.value = true;

  await api
      .post(axios.defaults.baseURL + '/api/scheduler/clean-list',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob'
          })
      .then((res) => {
        FileDownload(res.data, `lista_filtrata.xlsx`)
        btnDisabled.value = false;
      })
      .catch((error) => {
        btnDisabled.value = false;
        if (error.response.status == 400) {
          notify({
            message: 'File non valido',
            color: 'warning'
          })
        }
        else {
          notify({
            message: 'Errore lato server',
            color: 'danger'
          })
        }
      })
}
</script>

<template>
  <h1 class="h1">Preparazione Lista</h1>
  <VaCard>
    <section class="flex flex-col gap-2">
      <div class="flex flex-col gap-4">
        <VaCardTitle>Pulizia lista d'attesa</VaCardTitle>
        <VaCard>
          <VaCardContent>
            <div class="flex flex-col gap-2 mx-4">
              <span>Le operazioni effettuate sono:</span>
              <VaList>
                <li style="white-space: pre-line;">
                  La lista viene filtrata in modo che contenga solo interventi assegnati alla linea di chirurgia robotica.
                  Il filtro è applicato controllando che in almeno una tra le colonne "Blocco" e "Gruppo Lista"
                    compaia l'assegnazione al CMR di chirurgia robotica.
                </li>
                <li>
                  La lista viene ordinata per "Priorità" e "Due Date" in questo preciso ordine.
                </li>
                <li>
                  Viene aggiunta una colonna "Due Date" nella quale viene calcolata la scadenza dell'intervento in base alla
                  data di prenotazione e alla classe di priorità.
                </li>
                <li>
                  Viene aggiunta una colonna "Pne/Pngla" nella quale viene indicata l'appartenenza o meno a una delle classi
                  monitorate.
                </li>
              </VaList>
            </div>
          </VaCardContent>
        </VaCard>
        <div class="flex flex-col gap-4 mx-4">
          <VaFileUpload
              v-model="files"
              file-types="xlsx,xls"
              uploadButtonText="Carica Lista Attesa"
          />
          <VaButton class="my-4 gap-4" @click="onClean" :disabled="btnDisabled" :loading="btnDisabled">
            Esegui pulizia
          </VaButton>
        </div>
      </div>
    </section>
  </VaCard>
</template>

<style scoped lang="scss">

</style>
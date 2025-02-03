<script lang="ts">

import {useToast, VaButton, VaCheckbox, VaSelect} from "vuestic-ui";
import axios from "axios";
import api from "../../../axios";

export default {
  components: {VaButton, VaCheckbox, VaSelect},
  data() {
    return {
      init: useToast(),
      currentTab: 'SETTIMANA 1',
      weeks: [
        'SETTIMANA 1',
        'SETTIMANA 2',
        'SETTIMANA 3',
        'SETTIMANA 4',
      ],
      days: [
        'LUNEDì',
        'MARTEDì',
        'MERCOLEDì',
        'GIOVEDì',
        'VENERDì',
        'SABATO',
        'DOMENICA'
      ],
      columns : [
        {
          key: 'day',
          label: '',
          width: '100px',
        },
        {
          key: 'ROBOT_A_MAT',
          tdClass: '',
          tdStyle: '',
          width: '400px',
        },
        {
          key: 'ROBOT_A_POM',
          tdClass: '',
          tdStyle: '',
          width: '400px',
        },
        {
          key: 'ROBOT_B_MAT',
          tdClass: '',
          tdStyle: '',
          width: '400px'
        },
        {
          key: 'ROBOT_B_POM',
          tdClass: '',
          tdStyle: '',
          width: '400px'
        },
        {
          key: 'ROBOT_C_MAT',
          tdClass: '',
          tdStyle: '',
          width: '400px'
        },
        {
          key: 'ROBOT_C_POM',
          tdClass: '',
          tdStyle: '',
          width: '400px'
        },
        {
          key: 'ROBOT_D_MAT',
          tdClass: '',
          tdStyle: '',
          width: '400px'
        },
        {
          key: 'ROBOT_D_POM',
          tdClass: '',
          tdStyle: '',
          width: '400px'
        }
      ],
      items: {},
      options: [],
      selectedOption: "",
      useAdditionalStyle: true,
      useAdditionalClass: true,
    }
  },
  methods: {
    async getDefaultSchedule() {
      await api
          .get(axios.defaults.baseURL + '/api/scheduler/get-default-schedule')
          .then((res) => {
            this.items = res.data.schedule;
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.init.notify({
                message: 'La schedula non è stata trovata nel database',
                color: 'warning'
              })
              this.items = {};
            }
            else {
              this.init.notify({
                message: `Errore lato server: ${ err.message }`,
                color: 'warning'
              })
            }
          })
    },
    async updateDefaultSchedule() {
      await api
          .put(axios.defaults.baseURL + '/api/scheduler/mod-default-schedule',
              this.items,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
          .then(() => {
            this.init.notify({
              message: `La schedula predefinita è stata aggiornata.`,
              color: 'success'
            })
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.init.notify({
                message: `La schedula non è stata trovata nel database.`,
                color: 'danger'
              })
            }
            else if (err.response.status === 403) {
              this.init.notify({
                message: `L'unità operativa ${err.response.data} non esiste.`,
                color: 'danger'
              })
            }
            else {
              this.init.notify({
                message: `Errore lato server: ${err.message}`,
                color: 'danger'
              })
            }
          })
    },
    async getUos() {
      await api
          .get(axios.defaults.baseURL + '/api/scheduler/uos')
          .then((res) => {
            let newOptions = [];
            for (const row of res.data) {
              newOptions.push(row.title);
            }
            this.options = newOptions;
          })
          .catch((err) => {
            this.init.notify({
              message: `Errore lato server: ${ err.message }`,
              color: 'danger'
            })
          })
    },
    handleSelection(selectedValue, row, key, doShowInput) {
      if (selectedValue) {
        row.rowData[key] = selectedValue.toUpperCase(); // Store selected value
      }
      doShowInput.value = false;
    }
  },
  created() {
    this.getUos();
    this.getDefaultSchedule();
  },
  watch: {
    useAdditionalClass: {
      handler(value) {
        this.columns[1].tdClass = value && "color1";
        this.columns[2].tdClass = value && "color1";
        this.columns[3].tdClass = value && "color2";
        this.columns[4].tdClass = value && "color2";
        this.columns[5].tdClass = value && "color3";
        this.columns[6].tdClass = value && "color3";
        this.columns[7].tdClass = value && "color4";
        this.columns[8].tdClass = value && "color4";
      },
      immediate: true,
    },
  }
}
</script>

<template>
  <h1 class="va-h3">Schedula predefinita</h1>
  <VaCard>
    <section>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 m-4">
          <VaTabs
              v-model="currentTab"
              stateful
              grow
              style="margin-bottom: 0.75rem;"
          >
            <template #tabs>
              <VaTab
                  v-for="tab in weeks"
                  :key="tab"
                  :name="tab"
              >
                {{ tab }}
              </VaTab>
            </template>
          </VaTabs>
          <VaDataTable
              class="table-inline va-table"
              clickable
              :items="items[currentTab]"
              :columns="columns"
          >
            <template
                v-for="item in columns"
                :key="item.key"
                #[`cell(${item.key})`]="{ value, row }"
            >
              <VaValue v-slot="doShowInput">
                <div class="table-inline__cell"
                     @click="(item.key == 'day' ? null : doShowInput.value = true)"
                >
  <!--                <VaInput-->
  <!--                    ref="inputBox"-->
  <!--                    v-if="doShowInput.value"-->
  <!--                    :model-value="value.toUpperCase()"-->
  <!--                    @input="($event) => {-->
  <!--                      console.log($event.target.value.toUpperCase());-->
  <!--                      }"-->
  <!--                    @change="($event) => {-->
  <!--                      row.rowData[item.key] = $event.target.value.toUpperCase();-->
  <!--                      doShowInput.value = false;-->
  <!--                      }"-->
  <!--                    @blur="doShowInput.value = false"-->
  <!--                />-->
                  <VaSelect
                      autocomplete
                      searchable
                      v-if="doShowInput.value"
                      v-model="row.rowData[item.key]"
                      :options="options"
                      :clearable="true"
                      :close-on-click-outside="true"
                      @update:modelValue="(selectedValue) => handleSelection(selectedValue, row, item.key, doShowInput)"
                      @blur="doShowInput.value = false"
                      @keydown.esc="doShowInput.value = false"
                      style="margin: auto"
                  />
                  <span
                      v-if="!doShowInput.value"
                      class="table-inline__item"
                      :class="doShowInput.value ? 'table-inline__item--hidden' : ''"
                  >
                    {{ value }}
                  </span>
                </div>
              </VaValue>
            </template>
          </VaDataTable>
          <div class="m-2 gap-4">
            <VaButton icon="check" @click="updateDefaultSchedule">
              Salva Modifiche
            </VaButton>
          </div>
        </div>
      </div>
    </section>
  </VaCard>
</template>

<style scoped lang="scss">

.table {

  ::v-deep(tr) {
    border-bottom: 1px solid var(--va-background-border);

    td {
    }
  }
}
.column-1 { background-color: rgba(244, 67, 54, 0.12) }
.column-2 { background-color: rgba(33, 150, 243, 0.12) }
.column-3 { background-color: rgba(76, 175, 80, 0.12) }
.column-4 { background-color: rgba(255, 193, 7, 0.12) }

::v-deep(.color1) {
  //background-color: rgba(75, 244, 244, 0.12);
  background-color: rgba(244, 67, 54, 0.12)
;
}
::v-deep(.color2) {
  //background-color: rgba(243, 90, 153, 0.12);
  background-color: rgba(33, 150, 243, 0.12);
}
::v-deep(.color3) {
  //background-color: rgba(167, 248, 81, 0.12);
  background-color: rgba(76, 175, 80, 0.12);
}
::v-deep(.color4) {
  //background-color: rgba(108, 116, 255, 0.12);
  background-color: rgba(255, 193, 7, 0.12);
}

.table-inline {
  ::v-deep(tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
  &__cell {
    position: relative;
    height: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    font-size:0.8rem;
  }

  &__item {
    cursor: pointer;

    &--hidden {
      z-index: -1;
      opacity: 0;
      pointer-events: none;
    }
  }

  .va-input {
    position: absolute;
    width: 100%;
  }
}

</style>

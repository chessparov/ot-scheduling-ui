<script lang="ts">

import {useToast, VaButton, VaCard, VaCheckbox, VaSelect} from "vuestic-ui";
import {watch} from "vue";
import axios from "axios";
import {useDataStore} from "@/stores/data-store";

export default {
  components: {VaButton, VaCheckbox, VaSelect},
  // Set to prevent warning of params passed that are not defined as props.
  // Another option to fix the issue would be to add constraint as a prop here in the definition
  inheritAttrs: false,
  props: {
    param: String,
    propItems: {
      type: Object,
      default: {},
    },
    propOptions: {
      type: Array,
      default: ['GLOBALE']
    }
  },
  data() {
    return {
      selectedOption: this.$route.params.constraint || 'GLOBALE',
      init: useToast(),
      currentTab: 'SETTIMANA 1',
      weeks: ['SETTIMANA 1', 'SETTIMANA 2', 'SETTIMANA 3', 'SETTIMANA 4'],
      columns : [
        {
          key: 'day',
          label: '',
          width: '100px'
        },
        {
          key: 'ROBOT_A_MAT',
          width: '120px'
        },
        {
          key: 'ROBOT_A_POM',
          width: '120px'
        },
        {
          key: 'ROBOT_B_MAT',
          width: '120px'
        },
        {
          key: 'ROBOT_B_POM',
          width: '120px'
        },
        {
          key: 'ROBOT_C_MAT',
          width: '120px'
        },
        {
          key: 'ROBOT_C_POM',
          width: '120px'
        },
        {
          key: 'ROBOT_D_MAT',
          width: '120px',
        },
        {
          key: 'ROBOT_D_POM',
          width: '120px'
        }
      ],
      items: this.propItems,
      options: this.propOptions,
    }
  },
  methods: {
    changeCell(data: object, key: string) {
      const idx = this.items[this.currentTab].indexOf(data)
      const cellValue = this.items[this.currentTab][idx][key]
      // Siccome il database utilizza la convenzione dei 0-1
      this.items[this.currentTab][idx][key] = (!cellValue ? 1 : 0)
    },
    async getConstraints() {
      await axios
          .get('http://localhost:8000/api/scheduler/get-constraint/' + this.selectedOption.toString())
          .then((res) => {
            this.items = res.data.calendar;
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.init.notify({
                message: 'L\'unità operativa non è stata trovata nel database',
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
    async getUos() {
      await axios
          .get('http://localhost:8000/api/scheduler/uos')
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
              color: 'warning'
            })
          })
    },
    async updateConstraint() {
      await axios
          .put('http://localhost:8000/api/scheduler/mod-constraint/' + this.selectedOption.toString(),
              this.items,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
          .then((res) => {
            this.init.notify({
              message: `I vincoli dell'UO "${ this.selectedOption }" sono stati aggiornati`,
              color: 'success'
            })
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.init.notify({
                message: `Operazione annullata. L'unità operativa "${ this.selectedOption }" non è stata trovata`,
                color: 'warning'
              })
            }
            else {
              this.init.notify({
                message: `Errore lato server: ${err.message}`,
                color: 'warning'
              })
            }
          })
    }
  },
  created() {
    this.options.push(this.$route.params.constraint);
    this.getUos();
    this.getConstraints();
  },
  watch: {
    selectedOption() {
      this.getConstraints();
    }
  }
}
</script>

<template>
<h1 class="va-h3">Vincoli</h1>
  <VaCard>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-4 m-4">
        <h1 class="va-title w-2/3" style="font-size: 1.25rem; align-content: center; text-align: center">
          {{ this.selectedOption }}
        </h1>
        <VaSelect
            class="w-1/3"
            label="Unità operativa"
            placeholder="Seleziona unità operativa..."
            :options="options"
            v-model="selectedOption"
        />
      </div>
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
          :items="items[currentTab]"
          style="text-align: center"
          class="va-table va-table--striped"
          clickable
        >
          <template #cell(day)="{ rowData }">
            <div style="font-size: 0.75rem">
              {{ rowData.day }}
            </div>
          </template>

          <template #cell(ROBOT_A_MAT)="{ rowData }" style="text-align: center">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_A_MAT');">
              {{ rowData.ROBOT_A_MAT ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_A_POM)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_A_POM');">
              {{ rowData.ROBOT_A_POM ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_B_MAT)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_B_MAT');">
              {{ rowData.ROBOT_B_MAT ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_B_POM)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_B_POM');">
              {{ rowData.ROBOT_B_POM ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_C_MAT)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_C_MAT');">
              {{ rowData.ROBOT_C_MAT ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_C_POM)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_C_POM');">
              {{ rowData.ROBOT_C_POM ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_D_MAT)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_D_MAT');">
              {{ rowData.ROBOT_D_MAT ? '&#10004' :'&#x274c' }}
            </div>
          </template>
          <template #cell(ROBOT_D_POM)="{ rowData }">
            <div style="color: green; text-align: center;" @click="changeCell(rowData, 'ROBOT_D_POM');">
              {{ rowData.ROBOT_D_POM ? '&#10004' :'&#x274c' }}
            </div>
          </template>
        </VaDataTable>
        <div class="m-2 gap-4">
          <VaButton icon="check" @click="updateConstraint">
            Salva Modifiche
          </VaButton>
        </div>
      </div>
    </div>
  </VaCard>
</template>

<style scoped lang="scss">

</style>
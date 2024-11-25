<script lang="ts">

import {useScheduleStore} from "@/stores/global-store";

export default {
  data() {
    return {
      modifiedSchedule: false,
      currentTab: 'SETTIMANA 1',
      weeks: ['SETTIMANA 1', 'SETTIMANA 2', 'SETTIMANA 3', 'SETTIMANA 4'],
      items: useScheduleStore().scheduleData,
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
          width: '120px'
        },
        {
          key: 'ROBOT_D_POM',
          width: '120px'
        }
      ],
    }
  },
}
</script>

<template>
  <div class="flex flex-col gap-4">
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
        class="table-inline va-table va-table--striped"
        :items="items[currentTab]"
        :columns="columns"

    >
      <template
          v-for="item in columns"
          :key="item.key"
          #[`cell(${item.key})`]="{ value, row }"
      >
        <div class="table-inline__cell" style="overflow: hidden;">
          <VaValue v-slot="doShowInput">
            <VaInput
                ref="inputBox"
                v-if="doShowInput.value"
                :model-value="value.toUpperCase()"
                @change="($event) => {
                    row.rowData[item.key] = $event.target.value;
                    doShowInput.value = false;
                    this.modifiedSchedule = true;
                    $emit('modifiedSchedule', row);
                  }"
                @blur="doShowInput.value = false"
            />
            <span
                class="table-inline__item"
                :class="doShowInput.value ? 'table-inline__item--hidden' : ''"
                @click="item.key == 'day' ? null : doShowInput.value = true"
            >
              {{ value.toUpperCase() }}
            </span>
          </VaValue>
        </div>
      </template>
    </VaDataTable>
  </div>
</template>

<style scoped lang="scss">

.table-inline {
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
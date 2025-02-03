<script lang="ts">

import {useScheduleStore} from "@/stores/global-store";
import {useUserStore} from "@/stores/user-store";
import {useProjects} from "@/pages/history/composables/useProjects";

export default {
  props: {
    startDate: {type: Date, required: true},
  },
  data() {
    return {
      userStore: useUserStore(),
      modifiedSchedule: false,
      currentTab: 'SETTIMANA 1',
      weeks: [
        'SETTIMANA 1',
        'SETTIMANA 2',
        'SETTIMANA 3',
        'SETTIMANA 4',
      ],
      weekNames:
      {
        'SETTIMANA 1': this.weekToDate(1),
        'SETTIMANA 2': this.weekToDate(2),
        'SETTIMANA 3': this.weekToDate(3),
        'SETTIMANA 4': this.weekToDate(4)
      },
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
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_A_POM',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_B_MAT',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_B_POM',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_C_MAT',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_C_POM',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_D_MAT',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        },
        {
          key: 'ROBOT_D_POM',
          tdClass: '',
          tdStyle: '',
          // width: '120px'
        }
      ],
      useAdditionalStyle: true,
      useAdditionalClass: true,
    }
  },
  methods: {
    addDays(date: Date, days: number) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      return newDate;
    },
    weekToDate(numWeek: number) {
      const monthNames = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre"
      ];
      const date1 = this.addDays(this.$props.startDate,7 * (numWeek - 1));
      const date2 = this.addDays(date1, 6);
      const day1 = date1.getUTCDate().toString()
      const day2 = date2.getUTCDate().toString()
      const month1 = monthNames[date1.getUTCMonth()]
      const month2 = monthNames[date2.getUTCMonth()]
      return day1 + " " + month1 + " - " + day2 + " " + month2

    },
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
          {{ weekNames[tab] }}
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
          <div class="table-inline__cell" style="overflow: hidden;" @click="userStore.admin ? (item.key == 'day' ? null : doShowInput.value = true) : null">
            <VaInput
                ref="inputBox"
                v-if="doShowInput.value"
                :model-value="value.toUpperCase()"
                @change="($event) => {
                    row.rowData[item.key] = $event.target.value.toUpperCase();
                    doShowInput.value = false;
                    this.modifiedSchedule = true;
                    $emit('modifiedSchedule', row);
                  }"
                @blur="doShowInput.value = false"
            />
            <span
                class="table-inline__item"
                :class="doShowInput.value ? 'table-inline__item--hidden' : ''"
            >
              {{ value }}
            </span>
          </div>
        </VaValue>
      </template>
    </VaDataTable>
<!--    <div class="va-table-responsive">-->
<!--      <table class="va-table va-table&#45;&#45;clickable">-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th v-for="item in columns">{{ item.key }}</th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr-->
<!--              v-for="rowData in items[currentTab]"-->
<!--              :key="rowData.day"-->
<!--              style="font-size: 0.75rem;"-->
<!--          >-->
<!--            <td>{{ rowData.day }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(226,54,54,0.27)">{{ rowData.ROBOT_A_MAT }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(226,54,54,0.27)">{{ rowData.ROBOT_A_POM }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(84,221,86,0.54)">{{ rowData.ROBOT_B_MAT }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(84,221,86,0.54)">{{ rowData.ROBOT_B_POM }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(87,220,184,0.63)">{{ rowData.ROBOT_C_MAT }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(87,220,184,0.63)">{{ rowData.ROBOT_C_POM }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(205,46,230,0.54)">{{ rowData.ROBOT_D_MAT }}</td>-->
<!--            <td style="outline: black 1px; width: 200px; height: 7rem; background-color: rgba(205,46,230,0.54)">{{ rowData.ROBOT_D_POM }}</td>-->
<!--          </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">

.table {
  ::v-deep(th) {
    //border: 1px solid var(--va-background-border);
  }

  ::v-deep(tr) {
    border-bottom: 1px solid var(--va-background-border);

    //td {
    //  height: 4rem;
    //  white-space: normal;
    //  border: 1px solid;
    //
    //}
  }
}

::v-deep(.color1) {
  //background-color: rgba(75, 244, 244, 0.06);
  background-color: rgba(72, 202, 228, 0.12);
}
::v-deep(.color2) {
  //background-color: rgba(243, 90, 153, 0.06);
  background-color: rgba(244, 143, 177, 0.12);
}
::v-deep(.color3) {
  background-color: rgba(171, 235, 198, 0.12);
  //background-color: rgba(167, 248, 81, 0.06);
}
::v-deep(.color4) {
  background-color: rgba(129, 140, 248, 0.12);
  //background-color: rgba(108, 116, 255, 0.06);
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
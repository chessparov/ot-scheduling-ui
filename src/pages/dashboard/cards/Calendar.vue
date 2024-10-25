<script lang="ts">
export default {
  data() {
    return {
      modifiedSchedule: false,
      currentTab: "SETTIMANA 1",
      weeks: ["SETTIMANA 1", "SETTIMANA 2", "SETTIMANA 3", "SETTIMANA 4"],
      items: [
        {
          day: "LUNEDI",
          ROBOT_A_MAT: "GINECOLOGIA 1",
          ROBOT_A_POM: "ENDOCRINOCHIRURGIA",
          ROBOT_B_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_B_POM: "ENDOCRINOCHIRURGIA",
          ROBOT_C_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_C_POM: "GINECOLOGIA 1",
          ROBOT_D_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_D_POM: "ENDOCRINOCHIRURGIA",
        },
        {
          day: "MARTEDI",
          ROBOT_A_MAT: "GINECOLOGIA 1",
          ROBOT_A_POM: "GINECOLOGIA 1",
          ROBOT_B_MAT: "GINECOLOGIA 1",
          ROBOT_B_POM: "GINECOLOGIA 1",
          ROBOT_C_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_C_POM: "GINECOLOGIA 1",
          ROBOT_D_MAT: "GINECOLOGIA 1",
          ROBOT_D_POM: "GINECOLOGIA 1",
        },
        {
          day: "MERCOLEDI",
          ROBOT_A_MAT: "GINECOLOGIA 1",
          ROBOT_A_POM: "GINECOLOGIA 1",
          ROBOT_B_MAT: "GINECOLOGIA 1",
          ROBOT_B_POM: "ENDOCRINOCHIRURGIA",
          ROBOT_C_MAT: "GINECOLOGIA 1",
          ROBOT_C_POM: "GINECOLOGIA 1",
          ROBOT_D_MAT: "GINECOLOGIA 1",
          ROBOT_D_POM: "GINECOLOGIA 1",
        },
        {
          day: "GIOVEDI",
          ROBOT_A_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_A_POM: "ENDOCRINOCHIRURGIA",
          ROBOT_B_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_B_POM: "ENDOCRINOCHIRURGIA",
          ROBOT_C_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_C_POM: "GINECOLOGIA 1",
          ROBOT_D_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_D_POM: "GINECOLOGIA 1",
        },
        {
          day: "VENERDI",
          ROBOT_A_MAT: "GINECOLOGIA 1",
          ROBOT_A_POM: "GINECOLOGIA 1",
          ROBOT_B_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_B_POM: "GINECOLOGIA 1",
          ROBOT_C_MAT: "GINECOLOGIA 1",
          ROBOT_C_POM: "GINECOLOGIA 1",
          ROBOT_D_MAT: "ENDOCRINOCHIRURGIA",
          ROBOT_D_POM: "GINECOLOGIA 1",
        },
        {
          day: "SABATO",
        },
        {
          day: "DOMENICA",
        },
      ],
      testItems: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          phone: "010-692-6593 x09125",
          website: "anastasia.net",
        },
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
          phone: "1-463-123-4447",
          website: "ramiro.info",
        },
        {
          id: 4,
          name: "Patricia Lebsack",
          username: "Karianne",
          email: "Julianne.OConner@kory.org",
          phone: "493-170-9623 x156",
          website: "kale.biz",
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          phone: "(254)954-1289",
          website: "demarco.info",
        },
      ],
      days: [
        "LUNEDI",
        "MARTEDI",
        "MERCOLEDI",
        "GIOVEDI",
        "VENERDI",
        "SABATO",
        "DOMENICA",
      ],
      columns: [
        {
          key: "day",
          label: "",
          width: "100px",
        },
        {
          key: "ROBOT_A_MAT",
          width: "120px",
        },
        {
          key: "ROBOT_A_POM",
          width: "120px",
        },
        {
          key: "ROBOT_B_MAT",
          width: "120px",
        },
        {
          key: "ROBOT_B_POM",
          width: "120px",
        },
        {
          key: "ROBOT_C_MAT",
          width: "120px",
        },
        {
          key: "ROBOT_C_POM",
          width: "120px",
        },
        {
          key: "ROBOT_D_MAT",
          width: "120px",
        },
        {
          key: "ROBOT_D_POM",
          width: "120px",
        },
      ],
    };
  },
};
</script>

<template>
  <VaCard style="padding: 1rem">
    <div class="flex flex-col gap-4">
      <VaTabs
        v-model="currentTab"
        stateful
        grow
        style="margin-bottom: 0.75rem; margin-top: 0.5rem"
      >
        <template #tabs>
          <VaTab v-for="tab in weeks" :key="tab" :name="tab">
            {{ tab }}
          </VaTab>
        </template>
      </VaTabs>
      <label class="va-title" style="color: rgb(8, 9, 14); font-size: 0.75rem">
        Schedula 20 Ottobre 2024
      </label>
      <VaDataTable
        class="table-inline"
        :items="currentTab == 'SETTIMANA 1' ? items : testItems"
        :columns="columns"
      >
        <template
          v-for="item in columns"
          :key="item.key"
          #[`cell(${item.key})`]="{ value, row }"
        >
          <div class="table-inline__cell" style="overflow: hidden">
            <VaValue v-slot="doShowInput">
              <VaInput
                ref="inputBox"
                v-if="doShowInput.value"
                :model-value="value"
                @change="
                  ($event) => {
                    row.rowData[item.key] = $event.target.value;
                    doShowInput.value = false;
                    this.modifiedSchedule = true;
                    $emit('modifiedSchedule', row);
                  }
                "
                @blur="doShowInput.value = false"
              />
              <span
                class="table-inline__item"
                :class="doShowInput.value ? 'table-inline__item--hidden' : ''"
                @click="item.key == 'day' ? null : (doShowInput.value = true)"
              >
                {{ value }}
              </span>
            </VaValue>
          </div>
        </template>
      </VaDataTable>
    </div>
  </VaCard>
</template>

<style scoped lang="scss">
.table-inline {
  &__cell {
    position: relative;
    height: 2.75rem;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__item {
    cursor: pointer;
    font-size: 0.8rem;

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

import { defineStore } from 'pinia'
import axios from "axios";

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      montecarloDefault: 1000,
      tabuTimeDefault: 120,
      weeksNumberDefault: 4,
      daysNumberDefault: 5,
      roomsNumberDefault: 4,
    }
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },
    updateMcDefault(mc: number) {
      this.montecarloDefault = mc;
    },
    updateTabuDefault(tabuTime: number) {
      this.tabuTimeDefault = tabuTime;
    },
    updateWeeksDefault(weeksNumber: number) {
      this.weeksNumberDefault = weeksNumber;
    },
    updateDaysDefault(daysNumber: number) {
      this.daysNumberDefault = daysNumber;
    },
    updateRoomsDefault(roomsNumber: number) {
      this.roomsNumberDefault = roomsNumber;
    },
    updateGlobal(mc: number,
                 tabuTime: number,
                 weeksNumber: number,
                 daysNumber: number,
                 roomsNumber: number) {
      this.montecarloDefault = mc;
      this.tabuTimeDefault = tabuTime;
      this.weeksNumberDefault = weeksNumber;
      this.daysNumberDefault = daysNumber;
      this.roomsNumberDefault = roomsNumber;
    }
  },
})

export const useScheduleStore = defineStore('scheduleStore', {
  state: () => {
    return {
      scheduleName: '',
      scheduleData: JSON,
    }
  },
  actions: {
    updateSchedule(newSchedule: JSON, newName: string) {
      this.scheduleName = newName;
      this.scheduleData = newSchedule;
    },
    async fetchData() {
      await axios
          .get('http://localhost:8000/api/scheduler/new-schedule', )
          .then((res) => {
            this.scheduleName = res.data.title;
            this.scheduleData = res.data.data;
          })
    }
  }
})

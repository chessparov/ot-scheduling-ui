import { defineStore } from 'pinia'
import axios from "axios";

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      montecarloDefault: 0,
      tabuTimeDefault: 0,
      weeksNumberDefault: 0,
      daysNumberDefault: 0,
      roomsNumberDefault: 0,
      slotDurationDefault: 0,
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
                 roomsNumber: number,
                 slotDuration: number,) {
      this.montecarloDefault = mc;
      this.tabuTimeDefault = tabuTime;
      this.weeksNumberDefault = weeksNumber;
      this.daysNumberDefault = daysNumber;
      this.roomsNumberDefault = roomsNumber;
      this.slotDurationDefault = slotDuration;
    },
    async fetchData() {
      await axios
          .get('http://localhost:8000/api/scheduler/mod-simparams')
          .then((res) => {
            this.updateGlobal(
                res.data.mc_cycles,
                res.data.tabu_time,
                res.data.n_weeks,
                res.data.n_days,
                res.data.n_rooms,
                res.data.slot_duration);
          })
    }
  },
})

export const useScheduleStore = defineStore('scheduleStore', {
  state: () => {
    return {
      scheduleName: '',
      scheduleId: Number,
      scheduleData: JSON,
      scheduleStats: JSON
    }
  },
  actions: {
    updateSchedule(newSchedule: JSON, newName: string) {
      this.scheduleName = newName;
      this.scheduleData = newSchedule;
    },
    async fetchData() {
      await axios
          .get('http://localhost:8000/api/scheduler/new-schedule')
          .then((res) => {
            this.scheduleId = res.data.id;
            this.scheduleName = res.data.title;
            this.scheduleData = res.data.schedule_data;
            this.scheduleStats = res.data.schedule_stats;
          })
          .catch((error) => {
            if (error.response.status === 404) {

            }
          })
    }
  }
})

import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      montecarloDefault: 1000,
      tabuTimeDefault: 120,
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
    }
  },
})

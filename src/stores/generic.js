import { defineStore } from 'pinia'

export const useGenericStore = defineStore('generic', {
  state: () => ({
    currentTheme: null,
  }),

  actions: {
    setCurrentTheme(payload) {
      this.currentTheme = payload
    },
  },
})

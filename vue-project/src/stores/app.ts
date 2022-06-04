import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    app: {},
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    update(app: any) {
      this.app = app
    },
  },

})
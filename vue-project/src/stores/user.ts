import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {},
    avatar: ''
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    update(user: any) {
      this.user = user
    },
    updateAvatar(fileName: string) {
      this.avatar = fileName
    }
  },

})
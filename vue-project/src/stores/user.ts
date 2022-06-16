import { defineStore } from 'pinia'
// add interface
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {},
    avatar: ''
  }),
  getters: {
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
import { defineStore } from 'pinia'
import type {User} from '@/interfaces'
// add interface
interface userState{
  user: User | {},
  avatar: string
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    user: {},
    avatar: ''
  }),
  getters: {
  },
  actions: {
    update(user: User) {
      this.user = user;
    },
    updateAvatar(fileName: string) {
      this.avatar = fileName;
    },
  },
})
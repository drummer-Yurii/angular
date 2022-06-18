import { defineStore } from 'pinia'
import type { User } from '@/interfaces'
import axios from 'axios'
import { httpOptions, log } from '@/utils'



// add interface
interface userState {
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
    async getUserData() {
      const answer = await axios.get('http://localhost:3001/api/user', httpOptions())
      console.log(answer)
      this.update(answer.data.user)
    },
  },
})
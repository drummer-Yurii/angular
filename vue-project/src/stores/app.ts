import { defineStore } from 'pinia'
import axios from 'axios'
import { httpOptions, log } from '@/utils'


// add interface
export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    app: {},
    goToAnotherPageAfterReload: false
  }),
  getters: {
  },
  actions: {
    async init() {
      const answer = await axios.get('http://localhost:3001/api/app-info', httpOptions)
      log(answer)
      this.update(answer.data.result.info[0])
    },
    update(app: any) {
      this.app = app
    },
  },

})
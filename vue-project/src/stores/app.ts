import { defineStore } from 'pinia'
import axios from 'axios'
import { httpOptions, log } from '@/utils'
import type {App} from '@/interfaces'


// add interface
interface appState{
    app:App | {},
    goToAnotherPageAfterReload: boolean
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): appState => ({
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
    update(app: App) {
      this.app = app;
    },
  },

})
import { defineStore } from 'pinia'
import axios from 'axios'
import { httpOptions, log } from '@/utils'
import type { App } from '@/interfaces'

// add interface
interface appState {
  app: App | {},
  preloading: boolean,
  files: string[]
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): appState => ({
    app: {},
    preloading: false,
    files: []
  }),
  getters: {
  },
  actions: {
    async init() {
      await this.getAppInfo()
      await this.getAppFiles()
    },
   async getAppInfo() {
      const answer = await axios.get('http://localhost:3001/api/app-info', httpOptions())
      // log(answer)
      const { ok, info, msg } = answer.data.result
      ok ? this.app = info : alert(msg)
    },
   async getAppFiles() {
      const answer = await axios.get('http://localhost:3001/api/app-files', httpOptions())
      // log(answer)
      const { ok, files, msg } = answer.data.result
      ok ? this.files = files : alert(msg)
    },
    appImg() {
     const fileName = this.files.find((f) => f.split(".")[0] == "app-img")
     const url = 'http://localhost:3001/app/' + fileName
      return url
    }
    // update(app: App) {
    //   this.app = app;
    // },
  },

})
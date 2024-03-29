import { defineStore } from 'pinia'
import axios from 'axios'
import { httpOptions, log } from '@/utils'
import type { App } from '@/interfaces'
import { fileUploader } from '@/utils/file-uploader'

// add interface
interface appState {
  serverUrl: string,
  app: App | {},
  preloading: boolean,
  files: string[],
  apiUrl: string,
}

const defaultCommonUI = {
  bg: '#222',
}

const defaultPostUI = {
  bg: '#aaa',
  br: 4,
}


const defaultUi = {
  firstScreen: {
    waves: {
      w1: 'orange',
      w2: 'yellow',
      w3: 'gray',
      w4: 'blue'
    }
  },
  common: defaultCommonUI,
  post: defaultPostUI
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): appState => {
    let host = ''
    host = window.location.host
    host = host.split(':')[0]
    log(host, '000000000000000')
    if (host == 'localhost') host += ':3001';
    const serverUrl = `http://${host}`
    log('SERVER URL ---> ', serverUrl)
    //
    return {
      serverUrl,
      apiUrl: serverUrl + '/api',
      app: {
        ui: defaultUi,
      },
      preloading: false,
      files: [],
    }
  },
  getters: {
  },
  actions: {

    /* 
      Upload files 
    */
    async uploadFilesAboutPage() {
      log('hello world')
      await fileUploader({
        DOMQuery: '.file-to-upload',
        publicFolder: `${this.serverUrl}/upload`,//???!!!
        pathForUploading: `/about-page/`
      })
      log('end uploadFilesAboutPage')
    },
    async uploadLogoImg() {
      log('hello world')
      await fileUploader({
        DOMQuery: '#fileToUploadLogoImg',
        publicFolder: `${this.serverUrl}/upload`,//???!!!
        pathForUploading: `/app/`
      })
      log('end uploadFilesAboutPage')
    },

    async init() {
      await this.getAppInfo()
      await this.getAppFiles()
    },
    async getAppInfo() {
      const answer = await axios
        .get(this.apiUrl + '/app-info',
          httpOptions())
      // log(answer)
      const { ok, info, msg } = answer.data.result
      if (!info.ui) info.ui = defaultUi
      if (!info.ui.common) info.ui.common = defaultCommonUI
      if (!info.ui.post) info.ui.post = defaultPostUI
      ok ? this.app = info : alert(msg)
    },
    editApp() {
      axios
        .put(this.apiUrl + "/app-info",
          this.app,
          httpOptions(),
        )
        .then((answer) => {
          console.log(answer);
          this.init()
        });
    },
    async getAppFiles() {
      const answer = await axios
        .get(this.apiUrl + '/app-files',
          httpOptions())
      // log(answer)
      const { ok, files, msg } = answer.data.result
      ok ? this.files = files : alert(msg)
    },
    appImg() {
      const fileName = this.files.find((f) => f.split(".")[0] == "app-img")
      const url = this.serverUrl + '/app/' + fileName
      return url
    },
    appLogo() {
      const fileName = this.files.find((f) => f.split(".")[0] == "logo")
      const url = this.serverUrl + '/app/' + fileName
      return url
    },
  },

})
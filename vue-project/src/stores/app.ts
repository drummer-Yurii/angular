import { defineStore } from 'pinia'
import axios from 'axios'


export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    app: {},
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    init() {
      axios
        .get('http://localhost:3001/api/app-info', {
          headers: {
            'auth-token': localStorage.getItem('authToken')
          }
        })
        .then((answer) => {
          console.log(answer)
          this.update(answer.data.result.info[0])
        })
    },
    update(app: any) {
      this.app = app
    },
  },

})
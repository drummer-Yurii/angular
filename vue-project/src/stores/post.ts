import { defineStore } from 'pinia'
import axios from 'axios'


export const usePostStore = defineStore({
    id: 'post',
    state: () => ({
        posts: [],
    }),
    getters: {
        // doubleCount: (state) => state.counter * 2
    },
    actions: {
        // async getPosts() {
        //     await this.refresh()
        //     return this.posts
        // },
        async refresh() {
            const options:any =  {
                headers: {
                    'auth-token': localStorage.getItem('authToken'),
                }
            }
            const answer = await axios.get('http://localhost:3001/api/post', options)
            console.log(answer)
            this.update(answer.data.result.posts)
        },
        update(posts: any) {
            this.posts = posts
        },
    },

})
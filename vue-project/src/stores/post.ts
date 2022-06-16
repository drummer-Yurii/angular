import { defineStore } from 'pinia'
import axios from 'axios'
import { httpOptions, log } from '@/utils'
import type {Post} from '@/interfaces'

interface postState{
    posts: [Post] | [],
}

export const usePostStore = defineStore({
    id: 'post',
    state: (): postState => ({
        posts: [],
    }),
    getters: {
    },
    actions: {
        async refresh() {
            const answer = await axios.get('http://localhost:3001/api/post', httpOptions);
            log(answer);
            this.update(answer.data.result.posts);
        },
        update(posts: [Post]) {
            this.posts = posts;
        },
    },
})
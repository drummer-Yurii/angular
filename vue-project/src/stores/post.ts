import { defineStore } from "pinia";
import axios from "axios";
import { httpOptions, log } from "@/utils";
import type { Post } from "@/interfaces";
import { useAppStore } from "@/stores/app";

interface postState {
  posts: [Post] | [];
  post: Post | {};
}
export const usePostStore = defineStore({
  id: "post",
  state: (): postState => ({
    posts: [],
    post: {}
  }),
  getters: {
    getPosts(state:any):any {
     return state.posts
    },
    // switchPreloading(state:any, to: boolean):any {
    //   const storeApp = useAppStore();
    //   storeApp.preloading = to
    // },
  },

  actions: {
    async refresh() {
      const answer = await axios.get(
        "http://localhost:3001/api/post",
        httpOptions()
      );
      log(answer);
      this.update(answer.data.result.posts);
    },
    async getPost(id) {
      if (id == "new") return;
      const answer = await axios.get(
        "http://localhost:3001/api/post?_id=" + id,
        httpOptions()
      );
      console.log(answer);
      this.post = answer.data.result.post;
    },
    update(posts: [Post]) {
      this.posts = posts;
    },
    async delete(post: Post) {
      const storeApp = useAppStore();
      console.log(post);
      storeApp.preloading = true;
      const answer = await axios.delete(
        "http://localhost:3001/api/post/" + post._id,
        httpOptions()
      );
      log(answer);
      setTimeout(async()=> {
          await this.refresh();
          storeApp.preloading = false;
      },1000)
    },
  },
});

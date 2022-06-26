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
      this.posts = [];
      setTimeout(()=>{this.posts = posts;},50)     
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
    async submit(id) {
    // const route = useRoute();
      console.log("submit", this.post);
      // const id = route.params.id;
      let answer;
      if (id == "new") {
        answer = await axios.post(
          "http://localhost:3001/api/post",
          this.post,
          httpOptions()
        );
        console.log(answer);
        const isImgChoise = document.getElementById("fileToUpload");
        if (isImgChoise.files.length !== 0)
          await this.fileUpload(answer.data.result.post);
      } else {
        answer = await axios.put(
          "http://localhost:3001/api/post/" + this.post._id,
          this.post,
          httpOptions()
        );
        console.log(answer);
      }
      this.refresh()
      if (answer.data.ok) this.$router.push("/")
      else alert(answer.data.msg2);
    },
    async fileUpload(newPost) {
      const target = document.getElementById("fileToUpload");
      const file = target.files[0];
      var fd = new FormData();
      fd.append("sampleFile", document.getElementById("fileToUpload").files[0]);
      fd.append("directory", "/testpost");
      fd.append("basename", "wobble-004.txt");

      const answer = await axios.post(
        `http://localhost:3001/upload?pathForUploading=/posts/${newPost._id}/&fileName=post-img`,
        fd,
        httpOptions(),
        {}
      );
      console.log(answer);
      // location.reload()
    },
  },
});

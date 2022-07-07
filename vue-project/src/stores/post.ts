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
    post: {
      blocks: []
    }
  }),
  getters: {
    getPosts(state: any): any {
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
      setTimeout(() => { this.posts = posts; }, 50)
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
      setTimeout(async () => {
        await this.refresh();
        storeApp.preloading = false;
      }, 1000)
    },
    async submit(id) {
      // const route = useRoute();
      console.log("submit", this.post);
      // const id = route.params.id;
      let answer;
      let fileToUpload;
      if (id == "new") {
        delete this.post._id
        answer = await axios.post(
          "http://localhost:3001/api/post",
          this.post,
          httpOptions()
        );
        fileToUpload = answer.data.result.post
      } else {
        answer = await axios.put(
          "http://localhost:3001/api/post/" + this.post._id,
          this.post,
          httpOptions()
        );
        fileToUpload = this.post
      }
      console.log(answer);
      // 3
      const blockUploads = document.querySelectorAll('.block-file-to-upload')
      log('blockUploads', blockUploads);
      const myTarget = {
        target: null,
        fileName: 'post-img',
      };
      await this.fileUploader([...blockUploads, myTarget], `/posts/${this.post._id}/`);
      return;
      // 1
      const isImgChoise: any = document.getElementById("fileToUpload");
      if (isImgChoise.files.length !== 0)
        await this.fileUpload(fileToUpload);
      // 2
      if (answer.data.ok) this.$router.push("/")
      else alert(answer.data.msg2);
    },
    async fileUploader(targets, pathForUploading) {
      log('fileUploader', targets, pathForUploading);
      const promises = targets.map((target) => {
        if (!target.files) return log('skip1');
        if (target.files.length == 0) return log('skip2');
        const isMyTarget = !!target.fileName;
        log(isMyTarget);
        var fileName = isMyTarget ? target.fileName : target.name;
        log('fileName1', fileName, target.name);
        const fd = new FormData();
        fd.append("sampleFile", target.files[0]);
        fd.append("directory", "/testpost");
        fd.append("basename", "wobble-004.txt");
        return new Promise(async (resolve, reject) => {
          const answer = await axios.post(
            `http://localhost:3001/upload?pathForUploading=${pathForUploading}&fileName=${fileName}`,
            fd,
            httpOptions(),
            {}
          );
          log(answer);
        })
      })
      log('promises', promises);
      const result = await Promise
        .all(promises)
        .catch(log);
      log('result', result);
    },
    // deleteBlock(i) {
    //   log(i);
    //   // написати axios.delete
    // },

    async fileUpload(post) {
      const target = document.getElementById("fileToUpload");
      const file = target.files[0];
      var fd = new FormData();
      fd.append("sampleFile", document.getElementById("fileToUpload").files[0]);
      fd.append("directory", "/testpost");
      fd.append("basename", "wobble-004.txt");
      console.log(post)
      const answer = await axios.post(
        `http://localhost:3001/upload?pathForUploading=/posts/${post._id}/&fileName=post-img`,
        fd,
        httpOptions(),
        {}
      );
      console.log(answer);
      // location.reload()
    },
  },
});

import { defineStore } from "pinia";
import axios from "axios";
import { httpOptions, pause } from "@/utils";
import type { Post } from "@/interfaces";
import { useAppStore } from "@/stores/app";

// switch
const log = true ? console.log : () => null;

interface postState {
  posts: [Post] | [];
  post: Post | {};
  loadingBlocks: [];
  // multiPreview: [];
}

export const usePostStore = defineStore({
  id: "post",
  state: (): postState => ({
    posts: [],
    post: {
      blocks: []
    },
    loadingBlocks: [],
    // multiPreview: [],
  }),
  getters: {
    getPosts(state: any): any {
      return state.posts
    },
  },

  actions: {

    async refresh() {
      const answer = await axios.get(
        "http://localhost:3001/api/post",
        httpOptions()
      );
      log('stores/post: refresh()', answer);
      this.update(answer.data.result.posts);
    },

    async getPost(id: string) {
      if (id == "new") return;
      const answer = await axios.get(
        "http://localhost:3001/api/post?_id=" + id,
        httpOptions()
      );
      log('stores/post: refresh()', answer);
      this.post = answer.data.result.post;
    },

    async update(posts: [Post]) {
      this.posts = [];
      await pause(50)
      this.posts = posts;
    },

    async delete(post: Post) {
      const storeApp = useAppStore();
      storeApp.preloading = true;
      const answer = await axios.delete(
        "http://localhost:3001/api/post/" + post._id,
        httpOptions()
      );
      log('stores/post: delete()', answer);
      await pause(1000)
      await this.refresh();
      storeApp.preloading = false;
    },

    async submit(id: string) {
      let answer;
      let postForUpdate;
      //  A
      if (id == "new") {
        delete this.post._id
        answer = await axios.post(
          "http://localhost:3001/api/post",
          this.post,
          httpOptions()
        );
        postForUpdate = answer.data.result.post
        // B
      } else {
        answer = await axios.put(
          "http://localhost:3001/api/post/" + this.post._id,
          this.post,
          httpOptions()
        );
        postForUpdate = this.post
      }
      log('stores/post: submit()', answer);
      // 3
      let blocksUpload = []
      blocksUpload = [...document.querySelectorAll('.block-file-to-upload')]
      log('>>> blockUploads', blocksUpload);
      const isImgChoise: any = document.getElementById("fileToUpload");
      const myTarget = {
        type: 'custom',
        files: [isImgChoise.files[0]],
        fileName: 'post-img',
      };
      if (isImgChoise.files.length !== 0) blocksUpload.push(myTarget);
      await this.fileUploader(blocksUpload, `/posts/${postForUpdate._id}/`);
      await this.getPost(this.post._id);
      await this.getFileNames(this.post);
      this.loadingBlocks = [];
      log('>>> Submit DONE!');
      return;
      if (answer.data.ok) this.$router.push("/")
      else alert(answer.data.msg2);
    },

    async fileUploader(targets: any[], pathForUploading: string) {
      log('store/post: fileUploader(*,*)', targets, pathForUploading);
      const targetsForUploading = targets.filter((target) => (target.files?.length > 0) || (target.type == 'custom'))
      const promises = targetsForUploading.map((target) => {
        const isMyTarget = !!target.fileName;
        // log(isMyTarget);
        var fileName = isMyTarget ? target.fileName : target.name;
        // log('fileName1', fileName, target.name);
        const fd = new FormData();
        // log(target.files[0]);
        fd.append("sampleFile", target.files[0]);
        fd.append("directory", "/testpost");
        fd.append("basename", "wobble-004.txt");
        return new Promise(async (resolve, reject) => {
          const answer = await axios
            .post(`http://localhost:3001/upload?pathForUploading=${pathForUploading}&fileName=${fileName}`,
              fd,
              httpOptions(),
              {}
            );
          log('stores/post: fileUploader()', answer);
          resolve(answer);
        })
      })
      // log('promises', promises);
      const result = await Promise
        .all(promises)
        .catch(log);
      // log('result', result);
      var inputs = document.querySelectorAll('input[type=file]');
      inputs.forEach(input => input.value = '');
    },

    async setFileNamesToStorePost() {
      this.post = await this.getFileNames(this.post)
    },

    async getFileNames(post: Post) {
      log('stores/post: getFileNames(post)', post)
      if (!post) return console.warn('NOT VALID INPUT DATA !!!: stores/post: getFileNames(post)')
      const answer = await axios.get(
        "http://localhost:3001/api/post-file-names/" + post._id,
        httpOptions()
      );
      if (!answer.data.ok) {
        log('SKIP!!! something wrong ???')
        return post
      };
      const files = answer.data.result.files;
      post.blocks.forEach((block, i) => {
        if (block.fileId) {
          const fName = files.find((f: string) => f.split('.')[0] == block.fileId);
          post.blocks[i].file = fName;
          post.blocks[i].filePath = `http://localhost:3001/posts/${post._id}/${fName}?random=${Math.random()}`
        }
      });
      post.img = "/src/assets/logo.svg";
      files.forEach((f: string) => {
        const onlyName = f.split('.')[0];
        if (onlyName == 'post-img') post.img = `http://localhost:3001/posts/${post._id}/${f}?random=${Math.random()}`;
      })
      return post;
    },
  },
});

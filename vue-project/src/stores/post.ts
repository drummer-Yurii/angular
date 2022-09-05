import { defineStore } from "pinia";
import axios from "axios";
import { httpOptions, pause, sliceIntoChunks } from "@/utils";
import type { Post } from "@/interfaces";
import { useAppStore } from "@/stores/app";

// switch
const log = true ? console.log : () => null;

interface postState {
  posts: [Post] | [];
  filteredPosts: [Post] | [];
  paginatedPosts: [Post] | [];
  post: Post | {};
  loadingBlocks: [];
  searchQvery: string;
  currentPage: number;
  pagesAmount: number;
  serverUrl: string,
  apiUrl: string,
}

export const usePostStore = defineStore({
  id: "post",
  state: (): postState => {
    const appStore = useAppStore()
     return ({
      serverUrl: appStore.serverUrl,
      apiUrl: appStore.apiUrl,
      posts: [],
      filteredPosts: [],
      paginatedPosts: [],
      post: {
        blocks: []
      },
      loadingBlocks: [],
      searchQvery: '',
      currentPage: 1,
      pagesAmount: 1,
    })
  } ,
  getters: {
    getPosts(state: any): any {
      return state.posts
    },
  },

  actions: {

    async pagination() {
      this.paginatedPosts = []
      await pause(100)
      log('pagination');
      const pageSize = 10
      this.pagesAmount = Math.ceil(this.filteredPosts.length / pageSize);
      const chunks = sliceIntoChunks(this.filteredPosts, pageSize);
      log(chunks, this.currentPage);
      this.paginatedPosts = chunks[this.currentPage - 1];
    },

    async search() {
      this.filteredPosts = []
      await pause(100)
      this.filteredPosts = this.posts.filter((post) => {
        return !post.title ? false : post.title.includes(this.searchQvery);
      })
      if (this.searchQvery == '') this.filteredPosts = this.posts
    },

    async refresh() {
      const answer = await axios.get(
        this.apiUrl+"/post",
        httpOptions()
      );
      log('stores/post: refresh()', answer);
      this.update(answer.data.result.posts);
    },

    async getPost(id: string) {
      if (id == "new") return;
      const answer = await axios.get(
        this.apiUrl+"/post?_id=" + id,
        httpOptions()
      );
      log('stores/post: refresh()', answer);
      this.post = answer.data.result.post;
    },

    async update(posts: [Post]) {
      this.posts = [];
      await pause(50)
      this.posts = this.filteredPosts = this.paginatedPosts = posts;
      this.pagination();
    },

    async delete(post: Post) {
      const storeApp = useAppStore();
      storeApp.preloading = true;
      const answer = await axios.delete(
        this.apiUrl+"/post/" + post._id,
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
          this.apiUrl+"/post",
          this.post,
          httpOptions()
        );
        postForUpdate = answer.data.result.post
        // B
      } else {
        answer = await axios.put(
          this.apiUrl+"/post/" + this.post._id,
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
        log('FU isMyTarget', isMyTarget);
        var fileName = isMyTarget ? target.fileName : target.name;
        log('FU fileName, target.name', fileName, target.name);
        const fd = new FormData();
        log('FU file', target.files[0]);
        fd.append("sampleFile", target.files[0]);
        fd.append("directory", "/testpost");
        fd.append("basename", "wobble-004.txt");
        return new Promise(async (resolve, reject) => {
          const answer = await axios
            .post(this.serverUrl+`/upload?pathForUploading=${pathForUploading}&fileName=${fileName}`,
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
        this.apiUrl+"/post-file-names/" + post._id,
        httpOptions()
      );
      if (!answer.data.ok) {
        log('SKIP!!! something wrong ???')
        return post
      };
      const files = answer.data.result.files;
      post.blocks.forEach((block, i) => {
        if (block.type == 'galery') {
          block.fileIdList.forEach((bb, ii) => {
            if (bb.fileId) {
              const fName = files.find((f: string) => f.split('.')[0] == bb.fileId);
              block.fileIdList[ii].file = fName;
              block.fileIdList[ii].filePath = this.serverUrl+`/posts/${post._id}/${fName}?random=${Math.random()}`
            }
          });
        } else {
          if (block.fileId) {
            const fName = files.find((f: string) => f.split('.')[0] == block.fileId);
            post.blocks[i].file = fName;
            post.blocks[i].filePath = this.serverUrl+`/posts/${post._id}/${fName}?random=${Math.random()}`
          }
        }

      });
      post.img = "/src/assets/logo.svg";
      files.forEach((f: string) => {
        const onlyName = f.split('.')[0];
        if (onlyName == 'post-img') post.img = this.serverUrl+`/posts/${post._id}/${f}?random=${Math.random()}`;
      })
      return post;
    },
  },
});

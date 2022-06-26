<template>
  <div class="post-page">
    <div class="post-form">
      <div class="input-group mb-3">
        <input v-model="storePost.post.title" class="form-control" type="text" aria-label="title" placeholder="title" />
      </div>
      <div class="input-group">
        <span class="input-group-text">With textarea</span>
        <textarea v-model="storePost.post.description" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <div class="panel">
        <button @click="storePost.submit(getId())" type="button" class="btn btn-primary">
          save
        </button>
      </div>
    </div>
    <input type="file" id="fileToUpload" name="sampleFile" />
    <!-- <button @click="uploadFile" type="button" class="btn btn-primary">send</button> -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { usePostStore } from "@/stores/post";
import { useRoute } from "vue-router";
import { httpOptions, log } from "@/utils";

export default {
  setup() {
    const storePost = usePostStore();
    const storeUser = useUserStore();
    const route = useRoute();
    return {
      storePost,
      storeUser,
      route,
    };
  },
  data() {
    return {
      // post: {
      //   title: "",
      //   description: "",
      // },
    };
  },
  created() {
    this.storePost.getPost(this.getId());
  },
  methods: {
    getId(){
    const id = this.route.params.id;
      return id
    }
    // async getPost() {
    //   const id = this.route.params.id;
    //   if (id == "new") return;
    //   const answer = await axios.get(
    //     "http://localhost:3001/api/post?_id=" + id,
    //     httpOptions()
    //   );
    //   console.log(answer);
    //   this.post = answer.data.result.post;
    // },
    // async submit() {
    //   console.log("submit", this.storePost.post);
    //   const id = this.route.params.id;
    //   let answer;
    //   if (id == "new") {
    //     answer = await axios.post(
    //       "http://localhost:3001/api/post",
    //       this.storePost.post,
    //       httpOptions()
    //     );
    //     console.log(answer);
    //     const isImgChoise = document.getElementById("fileToUpload");
    //     if (isImgChoise.files.length !== 0)
    //       await this.fileUpload(answer.data.result.post);
    //   } else {
    //     answer = await axios.put(
    //       "http://localhost:3001/api/post/" + this.storePost.post._id,
    //       this.storePost.post,
    //       httpOptions()
    //     );
    //     console.log(answer);
    //   }
    //   this.storePost.refresh()
    //   if (answer.data.ok) this.$router.push("/")
    //   else alert(answer.data.msg2);
    // },
    // async fileUpload(newPost) {
    //   const target = document.getElementById("fileToUpload");
    //   const file = target.files[0];
    //   var fd = new FormData();
    //   fd.append("sampleFile", document.getElementById("fileToUpload").files[0]);
    //   fd.append("directory", "/testpost");
    //   fd.append("basename", "wobble-004.txt");

    //   const answer = await axios.post(
    //     `http://localhost:3001/upload?pathForUploading=/posts/${newPost._id}/&fileName=post-img`,
    //     fd,
    //     httpOptions(),
    //     {}
    //   );
    //   console.log(response);
    //   // location.reload()
    // },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .post-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .post-form {
    padding: 1rem;
    background: #213232;
    margin-top: 3rem;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
  }

  .panel {
    text-align: center;
  }
}
</style>

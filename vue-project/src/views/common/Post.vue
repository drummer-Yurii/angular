<template>
  <div class="my-layout post-page">
    <div class="post">
      <div class="img-container">
        <div class="admin-tools" v-if="storeUser.isAdmin">
          <button @click.stop="storePost.delete(post)" type="button" class="btn btn-dark">Delete</button>
        </div>
        <img :src="storePost.post.img" />
        <div class="substrate"></div>
        <h1>{{ storePost.post.title }}</h1>
      </div>
      <div class="post-text">{{ storePost.post.description }}</div>
    <div class="video-container">
      <video controls src="@/assets/video-1.mp4" type="video/mp4">
      </video>
      </div>
    </div>
    <hr />
    <div class="my-form post-form">
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
  async created() {
    this.storePost.getPost(this.getId());
    await this.getImg();
    // await this.getVideo();
  },
  methods: {
    async getImg() {
      const answer = await axios.get(
        "http://localhost:3001/api/post-img/" + this.storePost.post._id,
        httpOptions()
      );
      try {
        this.storePost.post.img =
          "http://localhost:3001/posts/" +
          this.storePost.post._id +
          "/" +
          answer.data.result.img + '?random=' + Math.random();
      } catch (error) {
        console.log(answer);
        this.storePost.post.img = "src/assets/logo.svg";
      }
    },
    // async getVideo() {
    //   const answer = await axios.get(
    //     "http://localhost:3001/api/post-video/" + this.storePost.post._id,
    //     httpOptions()
    //   );
    //   try {
    //     this.storePost.post.video=
    //       "http://localhost:3001/posts/" +
    //       this.storePost.post._id +
    //       "/" +
    //       answer.data.result.video + '?random=' + Math.random();
    //   } catch (error) {
    //     console.log(answer);
    //     this.storePost.post.video = "src/assets/logo.svg";
    //   }
    // },
    getId() {
      const id = this.route.params.id;
      return id
    }
  },
};
</script>

<style>
@import '@/assets/base.css';
.video-container video {
  width: 100%;
}

.img-container {
  position: relative;
}

.post-text {
  background: wheat;
  padding: 1rem;
}

.post {
  min-height: 20rem;
  background: gray;
  margin-top: 2rem;
  border-radius: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  width: 50rem;
}

.post img {
  width: 100%;
}

.post h1 {
  position: absolute;
  left: 1rem;
  bottom: 0;
  color: wheat;
}

.substrate {
  box-shadow: inset -24px -30px 23px rgba(0, 0, 0, 0.7);
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.admin-tools {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
  width: 4rem;
}

@media (min-width: 1024px) {
  .post-page {}

  .post-form {
    padding: 1rem;
  }

  .panel {
    text-align: center;
  }
}
</style>

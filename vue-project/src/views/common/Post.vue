<template>
  <div class="my-layout post-page">
    <div class="post">

      <!-- img, title -->
      <div class="img-container">
        <img :src="storePost.post.img" />
        <div class="substrate"></div>
        <h1>{{ storePost.post.title }}</h1>
      </div>

      <!-- description -->
      <div class="block post-text">{{ storePost.post.description }}</div>

      <!-- blocks -->
      <div class="blocks">
        <div v-for="(block, index) in storePost.post.blocks" :key="'post' + index">
          <div v-if="block.type == 'text'" class="block block-text">
            <!-- <textarea v-model="block.text" class="form-control" aria-label="With textarea">
            </textarea>
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button> -->
            {{ block.text }}
          </div>
          <div v-if="block.type == 'video'" class="block block-video">
            <!-- fileId {{ block.fileId }} -->
            <video controls :src="block.filePath" type="video/mp4">
            </video>
            <!-- <input type="file" class="block-file-to-upload" :name="block.fileId" />
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button> -->
          </div>
          <div v-if="block.type == 'audio'" class="block block-audio">
            <!-- fileId {{ block.fileId }} -->
            <audio controls :src="block.filePath" type="audio"></audio>
            <!-- <input type="file" class="block-file-to-upload" :name="block.fileId" />
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button> -->
          </div>
          <div v-if="block.type == 'img'" class="block block-img">
            <!-- fileId {{ block.fileId }} -->
            <img :src="block.filePath" type="img">
            <!-- <input type="file" class="block-file-to-upload" :name="block.fileId" />
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button> -->
          </div>
        </div>

      </div>

      <div class="post-panel">
        <div class="panel-icon facebook-icon">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z">
            </path>
          </svg>
        </div>
      </div>

    </div>

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
    await this.storePost.getPost(this.getId());
    console.log(123456789, this.storePost.post);
    this.storePost.post = await this.storePost.getFileNames(this.storePost.post)
    // await this.getImg();
    // await this.getVideo();
  },
  methods: {
    // async getImg() {
    //   const answer = await axios.get(
    //     "http://localhost:3001/api/post-img/" + this.storePost.post._id,
    //     httpOptions()
    //   );
    //   try {
    //     this.storePost.post.img =
    //       "http://localhost:3001/posts/" +
    //       this.storePost.post._id +
    //       "/" +
    //       answer.data.result.img + '?random=' + Math.random();
    //   } catch (error) {
    //     console.log(answer);
    //     this.storePost.post.img = "src/assets/logo.svg";
    //   }
    // },
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

<style scoped>
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
  margin-bottom: 2rem;
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

.block-text {
  padding: 1rem;
}

img {
  width: 100%;
}

.block {
  font-size: 1.2rem;
  background: #fff6e6;
}

.block-audio {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: #055160;
}

.block-audio audio {
  width: 70%;
  max-width: 25rem;
}
.post-panel {
  padding: 1rem;
  display: flex;
  justify-content: end;
  background: #143040;
}
.facebook-icon {
  display: inline-block;
  color: #3b5998;
  background: white;
  border-radius: 1rem;
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

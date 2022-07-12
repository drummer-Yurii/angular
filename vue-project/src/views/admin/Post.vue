<template>
  <div class="my-layout post-page">
    <div class="my-form post-form">
            <img :src="storePost.post.img" type="img">
      <div class="input-group mb-3">
        <input v-model="storePost.post.title" class="form-control" type="text" aria-label="title" placeholder="title" />
      </div>
      <div class="input-group">
        <span class="input-group-text">With textarea</span>
        <textarea v-model="storePost.post.description" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <div class="blocks">
        <div v-for="(block, index) in storePost.post.blocks" :key="'post' + index">
          <div v-if="block.type == 'text'" class="block-text">
            <textarea v-model="block.text" class="form-control" aria-label="With textarea">
            </textarea>
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
          </div>
          <div v-if="block.type == 'video'" class="block-video">
            fileId {{ block.fileId }}
            <video controls :src="block.filePath" type="video/mp4">
            </video>
            <input type="file" class="block-file-to-upload" :name="block.fileId" />
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
          </div>
          <div v-if="block.type == 'audio'" class="block-audio">
            fileId {{ block.fileId }}
            <audio controls :src="block.filePath" type="audio" ></audio>
            <input type="file" class="block-file-to-upload" :name="block.fileId" />
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
          </div>
          <div v-if="block.type == 'img'" class="block-img">
            fileId {{ block.fileId }}
            <img :src="block.filePath" type="img">
            <input type="file" class="block-file-to-upload" :name="block.fileId" />
            <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
          </div>
          <div v-if="!block.type" class="block-text">block</div>
        </div>
      </div>
      <hr />
      <div v-if="!addButtonsPanel" class="panel">
        <button @click="toggleButtonsPanel" type="button" class="btn btn-info">Add block</button>
      </div>
      <div v-if="addButtonsPanel" class="panel add-buttons">
        <button @click="addTextBlock" type="button" class="btn btn-info">Text</button>
        <button @click="addVideoBlock" type="button" class="btn btn-info">Video</button>
        <button @click="addAudioBlock" type="button" class="btn btn-info">Audio</button>
        <button @click="addImgBlock" type="button" class="btn btn-info">Img</button>
      </div>
      <hr />
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
import { randomString } from "high-level";

export default {
  data() {
    return {
      addButtonsPanel: false,
    };
  },
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
    await this.storePost.setFileNamesToStorePost();

  },
  methods: {
    getId() {
      const id = this.route.params.id;
      return id
    },
    toggleButtonsPanel() {
      this.addButtonsPanel = true
    },
    addTextBlock() {
      const newBlock = {
        type: 'text',
        text: '',
      };
      this.storePost.post.blocks.push(newBlock)
      console.log(this.storePost.post)
    },
    addVideoBlock() {
      const newBlock = {
        type: 'video',
        fileId: randomString(1),
      };
      this.storePost.post.blocks.push(newBlock)
    },
    addAudioBlock() {
      const newBlock = {
        type: 'audio',
        fileId: randomString(1),
      };
      this.storePost.post.blocks.push(newBlock)
    },
    addImgBlock() {
      const newBlock = {
        type: 'img',
        fileId: randomString(1),
      };
      this.storePost.post.blocks.push(newBlock)
    },
    deleteBlock(i) {
      log(i);
      this.storePost.post.blocks.splice(i, 1);
      this.storePost.submit(this.getId());
    },
  
  },
};
</script>

<style>
@import '@/assets/base.css';

@media (min-width: 1024px) {
  .post-page {}

  .post-form {
    padding: 1rem;
  }

  .panel {
    text-align: center;
  }

  .panel button {
    margin: 0 .2rem;
  }

  .block-text {
    background: black;
  }
  .block-video video {
    width: 100%;
  }
  .block-img img {
    width: 100%;
  }
}
</style>

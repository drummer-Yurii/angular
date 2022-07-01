<template>
  <div class="my-layout post-page">
    <div class="my-form post-form">
      <div class="input-group mb-3">
        <input v-model="storePost.post.title" class="form-control" type="text" aria-label="title" placeholder="title" />
      </div>
      <div class="input-group">
        <span class="input-group-text">With textarea</span>
        <textarea v-model="storePost.post.description" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <div class="blocks">
        <div v-for="(block, index) in storePost.post.blocks" :key="'post'+index" >block</div>
      </div>
      <hr />
      <div v-if="!addButtonsPanel" class="panel">
        <button  @click="toggleButtonsPanel" type="button" class="btn btn-info">Add block</button>
      </div>
      <div v-if="addButtonsPanel" class="panel add-buttons">
        <button  @click="addTextBlock" type="button" class="btn btn-info">Text</button>
        <button  @click="addVideoBlock" type="button" class="btn btn-info">Video</button>
        <button  @click="addAudioBlock" type="button" class="btn btn-info">Audio</button>
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
  created() {
    this.storePost.getPost(this.getId());
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
      this.storePost.post.blocks.push({})
      console.log(this.storePost.post)
    },
    addVideoBlock() {

    },
    addAudioBlock() {

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
}
</style>

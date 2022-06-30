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
  created() {
    this.storePost.getPost(this.getId());
  },
  methods: {
    getId(){
    const id = this.route.params.id;
      return id
    }
  },
};
</script>

<style>
@import '@/assets/base.css';
@media (min-width: 1024px) {
  .post-page {
  }

  .post-form {
    padding: 1rem;
  }

  .panel {
    text-align: center;
  }
}
</style>

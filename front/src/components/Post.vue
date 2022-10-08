@ -1,92 +0,0 @@
<template>
  <div class="post" @click="goToPost" :style="{background:storeApp.app.ui.post.bg, borderRadius:storeApp.app.ui.post.br + 'rem'}">
      <div class="admin-tools" v-if="storeUser.isAdmin">
        <button v-on:click.stop="storePost.delete(post)" type="button" class="btn btn-dark">Delete</button>
      </div>
  <div v-if="post">
    <div class="img-container">
      <div class="substrate"></div>
      <img :src="post.img" />
      <h1>{{ post.title }}</h1>
    </div>
    <div class="post-text">{{ post.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { httpOptions, log } from "@/utils";
import { onMounted, onUnmounted, ref } from "vue";
import type { Post } from "@/interfaces";
import { useRouter, useRoute } from "vue-router";
import { usePostStore } from "@/stores/post";
import { useUserStore } from "@/stores/user";
import { useAppStore } from "@/stores/app";
const storePost = usePostStore();
const storeUser = useUserStore();
const storeApp = useAppStore();
const props = defineProps<{
  post: { img: string; title: string; _id: string };
}>();
const post = ref(props.post);
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  post.value = await storePost.getFileNames(post.value)
});


function goToPost() {
  if (storeUser.user?.username == 'admin')
    router.push("/admin/post/" + post.value._id)
  else
    router.push("/post/" + post.value._id);
}
</script>

<style>
.img-container {
  position: relative;
}

.post-text {
  padding: .2rem;
  background: rgb(11 10 30 / 50%);
  color: wheat;
}

.post {
  min-height: .2rem;
  background: wheat;
  margin: 1rem;
  border-radius: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
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
  z-index: 999;
}
</style>

<template>
  <section>
    <div class="feed">
      <Post v-for="post in storePost.posts" :post="post" />
    </div>
  </section>
</template>

<script>
import { usePostStore } from '@/stores/post'
import Post from '@/components/Post.vue'

export default {
  components: {
    Post
  },
  setup() {
    const storePost = usePostStore()
    return {
      storePost
    }
  },
  created() {
    this.storePost.refresh()
  },
}
</script>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

section {
  text-align: center;
  z-index: 10;
}

.feed {
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  /* background: orange; */
  margin: -5rem auto 3rem auto;
}
</style>

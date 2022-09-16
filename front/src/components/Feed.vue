<template>
  <section>
    <div class="feed">
      <div v-for="(post, index) in storePost.paginatedPosts" :key="'post'+index">
        <Post :post="post" />
      </div>
      <Pagination :i="storePost.currentPage" :amount="storePost.pagesAmount" @someEvent="setPage($event)" @minus="stepPage('-')" @plus="stepPage('+')" />
    </div>
  </section>
</template>

<script>
import { usePostStore } from "@/stores/post";
import Post from "@/components/Post.vue";
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Post,
    Pagination,
  },
  setup() {
    const storePost = usePostStore();
    return {
      storePost,
    };
  },
  created() {
    this.storePost.refresh();
  },
   watch: {
    getPosts() {
      return this.storePost.posts
    }
  
  },
  methods: {
    setPage(index) {
      console.log(index)
      this.storePost.currentPage = index;
      this.storePost.pagination();
    },
    stepPage(to) {
      if(to == '-' && this.storePost.currentPage > 1) this.storePost.currentPage--;
      if(to == '+' && this.storePost.currentPage < this.storePost.pagesAmount) this.storePost.currentPage++;
      this.storePost.pagination();
    }
    
  }
};
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
  margin: -2rem auto 3rem auto;
}
</style>

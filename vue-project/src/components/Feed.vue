<!-- <script setup lang="ts">
defineProps<{
  companyName: string
}>()
</script> -->

<template>

  <section>
    <div class="feed">
      <Post v-for="post in posts" :post="post" />
    </div>
  </section>

</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import Post from '@/components/Post.vue'

// import {config} from '@/my-config'

export default {
  components: {
    Post
  },
  // props: {
  // companyName: String,
  // },
  setup() {
    const storeUser = useUserStore()
    const storeApp = useAppStore()
    return {
      storeUser,
      storeApp
    }
  },
  data() {
    return {
      posts: [
        {
          img: '/src/assets/1.webp',
          title: 'beach'
        },
        {
          img: '/src/assets/2.png',
          title: 'feeling'
        },
        {
          img: '/src/assets/3.jpg',
          title: 'stage'
        }
      ]
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios
        .get('http://localhost:3001/api/post', {
          headers: {
            'auth-token': localStorage.getItem('authToken'),
          }
        })
        .then((answer) => {
          console.log(answer)
          const newPosts = answer.data.result.posts
          this.posts = [...this.posts, ...newPosts]

        })

    },
  }
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

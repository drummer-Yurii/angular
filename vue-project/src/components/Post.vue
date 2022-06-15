@ -1,92 +0,0 @@
<template>
  <div class="post" @click="goToPost">
    <img :src="post.img" />
    <div class="substrate"></div>
    <h1>{{ post.title }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
// import {config} from '@/my-config'

export default {
  props: {
    post: {
      title: String,
      description: String,
      img: String
    },
  },
  created() {
    this.getImg()
  },
  methods: {
    getImg() {
      axios
        .get('http://localhost:3001/api/post-img/' + this.post._id, {
          headers: {
            'auth-token': localStorage.getItem('authToken'),
          }
        })
        .then((answer) => {
          this.post.img = 'http://localhost:3001/posts/' + this.post._id + '/' + answer.data.result.img
          console.log(answer)
        })
    }
  }
}
</script>

<style>
.post {
  min-height: 20rem;
  background: gray;
  margin-top: 2rem;
  border-radius: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;

}

.post>img {
  width: 100%;
}

.post>h1 {
  position: absolute;
  left: 1rem;
  bottom: 0;
  color: wheat;
}

.substrate {
  box-shadow: inset -24px -30px 23px rgba(0, 0, 0, 0.7);
  height: 10rem;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>

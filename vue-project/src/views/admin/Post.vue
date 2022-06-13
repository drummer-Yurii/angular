<template>
  <div class="post-page">
    <div class="post-form">
      <div class="input-group mb-3">
        <input v-model="post.title" class="form-control" type="text" aria-label="title" placeholder="title">
      </div>
      <div class="input-group">
        <span class="input-group-text">With textarea</span>
        <textarea v-model="post.description" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <div class="panel">
        <button @click="submit" type="button" class="btn btn-primary">save</button>
      </div>
    </div>
    <input type="file" id="fileToUpload" name="sampleFile" />
    <!-- <button @click="uploadFile" type="button" class="btn btn-primary">send</button> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useRoute } from "vue-router";


export default {
  setup() {
    const storeUser = useUserStore();
    const route = useRoute();
    return {
      storeUser,
      route
    }
  },
  data() {
    return {
      post: {
        title: '',
        description: ''
      }
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    getPost() {
      const id = this.route.params.id
      if (id == 'new') return
      axios
        .get('http://localhost:3001/api/post?id=' + id, {
          headers: {
            'auth-token': localStorage.getItem('authToken')
          }
        })
        .then((answer) => {
          console.log(answer)
          // this.userData = answer.data.user
        })
    },
    submit() {
      console.log('submit', this.post)
      const id = this.route.params.id
      if (id == 'new') {
        axios
          .post('http://localhost:3001/api/post', this.post, {
            headers: {
              'auth-token': localStorage.getItem('authToken')
            }
          })
          .then((answer) => {
            console.log(answer)
            const isImgChoise = document.getElementById('fileToUpload') 
            if (isImgChoise.files.length !== 0) this.fileUpload(answer.data.result.post)
           //we take post with id
           //we send a picture if she choise
           // so we shooed create new file louder for posts
          })
      } else {
        axios
          .put('http://localhost:3001/api/post', this.post, {
            headers: {
              'auth-token': localStorage.getItem('authToken')
            }
          })
          .then((answer) => {
            console.log(answer.data.result.post)
            // this.getUserData()
            // this.userData=answer.data.user
          })
      }
    },
    fileUpload(newPost) {
      const target = document.getElementById('fileToUpload')
      const file = target.files[0]
      var fd = new FormData();
      fd.append("sampleFile", document.getElementById('fileToUpload').files[0]);
      fd.append("directory", "/testpost");
      fd.append("basename", "wobble-004.txt");
      
      // axios.post(`http://localhost:3001/upload?pathForUploading=/posts/${newPost._id}/&fileName=post-img`, fd, {
      axios.post(`http://localhost:3001/upload?pathForUploading=/posts/test/&fileName=post-img`, fd, {

      }).then((response) => {
        console.log(response)
        // location.reload()
      })
    },
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .post-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .post-form {
    padding: 1rem;
    background: #213232;
    margin-top: 3rem;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
  }

  .panel {
    text-align: center;
  }
}
</style>
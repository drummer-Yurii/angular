<template>
  <div class="profile">
    <div class="profile-form">
      <div class="info">Username: {{ userData.username }}</div>
      <div class="input-group mb-3">
        <input v-model="userData.age" class="form-control" type="text" aria-label="age" placeholder="age">
      </div>
      <div class="input-group mb-3">
        <input v-model="userData.phone" class="form-control" type="number" aria-label="phone" placeholder="phone">
      </div>
      <div class="input-group mb-3">
        <input v-model="userData.email" class="form-control" type="text" aria-label="email" placeholder="email">
      </div>
      <div class="input-group mb-3">
        <input v-model="userData.facebookPage" class="form-control" type="text" aria-label="facebookPage"
          placeholder="facebookPage">
      </div>
      <div class="panel">
        <button @click="editProfile" type="button" class="btn btn-primary">edit</button>
      </div>
    </div>
    <!-- <form ref='uploadForm' id='uploadForm' action='http://localhost:3001/upload' method='post'
      encType="multipart/form-data"> -->
    <input type="file" id="fileToUpload" name="sampleFile" />
    <button @click="uploadFile" type="button" class="btn btn-primary">send</button>
    <!-- <input type='submit' value='Upload!' /> -->
    <!-- </form> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const storeUser = useUserStore()
    return {
      storeUser
    }
  },
  data() {
    return {
      userData: {}
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    getUserData() {
      axios
        .get('http://localhost:3001/api/user', {
          headers: {
            'auth-token': localStorage.getItem('authToken')
          }
        })
        .then((answer) => {
          console.log(answer)
          this.userData = answer.data.user
          this.storeUser.update(answer.data.user)
        })
    },
    editProfile() {
      console.log('editProfile')
      axios
        .put('http://localhost:3001/api/user', this.userData, {
          headers: {
            'auth-token': localStorage.getItem('authToken')
          }
        })
        .then((answer) => {
          console.log(answer)
          this.getUserData()
          // this.userData=answer.data.user
        })
    },
    uploadFile() {
      var fd = new FormData();
      fd.append("sampleFile", document.getElementById('fileToUpload').files[0]);
      fd.append("directory", "/testpost");
      fd.append("basename", "wobble-004.txt");


      var oReq = new XMLHttpRequest();
      oReq.open("POST", `http://localhost:3001/upload?pathForUploading=/users/${this.userData.username}/&fileName=avatar`, true);
      // oReq.onreadystatechange = alert(status);
      // console.log(alert(status));
      oReq.send(fd);
    },
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .profile {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .profile-form {
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
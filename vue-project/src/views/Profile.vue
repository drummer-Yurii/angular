<template>
  <div class="profile">
    <div class="profile-form">
      <div class="info">Username: {{ storeUser.user.username }}</div>
      <div class="input-group mb-3">
        <input v-model="storeUser.user.age" class="form-control" type="number" aria-label="age" placeholder="age">
      </div>
      <div class="input-group mb-3">
        <input v-model="storeUser.user.phone" class="form-control" type="number" aria-label="phone" placeholder="phone">
      </div>
      <div class="input-group mb-3">
        <input v-model="storeUser.user.email" class="form-control" type="text" aria-label="email" placeholder="email">
      </div>
      <div class="input-group mb-3">
        <input v-model="storeUser.user.facebookPage" class="form-control" type="text" aria-label="facebookPage"
          placeholder="facebookPage">
      </div>
      <div class="panel">
        <button @click="storeUser.editProfile" type="button" class="btn btn-primary">edit</button>
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
import { httpOptions, log } from '@/utils'

export default {
  setup() {
    const storeUser = useUserStore()
    return {
      storeUser
    }
  },
  data() {
    return {
      // userData: {}
    }
  },
  created() {
    this.storeUser.getUserData()
  },
  methods: {
    // getUserData() {
    //   axios
    //     .get('http://localhost:3001/api/user', {
    //       headers: {
    //         'auth-token': localStorage.getItem('authToken')
    //       }
    //     })
    //     .then((answer) => {
    //       console.log(answer)
    //       this.userData = answer.data.user
    //       this.storeUser.update(answer.data.user)
    //     })
    // },
  //  async editProfile() { 
  //     console.log('editProfile')
  //    const answer = await axios.put('http://localhost:3001/api/user', this.storeUser.user, )
  //         console.log(answer)
  //         this.storeUser.getUserData()
  //         // this.userData=answer.data.user
  //   },
    uploadFile() {
      const target =  document.getElementById('fileToUpload')
      if (target.files.length == 0) return alert('file not selected! please chois avatar');
      const file = target.files[0]
      var fd = new FormData();
      fd.append("sampleFile", document.getElementById('fileToUpload').files[0]);
      fd.append("directory", "/testpost");
      fd.append("basename", "wobble-004.txt");


      var oReq = new XMLHttpRequest();
      oReq.open("POST", `http://localhost:3001/upload?pathForUploading=/users/${this.storeUser.user.username}/&fileName=avatar`, true);
      // oReq.onreadystatechange = alert(status);
      // console.log(alert(status));
      // oReq.send(fd);
      axios.post(`http://localhost:3001/upload?pathForUploading=/users/${this.storeUser.user.username}/&fileName=avatar`, fd, {
      }).then((response) => {
        console.log(response)
        location.reload()
      })
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
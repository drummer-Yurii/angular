<template>
  <div class="profile">
    <div class="profile-form">
      <div class="input-group mb-3">
        <input @model="userData.age" class="form-control" type="text" aria-label="age" placeholder="age">
      </div>
      <div class="input-group mb-3">
        <input @model="userData.phone" class="form-control" type="number" aria-label="phone" placeholder="phone">
      </div>
      <div class="input-group mb-3">
        <input @model="userData.email" class="form-control" type="text" aria-label="email" placeholder="email">
      </div>
      <div class="input-group mb-3">
        <input @model="userData.facebookPage" class="form-control" type="text" aria-label="facebookPage"
          placeholder="facebookPage">
      </div>
      <div class="panel">
        <button @click="editProfile" type="button" class="btn btn-primary">edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  data() {
    return {
      userData: {}
    }
  },
  created(){
    this.getUserData()
  },
  methods: {
    getUserData() {
      axios
        .get('http://localhost:3001/api/user', {
          'auth-token': localStorage.getItem('authToken')
        })
        .then((answer) => {
          console.log(answer)
        })
    }
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
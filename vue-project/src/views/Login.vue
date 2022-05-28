<template>
  <div class="login">
    <div class="login-form">
      <div class="input-group mb-3">
        <span class="input-group-text">@</span>
        <input v-model="userData.username" type="text" class="form-control" placeholder="Username" aria-label="Username"
          aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input v-model="userData.password" type="password" class="form-control" placeholder="Password"
          aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="panel">
        <button @click="login" type="button" class="btn btn-primary">Login</button>
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
  methods: {
    login() {
      console.log(this.userData.username)
      axios
        .post('http://localhost:3001/api/auth/login', this.userData)
        .then((answer) => {
          console.log(answer)
          const authToken=answer.data.result.authToken
          localStorage.setItem('authToken', authToken)
          location.reload()
        })
    }
  }
}
</script>


<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .login-form {
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
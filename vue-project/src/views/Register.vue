<template>
  <div class="register">
    <div class="register-form">
      <div class="input-group mb-3">
        <!-- <span class="input-group-text">FN</span> -->
        <input @model="userData.firstName" type="text" aria-label="First name" class="form-control"
          placeholder="First name">
      </div>
      <div class="input-group mb-3">
        <!-- <span class="input-group-text">LN</span> -->
        <input @model="userData.lastName" type="text" aria-label="Last name" class="form-control"
          placeholder="Last name">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">@</span>
        <input @model="userData.username" type="text" class="form-control" placeholder="Username" aria-label="Username"
          aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">@</span>
        <input @model="userData.email" type="text" class="form-control" placeholder="email" aria-label="Username" 
           aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input @model="userData.password" type="password" class="form-control" placeholder="Password"
          aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="panel">
        <button @click="register" type="button" class="btn btn-primary">Register</button>
      </div>
    </div>
  </div>

</template>


<script>
import { ref } from 'vue'
import axios from 'axios'

// let userData = ref({})
// const register = () => {
//   alert()
// }
export default {
  data() {
    return {
      userData: {}
    }
  },
  methods: {
    register() {
      axios
        .post('http://localhost:3001/api/auth/register', this.userData)
        .then((answer)=>{
          console.log(answer)
        })
    }
  }
}
</script>


<style>
@media (min-width: 1024px) {
  .register {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .register-form {
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

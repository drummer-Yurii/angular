<template>
  <div class="my-layout register">
    <div class="my-form register-form">
      <div class="input-group mb-3">
        <input
          v-model="userData.firstName"
          type="text"
          aria-label="First name"
          class="form-control"
          placeholder="First name"
        />
      </div>
      <div class="input-group mb-3">
        <input
          v-model="userData.lastName"
          type="text"
          aria-label="Last name"
          class="form-control"
          placeholder="Last name"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">@</span>
        <input
          v-model="userData.username"
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">@</span>
        <input
          v-model="userData.email"
          type="text"
          class="form-control"
          placeholder="email"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input
          v-model="userData.password"
          type="password"
          class="form-control"
          placeholder="Password"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="panel">
        <button
          @click="register(userData)"
          type="button"
          class="btn btn-primary"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    async register(data) {
      console.log(data);
      const answer = await axios.post(
        "http://localhost:3001/api/auth/register",
        this.userData
      );
      console.log(answer);
      answer.data.ok ? alert(answer.data.msg) : alert('!!!'+answer.data.msg);
    },
  },
};
</script>

<style>
@import '@/assets/base.css';
@media (min-width: 1024px) {
  .register {
  }

  .register-form {
    padding: 1rem;
    
  }

  .panel {
    text-align: center;
  }
}
</style>

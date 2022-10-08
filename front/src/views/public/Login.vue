<template>
  <div class="my-layout login">
    <div class="card my-form login-form">
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
        <button @click="storeUser.login(userData)" type="button" class="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";

export default {
  data() {
    return {
      userData: {},
    };
  },
  setup() {
    const storeUser = useUserStore();
    return {
      storeUser,
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
@import '@/assets/base.css';

.my-form {
    width: 20rem;
    padding: 1rem;
    margin: 1rem .5rem;
  }

  .login-form {
    padding: 1rem;
    
  }

  .panel {
    text-align: center;
  }

  @media screen and (max-width: 370px) {
  .my-form {
  width: 18rem;
  }
}
</style>

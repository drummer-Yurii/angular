<template>
  <div class="card my-layout register">
    <div class="card my-form register-form">
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
          @click="storeUser.register(userData)"
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
import { useUserStore } from "@/stores/user";


export default {
  setup() {
    const storeUser = useUserStore();
    return {
      storeUser,
    };
  },
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
@import '@/assets/base.css';

  .register {
  }

  .register-form {
    padding: 1rem;
    
  }

  .panel {
    text-align: center;
  }
</style>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ companyName }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="'/'" class="nav-link active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/about'" class="nav-link active" aria-current="page">About</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/profile'" class="nav-link active" aria-current="page">Profile</router-link>
            </li>
            <li class="nav-item" v-if="storeUser.user?.username == 'admin'">
              <router-link :to="'/admin/main'" class="nav-link active" aria-current="page">Admin</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Auth
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link :to="'/register'" class="nav-link active" aria-current="page">Register</router-link>
                </li>
                <li>
                  <router-link :to="'/login'" class="nav-link active" aria-current="page">Login</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" @click="unlogin">Sign out</a></li>

              </ul>
            </li>
          </ul>
          <form class="d-flex">
            <input v-model="storePost.searchQvery" @input="storePost.search()" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
          </form>
          <div class="user">{{ storeUser.user?.username }}</div>
          <div class="avatar" v-if="canUploadAvatar"
            :style="`background-image: url(\'http://localhost:3001/users/${storeUser.user.username}/${storeUser.avatar}\');`">
          </div>
          <div class="avatar" v-if="!canUploadAvatar"
            :style="`background-image: url('/src/assets/empty-avatar.webp');`">
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { usePostStore } from '@/stores/post'
import { httpOptions, log } from '@/utils'


export default {
  props: {
    companyName: String,
  },
  setup() {
    const storeUser = useUserStore()
    const storeApp = useAppStore()
    const storePost = usePostStore()
    return {
      storeUser,
      storeApp,
      storePost
    }
  },
  computed: {
    canUploadAvatar: function () {
      return this.storeUser.user?.username && this.storeUser.avatar.length > 0
    }
  },
  async created() {
    // await this.storeUser.getUserData()
    // await this.getAvatar()
  },
  methods: {
    unlogin() {
      localStorage.removeItem('authToken')
      location.reload()
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

  .avatar {
    height: 3rem;
    width: 3rem;
    border-radius: 1rem;
    background-size: cover;
  }
  .user {
    margin-right: 1rem;
  }
}
</style>
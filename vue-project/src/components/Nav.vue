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
            <li class="nav-item" v-if="storeUser.user.username == 'admin'">
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
            <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <div class="user">{{ storeUser.user.username }}</div>
          <!-- <img alt="avatar" class="logo" src="http://localhost:3001/users/admin/avatar.jpg" width="125" height="125" /> -->
          <div class="avatar"
            :style="`background-image: url(\'http://localhost:3001/users/${storeUser.user.username}/${storeUser.avatar}\');`">
          </div>
        </div>

      </div>
    </nav>


    <!-- <HelloWorld msg="You did it!" /> -->
  </header>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export default {
  props: {
    companyName: String,
  },
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
    this.getAvatar()
  },
  methods: {
    getUserData() {
      axios
        .get('http://localhost:3001/api/user', {
          headers: {
            'auth-token': localStorage.getItem('authToken'),
          }
        })
        .then((answer) => {
          console.log(answer)
          this.userData = answer.data.user
          this.storeUser.update(answer.data.user)
          if (this.storeUser.user.username == 'admin') this.$router.push('/admin/main')
          else this.$router.push('/')
        })

    },
    getAvatar() {
      axios
        .get('http://localhost:3001/api/avatar', {
          headers: {
            'auth-token': localStorage.getItem('authToken'),
          }
        })
        .then((answer) => {
          this.storeUser.updateAvatar(answer.data.result.avatar)
          console.log(answer)
        })
    },
    unlogin() {
      localStorage.removeItem('authToken')
      location.reload()
    }
    // editProfile() {
    //   console.log('editProfile')
    //   axios
    //    .put('http://localhost:3001/api/user', this.userData, {
    //      'auth-token': localStorage.getItem('authToken')
    //    })
    //    .then((answer) => {
    //       console.log(answer)
    //       this.getUserData()
    //       // this.userData=answer.data.user
    //     })
    // },
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
}
</style>
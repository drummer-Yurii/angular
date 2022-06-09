@ -1,92 +0,0 @@
<template>
  <div class="post" v-for="post in posts">
    <img :src="post.img" />
    <div class="substrate"></div>
    <h1>{{post.title}}</h1>
    </div>



</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
// import {config} from '@/my-config'

export default {
  props: {
    companyName: String,
  },
  setup() {
    const storeUser = useUserStore()
    const storeApp = useAppStore()
    return {
      storeUser,
      storeApp
    }
  },
  data() {
    return {
      posts: [
        {
          img:'/src/assets/1.webp',
          title:'bech'
        },
         {
          img:'/src/assets/1.webp',
          title:'bech'
        },
         {
          img:'/src/assets/1.webp',
          title:'bech'
        }
      ]
    }
  },
  created() {
    // this.getUserData()
    // this.getAvatar()
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
          if (this.storeApp.goToAnotherPageAfterReload) {
            if (this.storeUser.user.username == 'admin') this.$router.push('/admin/main')
            else this.$router.push('/')
          }
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
.post {
  min-height: 20rem;
  background: gray;
  margin-top: 2rem;
  border-radius: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  /* background: url(@/assets/1.webp);
  background-size: cover; */
}

.post>img {
  width: 100%;
}
.post>h1 {
  position: absolute;
  left: 1rem;
  bottom: 0;
  color: wheat;
}
.substrate{
  box-shadow: inset -24px -30px 23px rgba(0, 0, 0, 0.7);
height: 10rem;
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
</style>

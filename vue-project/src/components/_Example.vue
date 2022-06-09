<template>

  <section>
    <div class="">
  
    </div>
  </section>

</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import  from '@/components/.vue'

// import {config} from '@/my-config'

export default {
  components:{
    
  },
  // props: {
    // companyName: String,
  // },
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
      // userData: {}
    }
  },
  created() {
    // this.getUserData()
    // this.getAvatar()
  },
  methods: {
    // getUserData() {
    //   axios
    //     .get('http://localhost:3001/api/user', {
    //       headers: {
    //         'auth-token': localStorage.getItem('authToken'),
    //       }
    //     })
    //     .then((answer) => {
    //       console.log(answer)
    //       this.userData = answer.data.user
    //       this.storeUser.update(answer.data.user)
    //       if (this.storeApp.goToAnotherPageAfterReload) {
    //         if (this.storeUser.user.username == 'admin') this.$router.push('/admin/main')
    //         else this.$router.push('/')
    //       }
    //     })

    // },
   
  
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

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

section {
  text-align: center;
  z-index: 10;
}
</style>

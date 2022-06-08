
<template>
  <main>

    <FirstScreen :companyName="storeApp.app.companyName"/>
    <Feed />
    <Footer />

  </main>
</template>

    <script>
import { RouterLink, RouterView } from 'vue-router'
import FirstScreen from '@/components/FirstScreen.vue'
import Feed from '@/components/Feed.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

export default {
  components: {
   FirstScreen,
   Feed,
   Footer
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
      // userData: {},
      // appData: {}
    }
  },
  created() {
    this.storeApp.init()
  },
  methods: {

  }
}
</script>
<style>
main{
display: grid;
}
</style>
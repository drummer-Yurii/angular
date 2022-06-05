
<template>
  <main>
    <section>
      <h1>{{ storeApp.app.companyName }}</h1>
      <h3>{{ storeApp.app.phone }}</h3>
    </section>
    <!-- <TheWelcome /> -->
  </main>
</template>

    <script>
import { RouterLink, RouterView } from 'vue-router'
// import Nav from '@/components/Nav.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

export default {
  components: {
    // Nav
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
section {
  text-align: center;
}
</style>
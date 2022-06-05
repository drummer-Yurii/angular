
<template>
  <Nav />

  <RouterView />
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

export default {
  components: {
    Nav
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
/* @import '@/assets/base.css'; */

#app {
  background: darkslategrey !important;
}
</style>

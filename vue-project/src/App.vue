<template>
  <div class="preloader" v-if="storeApp.preloading">Pending</div>
  <Nav :companyName="storeApp.app.companyName" />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import { useAppStore } from '@/stores/app'

export default {
  components: {
    Nav
  },
  setup() {
    const storeApp = useAppStore()
    storeApp.init()
    return {
      storeApp
    }
  },
  data() {
    return {
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
#app {
  background: darkslategrey !important;
}
.preloader {
  background: black;
  opacity: .5;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
}
</style>

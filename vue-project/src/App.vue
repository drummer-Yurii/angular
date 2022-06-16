<template>
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
</style>

<template>
  <div class="preloader" v-if="storeApp.preloading">Pending</div>
  <Nav :companyName="storeApp.app.companyName" />
  <RouterView />
  <div class="admin-panel">
    <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w1"/>
    <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w2"/>
    <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w3"/>
    <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w4"/>
    <button @click="storeApp.editApp()">Save</button>
  </div>
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
  background: #100f0e !important;
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
.admin-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.384);
  padding: 1rem;
  z-index: 999;
}
</style>

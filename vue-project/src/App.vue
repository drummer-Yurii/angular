<template>
<div class="app-container" :style="{background:storeApp.app.ui.common?.bg}">
    <div class="preloader" v-if="storeApp.preloading">Pending</div>
    <Nav :companyName="storeApp.app.companyName" />
    <RouterView />
    <div class="admin-panel" v-if="storeUser.isAdmin" :class="isOpenAP ? 'open' : 'close'">
      <div class="AP-container">
        <button @click="isOpenAP = !isOpenAP" class="AP-tab">{{isOpenAP ? 'close' : 'open'}}</button>
        <span>waves</span>
        <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w1" />
        <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w2" />
        <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w3" />
        <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w4" />
        <span>common</span>
        <span>common-bg</span>
        <input type="color" opacity v-model="storeApp.app.ui.common.bg" />
        <span>post-bg</span>
        <input type="color" opacity v-model="storeApp.app.ui.post.bg" />
        <button @click="storeApp.editApp()">Save</button>
      </div>
    </div>
  </div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    Nav
  },
  setup() {
    const storeApp = useAppStore()
    const storeUser = useUserStore()
    // storeApp.init()
    return {
      storeApp,
      storeUser
    }
  },
  data() {
    return {
      isOpenAP: true,
    }
  },
  async created() {
    await this.storeApp.init()
    await this.storeUser.getUserData()
    await this.storeUser.getAvatar()
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

.admin-panel-bg {
  position: fixed;
  left: 65rem;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.384);
  padding: 1rem;
  z-index: 999;
}

.close {
  bottom: -3.5rem;
}

.AP-container {
  position: relative;
}

.AP-tab {
  position: absolute;
  top: -2rem;
}
</style>

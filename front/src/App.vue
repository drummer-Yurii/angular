<template>
  <div class="app-container" :style="{ background: storeApp.app.ui.common?.bg }">
    <div class="app-preloader" v-if="storeApp.preloading">Pending</div>
    <Nav :companyName="storeApp.app.companyName" />
    <RouterView />
    <div class="app-admin-panel" v-if="storeUser.isAdmin" :class="isOpenAP ? 'open' : 'close'">
      <div class="AP-container">
        <div class="AP-group">
          <button @click="isOpenAP = !isOpenAP" class="AP-tab">{{ isOpenAP ? 'close' : 'open' }}</button>
          <span>waves</span>
          <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w1" />
          <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w2" />
          <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w3" />
          <input type="color" opacity v-model="storeApp.app.ui.firstScreen.waves.w4" />
        </div>
        <div class="AP-group">
          <span>com-bg</span>
          <input type="color" opacity v-model="storeApp.app.ui.common.bg" />
        </div>
        <div class="AP-group">
          <span>post-bg</span>
          <input type="color" opacity v-model="storeApp.app.ui.post.bg" />
        </div>
        <div class="AP-group">
          <span>post-br</span>
          <input class="number" type="number" opacity v-model="storeApp.app.ui.post.br" />
        </div>
        <button class="save" @click="storeApp.editApp()">Save</button>
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
      isOpenAP: false,
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

<style scoped>
#app {
  background: #100f0e !important;
}

.app-preloader {
  background: black;
  opacity: .5;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
}

.app-admin-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(25, 2, 44, 0.849);
  padding: 1rem;
  z-index: 999;
}

.app-admin-panel-bg {
  position: fixed;
  left: 65rem;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.384);
  padding: 1rem;
  z-index: 999;
}

.close {
  bottom: -5rem;
}

.save {
  margin-left: 1rem;
}

.AP-container {
  display: flex;
  position: relative;
  align-items: center;
}

.AP-tab {
  position: absolute;
  top: -3rem;
  background: rgba(25, 2, 44, 0.849);
  color: #fff;
}

.number {
  width: 3.2rem;
  height: 1.7rem;
}

span {
  position: absolute;
  left: 0;
  top: -1.2rem;
  font-size: 0.7em;
  color: rgba(245, 222, 179, 0.705);
}

.AP-group {
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.356);
  margin: 0.2em;
  border-radius: 0.2rem;
  padding: 0.2rem;
}
</style>

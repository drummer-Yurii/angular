<script setup lang="ts">
import FirstScreen from '@/components/FirstScreen.vue'
import Feed from '@/components/Feed.vue'
import Footer from '@/components/Footer.vue'
import { useAppStore } from '@/stores/app'
const storeApp = useAppStore()
</script>

<template>
  <main>
    <FirstScreen :companyName="storeApp.app.companyName" />
    <Feed />
    <Footer />
  </main>
</template>

<script lang="ts">

export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style>
main {
  display: grid;
}
</style>
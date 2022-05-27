<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
</script>

<template>
  <Nav />

  <RouterView />
</template>

<style>
/* @import '@/assets/base.css'; */

#app {
  background: darkslategrey !important;
}
</style>

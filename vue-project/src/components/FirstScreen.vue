<script setup lang="ts">
import { useAppStore } from "@/stores/app";
const storeApp = useAppStore();
defineProps<{
  companyName: String
}>()

</script>

<template>
  <div class="header">
    <!--Content before waves-->
    <div class="inner-header flex"
      :style="{ 'background-image': 'url(' + ('https://www.billboard.com/wp-content/uploads/media/tomorrowland-2019-atmosphere-julien-duval-billboard-1548.jpg') + ')' }">

      <img v-if="storeApp.files.length > 0" :src="storeApp.appImg()">
      <div class="header-content">
        <img v-if="storeApp.files.length > 0" class="main-logo" :src="storeApp.appLogo()" alt="Logo">

        <h1>{{  companyName  }}</h1>
        <h2>Hello World</h2>
      </div>
    </div>

    <!--Waves Container-->
    <div class="waves-container">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" :fill="storeApp.app.ui.firstScreen.waves.w1" />
          <use xlink:href="#gentle-wave" x="48" y="3" :fill="storeApp.app.ui.firstScreen.waves.w2" />
          <use xlink:href="#gentle-wave" x="48" y="5" :fill="storeApp.app.ui.firstScreen.waves.w3" />
          <use xlink:href="#gentle-wave" x="48" y="7" :fill="storeApp.app.ui.firstScreen.waves.w4" />
        </g>
      </svg>
    </div>
    <!--Waves end-->

  </div>
  <!--Header ends-->




</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

.inner-header {
  background-size: cover;
}

section {
  text-align: center;
}

body {
  margin: 0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}

p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  position: relative;
  text-align: center;
  background: linear-gradient(60deg, rgb(183 98 58) 0%, rgb(22 0 0) 100%);
  color: white;
}

.inner-header .main-logo {
  width: 100px;
  fill: white;
  padding-right: 15px;
  display: inline-block;
  vertical-align: middle;
}

.inner-header {
  /* height: 65vh; */
  width: 100%;
  margin: 0;
  padding: 0;
}

.inner-header img {
  width: 100%;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */
.waves-container {
  right: 0;
  padding-top: -1rem;
  position: relative;
  position: absolute;
  bottom: 0;
  opacity: 0.5;
  width: 100%;
}

.parallax>use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

.header-content {
  position: absolute;
  left: 0;
  top: 20%;
  width: 100%;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>

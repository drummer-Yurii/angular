<script setup lang="ts">
defineProps<{
  companyName: string
}>()
</script>

<template>

  <section>
    <div class="feed">
      <div class="post"></div>
      <div class="post"></div>
      <div class="post"></div>
      <div class="post"></div>
      <div class="post"></div>
    </div>
  </section>

</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

section {
  text-align: center;
}

.feed {
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  background: orange;
  margin: -5rem auto 3rem auto;
}

.post {
  min-height: 20rem;
  background: gray;
  margin-top: 2rem;
  border-radius: 3rem;
}
</style>

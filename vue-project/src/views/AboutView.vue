<template>
  <div class="about">
    Hello world
    <Room3d />
  </div>
</template>
<script>
import Room3d from "@/components/Room3d.vue"

export default {
  components: {
    Room3d
  }
}
</script>
<style scoped>
.about {
  height: 20rem;
  position: relative;
  background: rgb(20, 19, 19);
}  
</style>
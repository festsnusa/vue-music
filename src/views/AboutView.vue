<template lang="pug">
AppAbout
</template>

<script>
import AppAbout from '@/components/AppAbout.vue'
export default {
  name: "AboutView",
  components: {
    AppAbout,
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

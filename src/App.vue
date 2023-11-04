<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<template>
  <div class="bg-green-400 h-screen">
    <NavBar/>
  </div>
  <!-- <RouterView /> -->
</template>

<style scoped>
</style>

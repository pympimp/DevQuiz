<template>
  <AdNav />

    <p style="color: white; margin-top: 3vh; margin-left: 3vh; font-size: 3vh; font-weight: bold">
      จัดการรายชื่อผู้ใช้
    </p>
    <q-avatar color="red" text-color="white" icon="directions" />


  <div class="container"></div>
</template>

<script>

import AdNav from '@/components/AdNav.vue'
// eslint-disable-next-line no-unused-vars

export default {
  components: {
    AdNav
  }
}
</script>

<style scoped>
.background {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: auto;
  height: auto;
}

.container {
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  width: 180vh;
  height: 80vh;
  margin-left: 3vh;
  padding: 20px 20px 20px 20px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background: white;
}

/* Add your custom styling here */
</style>

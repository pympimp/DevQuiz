<script>
// import MainPage from "./pages/MainPage.vue";

// export default {
//   name: "App",
//   components: {
//     MainPage
//   },
// };

export default {
  computed: {
    darkTheme() {
      return this.$store.state.darkTheme;
    },
  },
  methods: {
    toggleTheme() {
      this.$store.commit('toggleTheme');
    },
  },
  created() {
    this.$store.commit('initializeTheme');
  },
};

</script>


 <template>
  <!-- <div :class="{ 'dark-theme': darkTheme }">
    <button @click="toggleTheme">Toggle Theme</button>
  </div> -->
   <!-- <MainPage/>  -->
  <router-view></router-view>
  <!-- <div class=" h-screen"> -->
  <!-- <RouterView /> -->
</template>

<style>
body {
  background-color: #1F1F1F;
}

.dark-theme {
  background-color: #ffffff;
  color: #fff;
}
</style>
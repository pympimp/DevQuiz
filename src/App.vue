<script>
import axios from 'axios';
import { useAuthenStore } from './stores/auth';
import { Id_Key } from './utils/config';
// import MainPage from "./pages/MainPage.vue";

// export default {
//   name: "App",
//   components: {
//     MainPage
//   },
// };

export default {
   mounted(){
    if(localStorage.getItem(Id_Key)){
      this.fetchUser(localStorage.getItem(Id_Key))
    }
  },
  data(){
    return{
    authenStore:useAuthenStore(),
    }
  },
  computed: {
    darkTheme() {
      return this.$store.state.darkTheme;
    },
  },
  methods: {
    toggleTheme() {
      this.$store.commit('toggleTheme');
    },
    async fetchUser(id) {
      const result = await axios.get(`http://localhost:3000/user/${id}`)
      if(result && result.data){
        this.authenStore.setAuthen(result.data)
      }
    }
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
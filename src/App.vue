<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
 
  methods: {
    startQuiz() {
      // เพิ่มโค้ดที่คุณต้องการเมื่อปุ่มถูกคลิก
      console.log("ปุ่มถูกคลิก! คุณสามารถเริ่มเล่นเกมหรือทำอะไรก็ได้ที่นี่");
    },
  },

};


</script>

<template>

  <div class="bg-green-400 h-screen">
    <NavBar/>

    <div class="page">
    <h1>DevQuiz</h1>
    <h3>Web Application ระบบ e-Learning </h3>
    <h4>สำหรับเรียนการเขียนโปรแกรมเบื้องต้น</h4>
    <button @click="startQuiz">เริ่มต้นการเรียน</button>
  </div>

  </div>

  <RouterView />
</template>

<style scoped>

.page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  margin-top: 190px;
  padding: 100px;
}

  .page h1{
    font-size: 50px;
    /* margin-left: 200px;
    padding-top: 250px; */
  }

  .page h3{
    font-size: 25px;
    /* margin-left: 70px;
    padding-top: 20px; */
    
  }

    .page h4{
    font-size: 25px;
    /* margin-left: 70px;
    padding-top: 20px; */
    
  }


  .page button {
  background-color: #003d65;
  color: white;
  margin-top: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
}

.page button:hover {
  background-color: #2980b9;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
} */

/* .logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

/* @media (min-width: 1024px) { */
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  /* nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
/* }  */
</style>

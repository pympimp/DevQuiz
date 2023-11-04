<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
//   components: {
//     NavBar,
//   },
 
  methods: {
    startQuiz() {
      // เพิ่มโค้ดที่คุณต้องการเมื่อปุ่มถูกคลิก
      this.$router.push({ name: "LogIn" });
    },
  },

};


</script>

<template>
  <div class=" h-screen">
    <!-- <NavBar/> -->
    <div class="row " style="display: flex; align-items: center; ">
    <div class="page">
    <h1>DevQuiz</h1>
    <h3>Web Application ระบบ e-Learning </h3>
    <h3>สำหรับเรียนการเขียนโปรแกรมเบื้องต้น</h3>
    <button @click="startQuiz">เริ่มต้นการเรียน</button>
    
  </div>
</div>
</div>
  <!-- <RouterView /> -->
</template>

<style scoped>
*{
  background-color: rgb(229, 219, 241)
}
.page {
  display: flex; /* เปิดใช้งาน Flexbox */
  flex-direction: column; /* จัดเรียงเนื้อหาในแนวตั้ง */
  align-items: start; /* จัดให้เนื้อหาอยู่ตรงกลางในแนวดิ่ง */
  justify-content: flex-start; /* ชิดด้านซ้ายในแนวนอน */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191717;
  margin-top: 150px;
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
  background-color: #49385f;
  color: white;
  margin-top: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
}

.page button:hover {
  background-color: #2980b9;
}
</style>

<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import VueResponsiveImage from 'vue-responsive-image'
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
 
  methods: {
    startQuiz() {
      // เพิ่มโค้ดที่คุณต้องการเมื่อปุ่มถูกคลิก
      this.$router.push({ name: "LogIn" });
    },
  },

};


</script>

<template>
    <NavBar/>
  <div class="screen" id="screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <!-- <div class="page"> -->
    <div class="container">

    <section class="about">
      <div class="about-content">
        <h1>DevQuiz</h1>
        <h3>Web Application ระบบ e-Learning </h3>
        <h3>สำหรับเรียนการเขียนโปรแกรมเบื้องต้น</h3>
        <button @click="startQuiz">เริ่มต้นการเรียน</button>
      </div>
      <div class="about-image">
        <img src="images/rmBG.png" alt="" class="h-auto">
      </div>
  </section>

    </div>
</div>
  <!-- <RouterView /> -->
</template>

<style scoped>
*{
  /* background-color: #FAF5FF; */
  /* margin: 0px;
  padding: 0px; */
  box-sizing: border-box;
}

body {
  background-color: #FAF5FF;
  margin: 0;
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
  margin-top: 100px;
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
  background-color: #EB7E55;
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

.container {
  width: 90%;
  margin: 0 auto;
  padding: 10px 20px;
  /* display: grid;
  gap: 30px;
  margin: 14px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 2fr 2fr 1fr; */
  
}

.about {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.about-image {
  flex:1;
  margin-right: 40px;
  overflow: hidden;
  /* ไก */
}

.about-image:hover img {
  /* transform: scale(1.05); */
}

.about-image img {
  width: 90vh;
}

.about-content{
  flex:1;
}

.about-content h1{
  font-size: 60px;
  margin-bottom: 15px;
  font-weight: bolder;
  color: #EB7E55;
}

.about-content h3{
  font-size: 23px;
  margin-bottom: 15px;
}

/* .about-content p{
  font-size: 18px;
  line-height: 1.5;
  color: #666;
} */

.about button {
  /* background-color: #EB7E55;
  color: white;
  margin-top: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer; */

  background-color: #EB7E55;
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  font-size: 19px;
  text-decoration: none;
  border-radius: 25px;
  margin-top: 5px;
  transition: 0.3s ease;

}

.about button:hover{
  background-color: #c4603b;
}

@media screen and (max-width: 768px){
  .container{
    padding: 0px;
  }

  .about{
    padding: 20px;
    flex-direction: column;
  }
}

</style>

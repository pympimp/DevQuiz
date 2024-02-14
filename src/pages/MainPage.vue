<!-- eslint-disable no-undef -->
<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import VueResponsiveImage from 'vue-responsive-image'
import { authenKey } from '../utils/config'
export default {
  name: 'App',
  data() {
    return {
      message: 'การพัฒนาระบบ e-Learning แบบ Interactive สำหรับรายวิชาการเขียนโปรแกรมเบื้องต้น',
      dropdown: false,
    }
  },
  methods: {
    startQuiz() {
      if (!localStorage.getItem(authenKey)) {
        this.$router.push({ name: 'LogIn' })
      } else {
        this.$router.push({ name: 'HomePage' })
      }
      // เพิ่มโค้ดที่คุณต้องการเมื่อปุ่มถูกคลิก
    },
    Toggledropdown(){
      this.dropdown = !this.dropdown
    },
    mounted() {
      setTimeout(()=>{
        document.body.style.overflow = 'hidden'
      },800)
      // ทำการลบ scrollbar ของ body เมื่อ component นี้ถูก mounted
    },
    beforeDestroy() {
      // ทำการคืนค่า overflow ของ body เมื่อ component นี้ถูก destroy
      document.body.style.overflow = ''
    }
  }
}
</script>

<template>
  <!-- <div class="screen" id="screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center;"> -->
  <!-- <div class="page"> -->
  <div class="container">
    <h1 class="running-text" id="text-run">
      {{ message }}
    </h1>
    <section class="about">
      <div class="about-content">
        <h1>DevQuiz</h1>
        <h3>Web Application ระบบ e-Learning</h3>
        <h3>สำหรับเรียนการเขียนโปรแกรมเบื้องต้น</h3>
        <button @click="startQuiz()">เริ่มต้นการเรียน</button>
        <button @click="Toggledropdown()" style="background-color: aliceblue;margin-left: 20px;text-wrap: nowrap;">ดาวโหลดไฟล์
          <i :class="['bi', 'bi-arrow-down-short', { 'rotate-180': dropdown }]"></i>
        </button>
        <div v-if="dropdown" class="dropdown">
          <a href="https://devquiz-five.vercel.app/pubilc/image/PresentationElearning.pdf" class="a" download="PresentationElearning.pdf" >ไฟล์นำเสนอ</a>
          <hr style="width: 80%; background-color: black;">
          <a href="https://devquiz-five.vercel.app/pubilc/image/UserManual.pdf" class="a" download="UserManual.pdf">คู่มือการใช้งาน</a>
        </div>
      </div>
      <div class="about-image">
        <img src="/images/main.png" alt="Main Image" class="h-auto" />
      </div>
    </section>
  </div>
  <footer>
    <div class="footer-container">
      <p>&copy; 2024 By</p>
      <div class="credit">
        <p>
          นักศึกษาชั้นประกาศนียบัตรวิชาชีพชั้นสูง สาขาวิชาเทคโนโลยีสารสนเทศ
          วิทยาลัยอาชีวศึกษาอุดรธานี
        </p>
        <!-- <ol type="1">
          <li>นาย พงศธรณ์ พลแสง</li>
          <li>นางสาว พิมพ์มาดา สุระดนัย</li>
          <li>นางสาว ณัฐวดี อินทพุทธ</li>
        </ol> -->
      </div>
    </div>
  </footer>

  <!-- </div> -->

  <!-- <RouterView /> -->
</template>

<style scoped>
* {
  box-sizing: border-box;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  
}

#text-run {
  overflow: hidden;
}

.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.select{
  background-color: aliceblue;
  display: inline-block;
  color: #434343;
  font-size: small;
  text-decoration: none;
  border-radius: 25px;
  margin-top: 5px;
  transition: 0.3s ease;
  margin-left: 20px;
  text-wrap: nowrap;
  padding: 5px;
}
.credit {
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-left: 0.5%;
}

.container {
  max-width: 100%;
  overflow: hidden;
}

.about {
  width: 100%;
  min-height: 78vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.about-image {
  flex: 1 1 17rem;
  margin-right: 40px;
  overflow: hidden;
  /* ไก */
}

.about-image:hover img {
  /* transform: scale(1.05); */
}

.about-image img {
  width: 80vh;
}

.about-content {
  flex: 1 1 17rem;
  padding-left: 10%;
}

.about-content h1 {
  font-size: 60px;
  margin-bottom: 15px;
  font-weight: bolder;
  color: #ec4088;
}

.about-content h3 {
  font-size: 23px;
  margin-bottom: 15px;
  color: #fff;
}

.about button {
  background-color: #f5c722;
  display: inline-block;
  padding: 10px 20px;
  color: #434343;
  font-size: 19px;
  text-decoration: none;
  border-radius: 25px;
  margin-top: 5px;
  transition: 0.3s ease;
}

.about button:hover {
  background-color: #cda000;
  transform: scale(1.1);
}

.dropdown{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: aliceblue;
  color: black;
  position: absolute;
  transform: translateX(200px) translateY(-5px);
  border-radius: 5px;
}

.a{
  padding: 15px;
}

.a:hover{
  color: #ec4088;
  cursor: pointer;
  transition: color 0.5s;
  transform: scale(1.1);
}
.running-text {
  font-size: 1.1rem;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  animation: runText 16s linear infinite; /* 5s คือ ระยะเวลา, linear คือ การเคลื่อนไหวเป็นเส้นตรง, infinite คือ เล่นซ้ำ */
  color: #ec4088;
}

@keyframes runText {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {

  .about {
    /* padding: 20px; */
    flex-direction: column;
  }

  footer {
  font-size: 1rem;
}

  .about-content h1 {
    padding-top: 10%;
    font-size: 3rem;
    margin-bottom: 5px;
  }
  .about-content h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #fff;
  }


  .about-image {
    flex: 1;
    margin-left: 10%;
  }

  .about {
    /* padding: 20px; */
    flex-direction: column;
  }

  .about button {
    font-size: 25px;
  }

}


@media screen and (max-width: 480px) {
  .about-content h1 {
    padding-top: 40%;
    font-size: 40px;
    margin-bottom: 5px;
  }
  .about-content h3 {
    font-size: 15px;
    margin-bottom: 15px;
    color: #fff;
  }

  .about-content {
    flex: 1 1 5px;
  }

  .about-image {
    flex: 1;
    margin-left: 10%;
    overflow: hidden;
    /* ไก */
  }
  .about-image {
    flex: 1;
    margin-left: 10%;
    overflow: hidden;
    /* ไก */
  }

  .about {
    /* padding: 20px; */
    flex-direction: column;
  }

  .about button {
    font-size: 15px;
  }
}
</style>

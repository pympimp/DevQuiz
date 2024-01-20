<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import VueResponsiveImage from 'vue-responsive-image'
import NavBar from '@/components/NavBar.vue'
import { authenKey } from '../utils/config'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      message:
        'การพัฒนาระบบ e-Learning แบบ Interactive สำหรับรายวิชาการเขียนโปรแกรมเบื้องต้น'
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
    mounted() {
      // ทำการลบ scrollbar ของ body เมื่อ component นี้ถูก mounted
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      // ทำการคืนค่า overflow ของ body เมื่อ component นี้ถูก destroy
      document.body.style.overflow = ''
    }
  }
}
</script>

<template>
  <NavBar />
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
        <p>นักศึกษาชั้นประกาศนียบัตรวิชาชีพชั้นสูง สาขาวิชาเทคโนโลยีสารสนเทศ วิทยาลัยอาชีวศึกษาอุดรธานี</p>
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
  /* background-color: #FAF5FF; */
  /* margin: 0px;
  padding: 0px; */
  box-sizing: border-box;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

#text-run {
  overflow: hidden;
}

.footer-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.credit{
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-left: 0.5%;
}

/* body {
  background-color: #FAF5FF;
  margin: 0;
} */

/* .page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191717;
  margin-top: 100px;
  padding: 100px;
} */

/* .page h1{
    font-size: 50px; */
/* margin-left: 200px;
    padding-top: 250px; */
/* } */

/* .page h3{
    font-size: 25px; */
/* margin-left: 70px;
    padding-top: 20px; */
/*
  } */

/* .page h4{
    font-size: 25px; */
/* margin-left: 70px; */
/* padding-top: -5px;  */
/*
  } */

/* .page button {
  background-color: #EB7E55;
  color: white;
  margin-top: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
} */

/* .page button:hover {
  background-color: #2980b9;
} */

/* .container { */
/* width: 90%;
  margin: 0 auto;
  padding: 10px 20px; */

/* display: grid;
  gap: 30px;
  margin: 14px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 2fr 2fr 1fr; */
/*
} */

.container {
  width: 100%;
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
  font-size: 18px;*/
  cursor: pointer;
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

@media screen and (max-width: 768px) {
  /* .container{
    padding: 0px;
  } */

  .about {
    /* padding: 20px; */
    flex-direction: column;
  }
}

@media screen and (max-width: 820px) {
  .about-content h1 {
    padding-top: 40%;
    font-size: 60px;
    margin-bottom: 5px;
  }
  .about-content h3 {
    font-size: 25px;
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

  .about {
    /* padding: 20px; */
    flex-direction: column;
  }

  .about button {
    font-size: 25px;
  }
}

@media screen and (max-width: 450px) {
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
